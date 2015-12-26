'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yadc = require('yadc');

exports.default = function () {
  var raw = undefined;
  var seq = 0;
  var scriptIdToUrl = new Map();

  var scripts = function scripts(cb) {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'scripts',
      arguments: {
        types: 4,
        includeSource: true
      }
    }, function (err, scripts) {
      if (err) return cb(err);
      if (!scripts.res) return cb(Error('no response'));
      var res = scripts.res;

      if (!res.body) return cb(Error('no scripts'));
      res.body.forEach(function (_ref) {
        var id = _ref.id;
        var name = _ref.name;
        return scriptIdToUrl.set(id, name);
      });
      cb(null, res.body);
    });
  };

  var backtrace = function backtrace(cb) {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'backtrace',
      arguments: {
        inlineRefs: true,
        fromFrame: 0,
        maxStringLength: 10000
      }
    }, function (err, bt) {
      if (err) return cb(err);
      if (!bt.res) return cb(Error('no response'));
      var res = bt.res;

      if (!res.body) return cb(Error('no backtrace'));
      cb(null, res.body);
    });
  };

  var breakpoints = function breakpoints(cb) {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'listbreakpoints'
    }, function (err, breakpoints) {
      if (err) return cb(err);
      if (!breakpoints.res) return cb(Error('no response'));
      var res = breakpoints.res;

      if (!res.body) return cb(Error('no breakpoints'));
      res.body.breakpoints = res.body.breakpoints.filter(function (bp) {
        return bp.type === 'scriptName';
      });
      cb(null, res.body);
    });
  };

  var setBreakpoint = function setBreakpoint(_ref2, cb) {
    var line = _ref2.line;
    var target = _ref2.file;

    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'setbreakpoint',
      arguments: {
        type: 'script', target: target, line: line
      }
    }, function (err, breakpoint) {
      if (err) return cb(err);
      if (!breakpoint.res) return cb(Error('no response'));
      var res = breakpoint.res;

      if (!res.body) return cb(Error('unable to set breakpoint'));
      cb(null, res.body);
    });
  };

  var clearBreakpoint = function clearBreakpoint(breakpoint, cb) {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'clearbreakpoint',
      arguments: {
        type: 'script',
        breakpoint: breakpoint
      }
    }, function (err, breakpoint) {
      if (err) return cb(err);
      if (!breakpoint.res) return cb(Error('no response'));
      var res = breakpoint.res;

      if (!res.body) return cb(Error('unable to unset breakpoint'));
      cb(null, res.body);
    });
  };

  var step = function step() {
    var cb = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'continue',
      arguments: {
        stepaction: 'next'
      }
    }, function (err) {
      if (err) return cb(err);
      callstack(cb);
    });
  };

  var resume = function resume() {
    var cb = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'continue'
    }, function (err) {
      if (err) return cb(err);
      cb();
    });
  };

  var pause = function pause() {
    var cb = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'suspend'
    }, function (err) {
      if (err) return cb(err);
      callstack(cb);
    });
  };

  var callstack = function callstack(cb) {
    return backtrace(function (err, _ref3) {
      var frames = _ref3.frames;
      var totalFrames = _ref3.totalFrames;

      if (err) return cb(err);
      if (totalFrames === 0) {
        return cb();
      }
      if (scriptIdToUrl.size) {
        return fetch();
      }

      //populate scripts cache
      scripts(fetch);

      function fetch() {
        cb(null, frames.map(function (_ref4) {
          var index = _ref4.index;
          var func = _ref4.func;
          var line = _ref4.line;
          var column = _ref4.column;
          return {
            callFrameId: index,
            functionName: func.inferredName || func.name,
            location: {
              scriptId: func.scriptId,
              lineNumber: line,
              columnNumber: column,
              url: scriptIdToUrl.get(func.scriptId)
            }
          };
        }));
      }
    });
  };

  var start = function start() {
    var debugPort = arguments.length <= 0 || arguments[0] === undefined ? 5858 : arguments[0];
    var cb = arguments[1];

    raw = new _yadc.Debugger({ port: debugPort, host: 'localhost' });
    raw.connect(function () {
      return callstack(cb);
    });
  };

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
    scripts: scripts,
    start: start,
    breakpoints: breakpoints,
    resume: resume,
    pause: pause,
    // evaluate,
    setBreakpoint: setBreakpoint,
    clearBreakpoint: clearBreakpoint,
    step: step
  };
}; /*
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
//# sourceMappingURL=debug.js.map