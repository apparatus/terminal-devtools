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

var path = require('path');
var _ = require('lodash');
var cliTable = require('cli-table');
var blessed = require('blessed');
var options = {
  scrollable: true,
  alwaysScroll: true,
  top: '0%',
  left: '60%',
  width: '40%',
  height: '50%',
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

var tableChars = { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': '',
                   'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': '',
                   'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': '',
                   'right': '' , 'right-mid': '' , 'middle': ' ' };
var tableStyle = { 'padding-left': 0, 'padding-right': 0 };



module.exports = function() {
  var box;


  var buildContent = function buildContent(context) {
    var table = new cliTable({chars: tableChars, style: tableStyle,
                              head: ['file', 'function', 'line'], colWidths: [20, 30, 8]});
    _.each(context.callFrames, function(callFrame) {
      table.push([path.basename(callFrame.location.url), 
                  callFrame.functionName.length > 0 ? callFrame.functionName : 'anonymous',
                  callFrame.location.lineNumber]);
    });
    return table.toString();
  };



  var open = function start(scr, context) {
    options.parent = scr;
    box = blessed.box(options);
    scr.append(box);

    box.setContent(buildContent(context));
    box.focus();
    scr.render();
  };

  return {
    open: open
  };
};

