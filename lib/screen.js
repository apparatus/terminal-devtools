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
var blessed = require('blessed');
var cmdWindow = require('./commandWindow')();
var stackWindow = require('./stackWindow')();
var watchWindow = require('./watchWindow')();
var messageWindow = require('./messageWindow')();
var jsonTree = require('./jsonTree');

var options = {
  scrollable: true,
  alwaysScroll: true,
  top: 'center',
  left: 'center',
  width: '100%',
  height: '100%',
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
  },
  grabKeys: true
};

var treeOptions = {
  top: 'center',
  width: '98%',
  height: '95%',
  selectedFg: 'white',
  selectedBg: 'blue',
  fg: 'white',
  keys: true,
  vi: true,
  grabKeys: true
};


module.exports = function() {
  var scr;
  var box;
  var currentContext;
  var selected = 10;
  var targetScroll = 0;

  // keep target scroll against same file??
  /*
  var isVisible = function() {
    // don't rescroll if visible
  }
  */

  var renderBreakpoints = function renderBreakpoints(context) {
    var scriptId = context.bp.callFrames[0].location.scriptId;
    _.each(context.breakpoints, function(breakpoint) {
      _.each(breakpoint.locations, function(location) {
        if (location.scriptId === scriptId) {
          var line = box.getLine(location.lineNumber);
          line = '{red-bg}' + line + '{/red-bg}';
          box.setLine(location.lineNumber, line);
        }
      });
    });
  };



  var doRender = function doRender(direction, context) {
    var line;
    var lines = box.getLines().length;
    var windowLines = box.height;
    var scrollPos = box.getScroll();
    var targetLine;
    var scrollFudge = 10;

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
    if (direction === 0) {
      targetLine = context.bp.callFrames[0].location.lineNumber;
      if (targetLine > windowLines) {
        var screens = Math.floor(targetLine / windowLines);
        targetScroll = ((screens + 1) * windowLines) - scrollFudge;
        selected = targetScroll + 10;
        box.scroll(targetScroll);
      }
    }

    line = box.getLine(currentContext.lineNumber);
    line = '{green-bg}' + line + '{/green-bg}';
    box.setLine(currentContext.lineNumber, line);

    line = box.getLine(selected);
    if (line.length > 0) {
      line = '{blue-bg}' + line + '{/blue-bg}';
    }
    else {
      line = '{blue-bg} {/blue-bg}';
    }

    renderBreakpoints(context);
    box.setLine(selected, line);
    scr.render();
  };


  
  var move = function move(direction) {
    doRender(direction, currentContext);
  };



  var start = function start(handler) {
    scr = blessed.screen({smartCSR: true,
                          fullUnicode: true,
                          grabKeys: true,
                          warnings: true});
    scr.title = 'debugger';

    box = blessed.box(options);
    scr.append(box);
    scr.key(['q', 'C-c'], function() {
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
      cmdWindow.open(scr, function(command) {
        handler(command, selected);
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
    stackWindow.open(scr, context.bp);
    watchWindow.open(scr, context.bp);
    doRender(0, context);
  };



  var evalResult = function evalResult(err, result) {
    var tree;

    if (err) {
      messageWindow.open(scr, err);
      //watchWindow.setContent(scr, err);
    }
    else {
      if (result.type === 'object') {
        //messageWindow.open(scr, '');
        treeOptions.parent = watchWindow.get();
        tree = jsonTree(scr, treeOptions, result.value, 'eval');
        scr.render();
      }
      else {
        watchWindow.setContent(scr, result.value);
      }
    }
  };



  return {
    start: start,
    render: render,
    evalResult: evalResult,
    error: error
  };
};

