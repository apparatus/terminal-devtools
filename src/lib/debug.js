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

import {Debugger} from 'yadc'

export default () => {
  let raw
  let seq = 0
  const scriptIdToUrl = new Map

  const scripts = cb => {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'scripts',
      arguments: {
        types: 4,
        includeSource: true
      } 
    }, (err, scripts) => {
      if (err) return cb(err)
      if (!scripts.res) return cb(Error('no response'))
      const {res} = scripts
      if (!res.body) return cb(Error('no scripts'))
      res.body.forEach(({id, name}) => scriptIdToUrl.set(id, name))
      cb(null, res.body)
    })
  }

  const backtrace = cb => {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'backtrace',
      arguments: {
        inlineRefs: true,
        fromFrame: 0,
        maxStringLength: 10000
      }
    }, (err, bt) => {
      if (err) return cb(err)
      if (!bt.res) return cb(Error('no response'))
      const {res} = bt
      if (!res.body) return cb(Error('no backtrace'))
      cb(null, res.body)
    })
  }

  const breakpoints = cb => {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'listbreakpoints'
    }, (err, breakpoints) => {
      if (err) return cb(err)
      if (!breakpoints.res) return cb(Error('no response'))
      const {res} = breakpoints
      if (!res.body) return cb(Error('no breakpoints'))
      res.body.breakpoints = res.body.breakpoints.filter(bp => bp.type === 'scriptName')
      cb(null, res.body)
    })
  }

  const setBreakpoint = ({line, file:target}, cb) => {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'setbreakpoint',
      arguments: {
        type: 'script', target, line
      }
    }, (err, breakpoint) => {
      if (err) return cb(err)
      if (!breakpoint.res) return cb(Error('no response'))
      const {res} = breakpoint
      if (!res.body) return cb(Error('unable to set breakpoint'))
      cb(null, res.body)
    })
  }

  const clearBreakpoint = (breakpoint, cb) => {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'clearbreakpoint',
      arguments: {
        type: 'script',
        breakpoint
      }
    }, (err, breakpoint) => {
      if (err) return cb(err)
      if (!breakpoint.res) return cb(Error('no response'))
      const {res} = breakpoint
      if (!res.body) return cb(Error('unable to unset breakpoint'))
      cb(null, res.body)
    })
  }

  const step = (cb=()=>{}) => {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'continue',
      arguments: {
        stepaction: 'next'
      }
    }, (err) => {
      if (err) return cb(err)
      callstack(cb)
    })
  }

  const resume = (cb=()=>{}) => {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'continue',
    }, (err) => {
      if (err) return cb(err)
      cb()
    })
  }

  const pause = (cb=()=>{}) => {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'suspend',
    }, (err) => {
      if (err) return cb(err)
      callstack(cb)
    })
  }

  const callstack = cb => backtrace((err, {frames, totalFrames}) => {
    if (err) return cb(err)
    if (totalFrames === 0) { return cb() }
    if (scriptIdToUrl.size) { return fetch() }

    //populate scripts cache
    scripts(fetch)
    
    function fetch () {
      cb(null, frames.map(({index, func, line, column}) => ({
        callFrameId: index,
        functionName: func.inferredName || func.name,
        location: {
          scriptId: func.scriptId,
          lineNumber: line,
          columnNumber: column,
          url: scriptIdToUrl.get(func.scriptId)
        }
      })))
    }
  })
  
  const start = (debugPort = 5858, cb) => {

    raw = new Debugger({port: debugPort, host: 'localhost'})
    raw.connect(() => callstack(cb))

  }

  // const evaluate = (expression, cb) => {
  //   let value
  //   let type = 'object'
  //   const opts = {
  //     expression, 
  //     callFrameId: currentContext.bp.callFrames[0].callFrameId
  //   }

  //   dbg.evaluateOnCallFrame(opts, (err, result) => {
  //     if (err) { return cb(err) }

  //     if (result.result.type === 'object') {
  //       const opts = {
  //         expression: 'JSON.stringify(' + expression + ')', 
  //         callFrameId: currentContext.bp.callFrames[0].callFrameId
  //       }
  //       dbg.evaluateOnCallFrame(opts, (err, {result:{result}}) => {
  //         if (err) { return cb(err) }
  //         try {
  //           value = JSON.parse(result.description)
  //         }
  //         catch (e) {
  //           value = result.description
  //           type = 'string'
  //         }
  //         cb(null, {type: type, value: value})
  //       });
  //     }
  //     else {
  //       cb(null, {type: result.type, value: result.description})
  //     }
  //   })
  // }


  return {
    scripts,
    start,
    breakpoints,
    resume,
    pause,
    // evaluate,
    setBreakpoint,
    clearBreakpoint,
    step
  }
} 
