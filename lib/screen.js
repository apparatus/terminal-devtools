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
var cmdWindow = require('./commandWindow')();
var options = {
  scrollable: true,
  alwaysScroll: true,
  top: 'center',
  left: 'center',
  width: '100%',
  height: '90%',
  content: '',
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
};



module.exports = function() {
  var scr;
  var box;
  var currentContext;
  var selected = 10;


  var doRender = function doRender(direction) {
    var line;
    var lines = box.getLines().length;
    var windowLines = box.height;
    var scrollPos = box.getScroll();

    box.setContent(currentContext.source);

    if (direction > 0) {
      if (selected < lines - 1) {
        selected = selected + direction;
      }
      if (selected >= windowLines - 2) {
        box.scroll(1);
      }
    }
    if (direction < 0) {
      if (selected > 0) {
        selected = selected + direction;
      }
      if (scrollPos > 0) {
        box.scroll(-1);
      }
    }


    line = box.getLine(currentContext.lineNumber);
    line = '{red-bg}' + line + '{/red-bg}';
    box.setLine(currentContext.lineNumber, line);

    line = box.getLine(selected);
    if (line.length > 0) {
      line = '{blue-bg}' + line + '{/blue-bg}';
    }
    else {
      line = '{blue-bg} {/blue-bg}';
    }
    box.setLine(selected, line);



    //box.setLine(25, 'l1 = ' + scrollPos);

    scr.render();
  };



  var move = function move(direction) {
    doRender(direction);
  };



  var start = function start(handler) {
    scr = blessed.screen({smartCSR: true});
    scr.title = 'debugger';

    box = blessed.box(options);
    scr.append(box);
    scr.key(['escape', 'q', 'C-c'], function() {
      return process.exit(0);
    });

    scr.key(['n'], function() {
      handler('step');
    });

    scr.key(['r'], function() {
      handler('resume');
    });

    scr.key(['j'], function() {
      move(1);
    });

    scr.key(['k'], function() {
      move(-1);
    });

    scr.key([':'], function() {
      cmdWindow.open(scr, function() {
      });
    });

    box.focus();
    scr.render();
  };


  var error = function error(errMsg) {
    box.setContent(errMsg);
    scr.render();
  };


  var render = function render(context) {
    currentContext = context;
    doRender(0);
  };


  return {
    start: start,
    render: render,
    error: error
  };
};

