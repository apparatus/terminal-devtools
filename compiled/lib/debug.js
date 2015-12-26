'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yadc = require('yadc');

//important: preserve order
var SCOPE_TYPES = ['global', 'local', 'with', 'closure', 'catch']; /*
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
    }, function (err, out) {
      if (err) return cb(err);
      if (!out.res) return cb(Error('no response'));
      var res = out.res;

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
    }, function (err, out) {
      if (err) return cb(err);
      if (!out.res) return cb(Error('no response'));
      var res = out.res;

      if (!res.body) return cb(Error('no backtrace'));
      cb(null, res.body);
    });
  };

  var breakpoints = function breakpoints(cb) {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'listbreakpoints'
    }, function (err, out) {
      if (err) return cb(err);
      if (!out.res) return cb(Error('no response'));
      var res = out.res;

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
    }, function (err, out) {
      if (err) return cb(err);
      if (!out.res) return cb(Error('no response'));
      var res = out.res;

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
    }, function (err, out) {
      if (err) return cb(err);
      if (!out.res) return cb(Error('no response'));
      var res = out.res;

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

  var lookup = function lookup(_ref3, cb) {
    var handles = _ref3.handles;

    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'lookup',
      arguments: {
        handles: handles
      }
    }, function (err, out) {
      if (err) return cb(err);
      if (!out.res) return cb(Error('no response'));
      var res = out.res;

      cb(null, res);
    });
  };

  var scopes = function scopes(_ref4, cb) {
    var frameNumber = _ref4.callFrameId;

    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'scopes',
      arguments: {
        number: 0, //<-- TODO what is? seen: 0, 1, 2
        frameNumber: frameNumber
      }
    }, function (err, out) {
      if (err) return cb(err);
      if (!out.res) return cb(Error('no response'));
      var res = out.res;

      if (!res.body) return cb(Error('unable to get scopes'));

      var scopes = res.body.scopes.reduce(function (o, scope) {
        var type = scope.type;
        var ref = scope.object.ref;

        if (type > 4) {
          return o;
        }
        o[SCOPE_TYPES[type]] = scope;
        scope.context = res.refs.find(function (_ref5) {
          var handle = _ref5.handle;
          return handle === ref;
        });
        return o;
      }, {});

      cb(null, scopes);
    });
  };

  var scope = function scope(_scope, cb) {
    //TODO:
    //prototype, __proto__, this, getter/setter functions
    var ref = _scope.object.ref;

    lookup({ handles: [ref] }, function (err, out) {
      var properties = out.body[ref].properties;
      var refs = out.refs;

      var props = properties.reduce(function (a, _ref6) {
        var name = _ref6.name;
        var ref = _ref6.ref;

        var _refs$find = //functions
        // only on non-primitives (objects, functions, arrays)
        refs.find(function (_ref8) {
          var handle = _ref8.handle;
          return handle === ref;
        });

        var type = _refs$find.type;
        var //typeof string
        className = _refs$find.className;
        var // [[Class]] constructor, only non-primitives
        value = _refs$find.value;
        var //only on primitives
        text = _refs$find.text;
        var //fallback for null/undefined
        source = _refs$find.source;
        var properties = _refs$find.properties;

        console.log(refs.find(function (_ref7) {
          var handle = _ref7.handle;
          return handle === ref;
        }));

        a.push({ name: name, type: type, className: className, value: value, text: text, source: source, properties: properties });

        return a;
      }, []);

      cb(null, props);
    });
  };

  var callstack = function callstack(cb) {
    return backtrace(function (err, _ref9) {
      var frames = _ref9.frames;
      var totalFrames = _ref9.totalFrames;

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
        cb(null, frames.map(function (_ref10) {
          var index = _ref10.index;
          var func = _ref10.func;
          var line = _ref10.line;
          var column = _ref10.column;
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
    scopes: scopes,
    scope: scope,
    lookup: lookup,
    // evaluate,
    setBreakpoint: setBreakpoint,
    clearBreakpoint: clearBreakpoint,
    step: step
  };
};
//# sourceMappingURL=debug.js.map