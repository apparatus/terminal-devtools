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

var blessed = require('blessed');

var scr = blessed.screen({smartCSR: true});
var fs = require('fs');

scr.title = 'my window title';



var DebuggerApi = require('debugger-api');
 
// make sure node is running in debug mode: node --debug-brk=5000 
// then: 
var dbugger = new DebuggerApi({debugPort: 5000});
 
// enable debugging. 
dbugger.enable();
 
// initial breakpoint (because of debug-brk) 
dbugger.once('Debugger.paused', function(firstBreak) {
 
  var scriptId = firstBreak.callFrames[0].location.scriptId;
  //url = dbugger.scripts.findScriptByID(scriptId).url;
  dbugger.getScriptSource({scriptId: scriptId}, function(error, result){
    console.log(error);
    console.log(result);

    var box = blessed.box({
      top: 'center',
      left: 'center',
      width: '100%',
      height: '90%',
      content: result.scriptSource,
      tags: true,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: '#f0f0f0'
        },
      }
    });

    scr.append(box);

    box.on('click', function() {
      var code = fs.readFileSync(__dirname + '/package.json', 'utf8');
      box.setContent(result);
      scr.render();
    });


    scr.key(['escape', 'q', 'C-c'], function() {
      return process.exit(0);
    });

    box.focus();
    scr.render();

  });
 
  /*
  dbugger.setBreakpointByUrl({
    url: url,
    lineNumber: 4
  });
  
  dbugger.on('Debugger.paused', function (pausedResult) {
    console.log(pausedResult);
  });
  */
});


