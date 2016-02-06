'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _yadc = require('yadc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// important: preserve order
var SCOPE_TYPES = ['global', 'local', 'with', 'closure', 'catch', 'block', 'script']; /*
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

var PROPERTY_TYPES = {
  NORMAL: 0,
  FIELD: 1,
  CONSTANT: 2,
  CALLBACKS: 3,
  HANDLER: 4,
  INTERCEPTOR: 5,
  TRANSITION: 6,
  NONEXISTENT: 7
};

var DC_ERROR = Error('disconnected');

exports.default = function () {
  var debug = undefined;
  var seq = 0;
  var scriptIdToUrl = new Map();

  var scripts = function scripts(cb) {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    debug.send({
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
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    debug.send({
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

      if (res.running) {
        debug.emit('unpaused');
      }

      if (!res.body) return cb(Error('no backtrace'));
      cb(null, res.body);
    });
  };

  var breakpoints = function breakpoints(cb) {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    debug.send({
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

    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    debug.send({
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
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    debug.send({
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

  var step = function step(act) {
    var cb = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'continue',
      arguments: {
        stepaction: act
      }
    }, function (err) {
      if (err) return cb(err);
      callstack(cb);
    });
  };

  var stepOver = function stepOver(cb) {
    return step('next', cb);
  };
  var stepInto = function stepInto(cb) {
    return step('in', cb);
  };
  var stepOut = function stepOut(cb) {
    return step('out', cb);
  };

  var resume = function resume() {
    var cb = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    debug.send({
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

    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    debug.send({
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

    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    debug.send({
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

  var evaluate = function evaluate(_ref4, cb) {
    var expression = _ref4.expression;
    var global = _ref4.global;
    var frame = _ref4.frame;
    var context = _ref4.context;

    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    var args = { expression: expression, disable_break: true };
    if (typeof global !== 'undefined') {
      args.global = global;
    }
    if (typeof frame !== 'undefined') {
      args.frame = frame;
    }
    if (typeof context !== 'undefined') {
      args.additional_context = context;
    }
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'evaluate',
      arguments: args
    }, function (err, out) {
      if (err) return cb(err);
      if (!out.res) return cb(Error('no response'));
      cb(null, out);
    });
  };

  var frameEvaluate = function frameEvaluate(frame, expression, cb) {
    return evaluate({ expression: expression, frame: frame }, cb);
  };
  var globalEvaluate = function globalEvaluate(expression, cb) {
    return evaluate({ expression: expression, global: true }, cb);
  };

  var scopes = function scopes(_ref5, cb) {
    var frameNumber = _ref5.callFrameId;

    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    debug.send({
      seq: ++seq,
      type: 'request',
      command: 'scopes',
      arguments: {
        number: 0,
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

        if (type > 5) {
          return o;
        }
        o[SCOPE_TYPES[type]] = scope;
        scope.context = res.refs.find(function (_ref6) {
          var handle = _ref6.handle;
          return handle === ref;
        });
        return o;
      }, {});

      cb(null, scopes);
    });
  };

  var scope = function scope(handles, cb) {
    if (!debug.client || !debug.client.writable) return cb(DC_ERROR);
    // TODO:
    // __proto__, this, getter/setter functions

    if (!Array.isArray(handles)) handles = [handles];

    handles = handles.map(function (_ref7) {
      var ref = _ref7.object.ref;
      return ref;
    });

    lookup({ handles: handles }, function (err, out) {
      if (err) {
        return cb(err);
      }
      if (!out.success) {
        var e = Error('scope lookup error ' + out.message);
        e.response = out;
        return cb(e);
      }
      if (!out.body) {
        var e = Error('No body in lookup request');
        e.response = out;
        return cb(e);
      }

      var refs = out.refs;

      var objList = handles.map(function (ref) {
        var properties = out.body[ref].properties;

        if (!properties) {
          return;
        }

        var props = properties.reduce(function (a, _ref8, i, arr) {
          var name = _ref8.name;
          var ref = _ref8.ref;
          var _ref8$attributes = _ref8.attributes;
          var attributes = _ref8$attributes === undefined ? 0 : _ref8$attributes;
          var propertyType = _ref8.propertyType;

          var _refs$find = // functions
          // only on non-primitives (objects, functions, arrays)
          refs.find(function (_ref9) {
            var handle = _ref9.handle;
            return handle === ref;
          });

          var type = _refs$find.type;
          var // e.g. typeof
          className = _refs$find.className;
          var // [[Class]] constructor, only non-primitives
          value = _refs$find.value;
          var // only primitives
          text = _refs$find.text;
          var // fallback for null/undefined
          source = _refs$find.source;
          var properties = _refs$find.properties;

          var descriptor = {
            writable: !(attributes & 1 << 0),
            enumerable: !(attributes & 1 << 1),
            configurable: !(attributes & 1 << 2)
          };

          var isPropertyAccessor = attributes === 6 && propertyType === PROPERTY_TYPES.CALLBACKS && type === 'undefined';

          // TODO - if getter/setter do an eval in frame to fetch the
          // get/set function strings (and properties) - since node/v8
          // doesn't supply the get/set methods via the api

          if (isPropertyAccessor) {
            type = 'getter/setter';
            text = '[Getter/Setter]';
          }

          a.push({ name: name, type: type, className: className, value: value, text: text, source: source, properties: properties, descriptor: descriptor,
            handle: {
              object: { ref: ref }
            }
          });

          return a;
        }, []);

        return {
          meta: out.body[ref], props: props
        };
      });

      cb(null, objList.length > 1 ? objList : objList[0]);
    });
  };

  var callstack = function callstack(cb) {
    return backtrace(function (err, _ref10) {
      var frames = _ref10.frames;
      var totalFrames = _ref10.totalFrames;

      if (err) return cb(err);
      if (totalFrames === 0) {
        return cb();
      }
      if (scriptIdToUrl.size) {
        return fetch();
      }

      // populate scripts cache
      scripts(fetch);

      function fetch() {
        cb(null, frames.map(function (_ref11) {
          var index = _ref11.index;
          var func = _ref11.func;
          var line = _ref11.line;
          var column = _ref11.column;
          var receiver = _ref11.receiver;
          return {
            callFrameId: index,
            functionName: func.inferredName || func.name,
            location: {
              scriptId: func.scriptId,
              lineNumber: line,
              columnNumber: column,
              url: scriptIdToUrl.get(func.scriptId)
            },
            contextHandle: { object: receiver }
          };
        }));
      }
    });
  };

  var start = function start(_ref12, cb) {
    var _ref12$port = _ref12.port;
    var port = _ref12$port === undefined ? 5858 : _ref12$port;
    var _ref12$host = _ref12.host;
    var host = _ref12$host === undefined ? '127.0.0.1' : _ref12$host;

    debug = new _yadc.Debugger({ port: port, host: host });
    var stdout = __dirname + '/../' + port + '.stdout';
    var stderr = __dirname + '/../' + port + '.stderr';

    if (_fs2.default.existsSync(stdout)) _fs2.default.unlinkSync(stdout);
    if (_fs2.default.existsSync(stderr)) _fs2.default.unlinkSync(stderr);

    _fs2.default.writeFileSync(stdout, '');
    _fs2.default.writeFileSync(stderr, '');

    var stdoutFd = _fs2.default.openSync(stdout, 'r');
    var stderrFd = _fs2.default.openSync(stderr, 'r');

    var lastStdoutSize = 0;
    var lastStderrSize = 0;

    _fs2.default.watch(stdout, function (evt) {
      if (!/change/.test(evt)) return;

      var _fs$statSync = _fs2.default.statSync(stdout);

      var size = _fs$statSync.size;

      var bufferSize = size - lastStdoutSize;
      var buffer = Buffer(bufferSize);
      lastStdoutSize = size;
      if (!bufferSize) return;
      _fs2.default.readSync(stdoutFd, buffer, 0, bufferSize, 'utf8');
      debug.emit('stdout', buffer + '');
    });

    _fs2.default.watch(stderr, function (evt) {
      if (!/change/.test(evt)) return;

      var _fs$statSync2 = _fs2.default.statSync(stdout);

      var size = _fs$statSync2.size;

      var bufferSize = size - lastStderrSize;
      var buffer = Buffer(bufferSize);
      lastStderrSize = size;
      if (!bufferSize) return;
      _fs2.default.readSync(stderrFd, buffer, 0, bufferSize, 'utf8');
      debug.emit('stderr', buffer + '');
    });

    var connected = function connected() {
      callstack(function (err, stack) {
        globalEvaluate('\n          (function () {\n            if (process.wrappedForDebugger) return\n            process.stdout.write = (function(fn) {\n              return function(chunk) {\n                try {\n                  process.mainModule.require(\'fs\').appendFileSync(\'' + stdout + '\', chunk)\n                } catch (e) {\n          \n                }\n\n                return fn.apply(process.stdout, arguments)\n              }\n            } (process.stdout.write))\n\n            process.stderr.write = (function(fn) {\n              return function(chunk) {\n                try {\n                  process.mainModule.require(\'fs\').appendFileSync(\'' + stderr + '\', chunk)\n                } catch (e) {\n\n                }\n                return fn.apply(process.stderr, arguments)\n              }\n            } (process.stderr.write))\n\n            process.wrappedForDebugger = true\n          }())\n        ', function (evalErr) {
          cb(err || evalErr, stack);
        });
      });
    };

    var errorState = false;
    var attempt = function attempt() {
      if (errorState) return;
      debug.connect(connected);
      debug.once('error', function (e) {
        var code = e.code;

        if (code === 'ECONNREFUSED') {
          setTimeout(attempt, 1000); //TODO cancel previous connect on timeout
          return;
        }

        errorState = true;
        console.error('error', e);
      });
    };

    attempt();

    return debug;
  };

  return {
    scripts: scripts,
    start: start,
    breakpoints: breakpoints,
    callstack: callstack,
    resume: resume,
    pause: pause,
    scopes: scopes,
    scope: scope,
    lookup: lookup,
    evaluate: evaluate,
    frameEvaluate: frameEvaluate,
    globalEvaluate: globalEvaluate,
    setBreakpoint: setBreakpoint,
    clearBreakpoint: clearBreakpoint,
    stepOver: stepOver,
    stepOut: stepOut,
    stepInto: stepInto
  };
};
//# sourceMappingURL=debug.js.map