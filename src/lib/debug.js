/*
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
import net from 'net'
import {Debugger} from 'yadc'

// important: preserve order
const SCOPE_TYPES = ['global', 'local', 'with', 'closure', 'catch', 'block', 'script']

const PROPERTY_TYPES = {
  NORMAL: 0,
  FIELD: 1,
  CONSTANT: 2,
  CALLBACKS: 3,
  HANDLER: 4,
  INTERCEPTOR: 5,
  TRANSITION: 6,
  NONEXISTENT: 7
}

const DC_ERROR = Error('disconnected')

export default () => {
  let debug
  let seq = 0
  const scriptIdToUrl = new Map()

  const scripts = cb => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'scripts',
      arguments: {
        types: 4,
        includeSource: true
      }
    }, (err, out) => {
      if (err) return cb(err)
      if (!out.res) return cb(Error('no response'))
      const {res} = out
      if (!res.body) return cb(Error('no scripts'))

      res.body.forEach(({id, name}) => scriptIdToUrl.set(id, name))
      cb(null, res.body)
    })
  }

  const backtrace = cb => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'backtrace',
      arguments: {
        inlineRefs: true,
        fromFrame: 0,
        maxStringLength: 10000
      }
    }, (err, out) => {
      if (err) return cb(err)
      if (!out.res) return cb(Error('no response'))
      const {res} = out
      if (res.running) {
        debug.emit('unpaused')
      }

      if (!res.body) return cb(Error('no backtrace'))
      cb(null, res.body)
    })
  }

  const breakpoints = cb => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'listbreakpoints'
    }, (err, out) => {
      if (err) return cb(err)
      if (!out.res) return cb(Error('no response'))
      const {res} = out
      if (!res.body) return cb(Error('no breakpoints'))
      res.body.breakpoints = res.body.breakpoints.filter(bp => bp.type === 'scriptName')
      cb(null, res.body)
    })
  }

  const setBreakpoint = ({line, file: target}, cb) => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'setbreakpoint',
      arguments: {
        type: 'script', target, line
      }
    }, (err, out) => {
      if (err) return cb(err)
      if (!out.res) return cb(Error('no response'))
      const {res} = out
      if (!res.body) return cb(Error('unable to set breakpoint'))
      cb(null, res.body)
    })
  }

  const clearBreakpoint = (breakpoint, cb) => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'clearbreakpoint',
      arguments: {
        type: 'script',
        breakpoint
      }
    }, (err, out) => {
      if (err) return cb(err)
      if (!out.res) return cb(Error('no response'))
      const {res} = out
      if (!res.body) return cb(Error('unable to unset breakpoint'))
      cb(null, res.body)
    })
  }

  const step = (act, cb = () => {}) => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'continue',
      arguments: {
        stepaction: act
      }
    }, (err) => {
      if (err) return cb(err)
      callstack(cb)
    })
  }

  const stepOver = cb => step('next', cb)
  const stepInto = cb => step('in', cb)
  const stepOut = cb => step('out', cb)

  const resume = (cb = () => {}) => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'continue'
    }, (err) => {
      if (err) return cb(err)
      cb()
    })
  }

  const pause = (cb = () => {}) => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'suspend'
    }, (err) => {
      if (err) return cb(err)
      callstack(cb)
    })
  }

  const lookup = ({handles}, cb) => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'lookup',
      arguments: {
        handles
      }
    }, (err, out) => {
      if (err) return cb(err)
      if (!out.res) return cb(Error('no response'))
      const {res} = out
      cb(null, res)
    })
  }

  const evaluate = ({expression, global, frame, context}, cb) => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    const args = {expression, disable_break: true}
    if (typeof global !== 'undefined') { args.global = global }
    if (typeof frame !== 'undefined') { args.frame = frame }
    if (typeof context !== 'undefined') { args.additional_context = context }

    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'evaluate',
      arguments: args
    }, (err, out) => {
      if (err) return cb(err)
      if (!out.res) return cb(Error('no response'))
      cb(null, out)
    })
  }

  const frameEvaluate = (frame, expression, cb) => evaluate({expression, frame}, cb)
  const globalEvaluate = (expression, cb) => evaluate({expression, global: true}, cb)

  const scopes = ({callFrameId: frameNumber}, cb) => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'scopes',
      arguments: {
        number: 0,
        frameNumber
      }
    }, (err, out) => {
      if (err) return cb(err)
      if (!out.res) return cb(Error('no response'))
      const {res} = out
      if (!res.body) return cb(Error('unable to get scopes'))

      const scopes = res.body.scopes.reduce((o, scope) => {
        const {type, object: {ref}} = scope
        if (type > 5) { return o }
        o[SCOPE_TYPES[type]] = scope
        scope.context = res.refs.find(({handle}) => handle === ref)
        return o
      }, {})

      cb(null, scopes)
    })
  }

  const scope = (handles, cb) => {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR)
    // TODO:
    // __proto__, this, getter/setter functions

    if (!Array.isArray(handles)) handles = [handles]

    handles = handles.map(({object: {ref}}) => ref)

    lookup({handles}, (err, out) => {
      if (err) {
        return cb(err)
      }
      if (!out.success) {
        const e = Error('scope lookup error ' + out.message)
        e.response = out
        return cb(e)
      }
      if (!out.body) {
        const e = Error('No body in lookup request')
        e.response = out
        return cb(e)
      }

      const {refs} = out

      const objList = handles.map(ref => {
        const {properties} = out.body[ref]

        if (!properties) { return }

        const props = properties.reduce((a, {name, ref, attributes = 0, propertyType}, i, arr) => {
          let {
            type, // e.g. typeof
            className, // [[Class]] constructor, only non-primitives
            value,  // only primitives
            text, // fallback for null/undefined
            source, // functions
            properties // only on non-primitives (objects, functions, arrays)
          } = refs.find(({handle}) => handle === ref)

          const descriptor = {
            writable: !(attributes & 1 << 0),
            enumerable: !(attributes & 1 << 1),
            configurable: !(attributes & 1 << 2)
          }

          const isPropertyAccessor = attributes === 6 &&
            propertyType === PROPERTY_TYPES.CALLBACKS &&
            type === 'undefined'

          // TODO - if getter/setter do an eval in frame to fetch the
          // get/set function strings (and properties) - since node/v8
          // doesn't supply the get/set methods via the api

          if (isPropertyAccessor) {
            type = 'getter/setter'
            text = '[Getter/Setter]'
          }

          a.push({name, type, className, value, text, source, properties, descriptor,
            handle: {
              object: {ref}
            }
          })

          return a
        }, [])

        return {
          meta: out.body[ref], props
        }
      })

      cb(null, objList.length > 1 ? objList : objList[0])
    })
  }

  const callstack = cb => backtrace((err, {frames, totalFrames}) => {
    if (err) return cb(err)
    if (totalFrames === 0) { return cb() }
    if (scriptIdToUrl.size) { return fetch() }

    // populate scripts cache
    scripts(fetch)

    function fetch () {
      cb(null, frames.map(({index, func, line, column, receiver}) => ({
        callFrameId: index,
        functionName: func.inferredName || func.name,
        location: {
          scriptId: func.scriptId,
          lineNumber: line,
          columnNumber: column,
          url: scriptIdToUrl.get(func.scriptId)
        },
        contextHandle: {object: receiver}
      })))
    }
  })

  const start = ({port = 5858, host = '127.0.0.1'}, cb) => {
    debug = new Debugger({port, host})

    net.createServer(socket => {
      socket.on('data', d => {
        const OUT = 1
        const ERR = 2
        const chan = d[0]
        d = d.slice(1)
        if (chan === OUT) debug.emit('stdout', d + '')
        if (chan === ERR) debug.emit('stderr', d + '')
      })
    }).listen(9000 + port)

    const connected = () => {
      const cnet = require.resolve('c-net')

      globalEvaluate(`

        (function () {
          if (process.wrappedForDebugger)

          var cnet
          var socket

          try {
            cnet = process.mainModule.require('${cnet}')
          } catch (e) {}

          try {
            socket = cnet.connect('127.0.0.1', ${9000 + port})
          } catch (e) {}

          process.stdout.write = (function(fn) {
            return function(chunk) {
              try {
                cnet.write(socket, '\u0001' + chunk)
              } catch (e) {
                socket = cnet.connect('127.0.0.1', ${9000 + port})
                try { cnet.write(socket, '\u0001' + chunk) } catch (e) {}
              }
              return fn.apply(process.stdout, arguments)
            }
          } (process.stdout.write))

          process.stderr.write = (function(fn) {
            return function(chunk) {
              try {
                cnet.write(socket, '\u0002' + chunk)
              } catch (e) {
                socket = cnet.connect('127.0.0.1', ${9000 + port})
                try { cnet.write(socket, '\u0002' + chunk) } catch (e) {}
              }
              return fn.apply(process.stderr, arguments)
            }
          } (process.stderr.write))

          process.wrappedForDebugger = true
        }())
      `, err => {
        if (err) return cb(err)
        callstack(cb)
      })
    }

    let errorState = false
    const attempt = () => {
      if (errorState) return

      debug.connect(connected)
      debug.once('error', e => {
        const {code} = e

        if (code === 'ECONNREFUSED') {
          setTimeout(attempt, 1000)
          return
        }

        errorState = true
        console.error('error', e)
      })
    }

    attempt()

    return debug
  }

  return {
    scripts,
    start,
    breakpoints,
    callstack,
    resume,
    pause,
    scopes,
    scope,
    lookup,
    evaluate,
    frameEvaluate,
    globalEvaluate,
    setBreakpoint,
    clearBreakpoint,
    stepOver,
    stepOut,
    stepInto
  }
}
