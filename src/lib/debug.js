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

'use strict';

import DebuggerApi from 'debugger-api'
import {Debugger} from 'yadc'

export default () => {
  const currentContext = {breakpoints: []}
  let dbg
  let raw
  let seq = 0
  let handler

  const augmentStack = bp => {
    let url
    let script

    bp.callFrames.forEach(({location}) => {
      script = dbg.scripts.findScriptByID(location.scriptId)
      if (script) {
        url = dbg.scripts.findScriptByID(location.scriptId).url
      }
      location.url = url
    })
  }

  const updateContext = (bp, cb) => {
    dbg.getScriptSource({scriptId: bp.callFrames[0].location.scriptId}, (err, result) => {
      currentContext.bp = bp
      currentContext.source = result.scriptSource
      currentContext.scriptId = bp.callFrames[0].location.scriptId
      currentContext.lineNumber = bp.callFrames[0].location.lineNumber
      currentContext.columnNumber = bp.callFrames[0].location.columnNumber
      augmentStack(bp)
      cb(err, currentContext)
    })
  }

  const fetchContext = cb => dbg.once('Debugger.paused', bp => {
    updateContext(bp, (err, context) => {
      cb(err, context)
    })
  })

  const scripts = cb => {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'scripts',
      arguments: {
        types: 4,
        includeSource: true
      } 
    }, function (err, scripts) {
      if (err) return cb(err)
      if (!scripts.res) return cb(Error('no response'))
      const {res} = scripts
      if (!res.body) return cb(Error('no scripts'))
      cb(null, res.body)
    })
  }

  const start = (debugPort = 5858, cb, contextCb) => {

    raw = new Debugger({port: debugPort, host: 'localhost'})
    raw.connect(() => {
      dbg = new DebuggerApi({debugPort})
      dbg.enable()
      cb()
      fetchContext(contextCb)
    })

  }

  const currentLine = () => {}

  const breakpoints = cb => {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'listbreakpoints'
    }, function (err, scripts) {
      if (err) return cb(err)
      if (!scripts.res) return cb(Error('no response'))
      const {res} = scripts
      if (!res.body) return cb(Error('no scripts'))
      cb(null, res.body)
    })
  }

  const setHandler = h => {
    handler = h
    dbg.on('Debugger.paused', breakPoint => {
      updateContext(breakPoint, (err, context) => {
        handler(err, context)
      })
    })
  }

  const step = (cb=()=>{}) => dbg.stepOver(null, () => fetchContext(cb))

  const resume = (cb=()=>{}) => dbg.resume(null, err => {
    if (err) { return cb(err) }
    dbg.disable(null, cb)
  })

  const pause = (cb=()=>{}) => dbg.enable(null, err => {
    if (err) { return cb(err) }
    dbg.pause(null, cb)
  })

  const source = (scriptId, cb) => dbg.getScriptSource({scriptId}, cb)

  const evaluate = (expression, cb) => {
    let value
    let type = 'object'
    const opts = {
      expression, 
      callFrameId: currentContext.bp.callFrames[0].callFrameId
    }

    dbg.evaluateOnCallFrame(opts, (err, result) => {
      if (err) { return cb(err) }

      if (result.result.type === 'object') {
        const opts = {
          expression: 'JSON.stringify(' + expression + ')', 
          callFrameId: currentContext.bp.callFrames[0].callFrameId
        }
        dbg.evaluateOnCallFrame(opts, (err, {result:{result}}) => {
          if (err) { return cb(err) }
          try {
            value = JSON.parse(result.description)
          }
          catch (e) {
            value = result.description
            type = 'string'
          }
          cb(null, {type: type, value: value})
        });
      }
      else {
        cb(null, {type: result.type, value: result.description})
      }
    })
  }

  const setBreakpoint = (line, scriptId = currentContext.scriptId, cb) => {
    const {url} = dbg.scripts.findScriptByID(scriptId)
    dbg.setBreakpointByUrl({url, lineNumber: line}, cb)
  }

  const clearBreakpoint = (breakpointId, cb) => {
    dbg.removeBreakpoint({breakpointId}, cb)
  }


  return {
    scripts,
    start,
    setHandler,
    currentLine,
    breakpoints,
    resume,
    pause,
    source,
    evaluate,
    setBreakpoint,
    clearBreakpoint,
    step
  }
}
 
