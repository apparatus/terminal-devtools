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
  top: '50%',
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
    }
  }
};

var tableChars = { 'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
  'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
  'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '',
  'right': '', 'right-mid': '', 'middle': ' ' };
var tableStyle = { 'padding-left': 0, 'padding-right': 0 };

module.exports = function () {
  var box;

  var open = function start(scr, context) {
    options.parent = scr;
    box = blessed.box(options);
    scr.append(box);

    //box.setContent('');
    box.focus();
    scr.render();
  };

  var setContent = function setContent(content) {
    box.setContent(content);
  };

  var get = function get() {
    return box;
  };

  return {
    open: open,
    get: get,
    setContent: setContent
  };
};
//# sourceMappingURL=watchWindow.js.map