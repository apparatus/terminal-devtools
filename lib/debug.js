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

var DebuggerApi = require('debugger-api');

module.exports = function() {
  var currentContext = {};
  var dbg;

  var updateContext = function updateContext(bp, cb) {
    dbg.getScriptSource({scriptId: bp.callFrames[0].location.scriptId}, function(err, result){
      currentContext.source = result.scriptSource;
      currentContext.scriptId = bp.callFrames[0].location.scriptId;
      currentContext.lineNumber = bp.callFrames[0].location.lineNumber;
      currentContext.columnNumber = bp.callFrames[0].location.columnNumber;
      cb(err, currentContext);
    });
  };



  var start = function start(cb) {
    dbg = new DebuggerApi({debugPort: 5000});
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




  var setHandler =  function setHandler(handler) {
    dbg.on('Debugger.paused', function (breakPoint) {
      updateContext(breakPoint, function(err, context) {
        handler(err, context);
      });
    });
  };



  var step = function step() {
    dbg.stepOver(null, function() {
    });
  };



  var resume = function resume() {
    dbg.resume(null, function() {
    });
  };



  var setBreakpoint = function setBreakpoint(lineNumber) {
    /*
    var url = dbg.scripts.findScriptByID(currentContext.scriptId).url;
    dbg.setBreakpointByUrl({url: url, lineNumber: lineNumber}, function(err, result) {
      currentContext.breakpoints.
    });
    */
  };



  return {
    start: start,
    setHandler: setHandler,
    currentLine: currentLine,
    breakpoints: breakpoints,
    resume: resume,
    setBreakPoint: setBreakpoint,
    step: step
  };
};
 
