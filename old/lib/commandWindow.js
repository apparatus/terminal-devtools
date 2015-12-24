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
var textOptions = {
  secret: false,
  top: '95%',
  left: 'center',
  width: '100%',
  height: '7%',
  content: '',
  tags: true,
  keys: false,
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
  var textBox;

  var open = function start(scr, cb) {
    textOptions.parent = scr;
    textBox = blessed.textbox(textOptions);
    scr.append(textBox);

    scr.onceKey(['return'], function() {
      var value = textBox.getValue();
      scr.remove(textBox);
      scr.render();
      cb(value);
    });

    textBox.focus();
    scr.render();

    textBox.readInput(function() {
    });
  };

  return {
    open: open
  };
};

