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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debuggerApi = require('debugger-api');

var _debuggerApi2 = _interopRequireDefault(_debuggerApi);

var _yadc = require('yadc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var currentContext = { breakpoints: [] };
  var dbg = undefined;
  var raw = undefined;
  var seq = 0;
  var handler = undefined;

  var augmentStack = function augmentStack(bp) {
    var url = undefined;
    var script = undefined;

    bp.callFrames.forEach(function (_ref) {
      var location = _ref.location;

      script = dbg.scripts.findScriptByID(location.scriptId);
      if (script) {
        url = dbg.scripts.findScriptByID(location.scriptId).url;
      }
      location.url = url;
    });
  };

  var updateContext = function updateContext(bp, cb) {
    dbg.getScriptSource({ scriptId: bp.callFrames[0].location.scriptId }, function (err, result) {
      currentContext.bp = bp;
      currentContext.source = result.scriptSource;
      currentContext.scriptId = bp.callFrames[0].location.scriptId;
      currentContext.lineNumber = bp.callFrames[0].location.lineNumber;
      currentContext.columnNumber = bp.callFrames[0].location.columnNumber;
      augmentStack(bp);
      cb(err, currentContext);
    });
  };

  var fetchContext = function fetchContext(cb) {
    return dbg.once('Debugger.paused', function (bp) {
      updateContext(bp, function (err, context) {
        cb(err, context);
      });
    });
  };

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
      cb(null, res.body);
    });
  };

  var start = function start() {
    var debugPort = arguments.length <= 0 || arguments[0] === undefined ? 5858 : arguments[0];
    var cb = arguments[1];
    var contextCb = arguments[2];

    raw = new _yadc.Debugger({ port: debugPort, host: 'localhost' });
    raw.connect(function () {
      dbg = new _debuggerApi2.default({ debugPort: debugPort });
      dbg.enable();
      cb();
      fetchContext(contextCb);
    });
  };

  var currentLine = function currentLine() {};

  var breakpoints = function breakpoints(cb) {
    raw.send({
      seq: ++seq,
      type: 'request',
      command: 'listbreakpoints'
    }, function (err, scripts) {
      if (err) return cb(err);
      if (!scripts.res) return cb(Error('no response'));
      var res = scripts.res;

      if (!res.body) return cb(Error('no scripts'));
      cb(null, res.body);
    });
  };

  var setHandler = function setHandler(h) {
    handler = h;
    dbg.on('Debugger.paused', function (breakPoint) {
      updateContext(breakPoint, function (err, context) {
        handler(err, context);
      });
    });
  };

  var step = function step() {
    var cb = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
    return dbg.stepOver(null, function () {
      return fetchContext(cb);
    });
  };

  var resume = function resume() {
    var cb = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
    return dbg.resume(null, function (err) {
      if (err) {
        return cb(err);
      }
      dbg.disable(null, cb);
    });
  };

  var pause = function pause() {
    var cb = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
    return dbg.enable(null, function (err) {
      if (err) {
        return cb(err);
      }
      dbg.pause(null, cb);
    });
  };

  var source = function source(scriptId, cb) {
    return dbg.getScriptSource({ scriptId: scriptId }, cb);
  };

  var evaluate = function evaluate(expression, cb) {
    var value = undefined;
    var type = 'object';
    var opts = {
      expression: expression,
      callFrameId: currentContext.bp.callFrames[0].callFrameId
    };

    dbg.evaluateOnCallFrame(opts, function (err, result) {
      if (err) {
        return cb(err);
      }

      if (result.result.type === 'object') {
        var _opts = {
          expression: 'JSON.stringify(' + expression + ')',
          callFrameId: currentContext.bp.callFrames[0].callFrameId
        };
        dbg.evaluateOnCallFrame(_opts, function (err, _ref2) {
          var result = _ref2.result.result;

          if (err) {
            return cb(err);
          }
          try {
            value = JSON.parse(result.description);
          } catch (e) {
            value = result.description;
            type = 'string';
          }
          cb(null, { type: type, value: value });
        });
      } else {
        cb(null, { type: result.type, value: result.description });
      }
    });
  };

  var setBreakpoint = function setBreakpoint(line) {
    var scriptId = arguments.length <= 1 || arguments[1] === undefined ? currentContext.scriptId : arguments[1];
    var cb = arguments[2];

    var _dbg$scripts$findScri = dbg.scripts.findScriptByID(scriptId);

    var url = _dbg$scripts$findScri.url;

    dbg.setBreakpointByUrl({ url: url, lineNumber: line }, cb);
  };

  var clearBreakpoint = function clearBreakpoint(breakpointId, cb) {
    dbg.removeBreakpoint({ breakpointId: breakpointId }, cb);
  };

  return {
    scripts: scripts,
    start: start,
    setHandler: setHandler,
    currentLine: currentLine,
    breakpoints: breakpoints,
    resume: resume,
    pause: pause,
    source: source,
    evaluate: evaluate,
    setBreakpoint: setBreakpoint,
    clearBreakpoint: clearBreakpoint,
    step: step
  };
};
//# sourceMappingURL=debug.js.map