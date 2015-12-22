#!/usr/bin/env node
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


var dbg = require('./lib/debug')();
var scr = require('./lib/screen')();



    /*
     * implement:
     *   watch var
     *   unwatch var
     *
     * should be like vim - i.e. ':' allows you to run a command watch, eval etc...
     *
     * commands:
     *   stack
     *   locals
     *
     *
     * need detection of position within the file here scroll but stop when bottom of file is in view
     * scroll up but stop when top of file is in view
     * do a calc based on screen size and file size (line count)
     *
     * also only render selection on j,k otherwise its debugger and focus on that
     * also need page up and page down
     * set breakpoint / clear breakpoint
     * continue
     * stepinto
     * stepoutof
     *
     * then need stack frame window - pop up list
     * locals and we are getting close
     */
    /*
    if (selected > 20) {
      box.scroll(1);
    }
    */


dbg.start(function(err, context) {
  if (err) { return console.log(err); }

  var evtMap = {
    step: dbg.step,
    resume: dbg.resume,
    breakp: dbg.setBreakpoint,
  };



  var dbgHandler = function dbgHandler(err, context) {
    if (err) { return scr.error(err); }
    scr.render(context);
  };



  var keyHandler = function keyHandler(evt, selectedLine) {
    if (evtMap[evt]) {
      evtMap[evt](selectedLine);
    }
    else {
      dbg.evaluate(evt, function(err, result) {
        scr.evalResult(err, result);
      });
    }
  };



  dbg.setHandler(dbgHandler);
  scr.start(keyHandler);
  scr.render(context);
});

