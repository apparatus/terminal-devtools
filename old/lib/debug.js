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

var _ = require('lodash');
var DebuggerApi = require('debugger-api');


module.exports = function() {
  var currentContext = {breakpoints: []};
  var dbg;
  var handler;


  var augmentStack = function augmentStack(bp) {
    var url;
    var script;
    _.each(bp.callFrames, function(callFrame) {
      script = dbg.scripts.findScriptByID(callFrame.location.scriptId);
      if (script) {
        url = dbg.scripts.findScriptByID(callFrame.location.scriptId).url;
      }
      callFrame.location.url = url;
    });
  };



  var updateContext = function updateContext(bp, cb) {
    dbg.getScriptSource({scriptId: bp.callFrames[0].location.scriptId}, function(err, result){
      currentContext.bp = bp;
      currentContext.source = result.scriptSource;
      currentContext.scriptId = bp.callFrames[0].location.scriptId;
      currentContext.lineNumber = bp.callFrames[0].location.lineNumber;
      currentContext.columnNumber = bp.callFrames[0].location.columnNumber;
      augmentStack(bp);
      cb(err, currentContext);
    });
  };



  var start = function start(cb) {
    dbg = new DebuggerApi({debugPort: 5858});
    dbg.enable();
    dbg.once('Debugger.paused', function(firstBreak) {
      updateContext(firstBreak, function(err, context) {
        cb(err, context);
      });
    });
  };



  var currentLine = function currentLine() {
  };



  var breakpoints = function breakpoints() {
  };




  var setHandler =  function setHandler(h) {
    handler = h;
    dbg.on('Debugger.paused', function (breakPoint) {
      updateContext(breakPoint, function(err, context) {
        handler(err, context);
      });
    });
  };



  var step = function step() {
    dbg.stepOver(null, function() {
      dbg.once('Debugger.paused', function () {
        console.log('OK')
      })
    });
  };



  var resume = function resume() {
    dbg.resume(null, function() {
    });
  };



  var evaluate = function evaluate(expression, cb) {
    var value;
    var type = 'object';

    dbg.evaluateOnCallFrame({expression: expression, callFrameId: currentContext.bp.callFrames[0].callFrameId}, function(err, result) {
      if (err) { return cb(err); }

      if (result.result.type === 'object') {
        dbg.evaluateOnCallFrame({expression: 'JSON.stringify(' + expression + ')', callFrameId: currentContext.bp.callFrames[0].callFrameId}, function(err, result) {
          if (err) { return cb(err); }
          try {
            value = JSON.parse(result.result.description);
          }
          catch (e) {
            value = result.result.description;
            type = 'string';
          }
          cb(null, {type: type, value: value});
        });
      }
      else {
        cb(null, {type: result.result.type, value: result.result.description});
      }
    });
  };



  var setBreakpoint = function setBreakpoint(line) {
    var url = dbg.scripts.findScriptByID(currentContext.scriptId).url;
    dbg.setBreakpointByUrl({url: url, lineNumber: line}, function(err, result) {
      currentContext.breakpoints.push(result);
      handler(err, currentContext);
    });
  };



  return {
    start: start,
    setHandler: setHandler,
    currentLine: currentLine,
    breakpoints: breakpoints,
    resume: resume,
    evaluate: evaluate,
    setBreakpoint: setBreakpoint,
    step: step
  };
};
 
