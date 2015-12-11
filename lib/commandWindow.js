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
var formOptions = {
  width: '50%',
  height: '10%',
  border: {
    type: 'line'
        },
  keys: true,
  tags: true,
  top: 'center',
  left: 'center'
};
var textOptions = {
  top: 'center',
  left: 'center',
  width: '100%',
  height: '10%',
  content: '',
  tags: true,
  keys: true,
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
  var form;


  var open = function start(scr, cb) {
    formOptions.parent = scr;
    form = blessed.form(formOptions);

    textOptions.parent = form;
    textBox = blessed.textbox(textOptions);
    scr.append(form);

    scr.key(['return'], function() {
      // close window and hand back the content
      cb('step');
      scr.remove(form);
      scr.render();
    });

    textBox.focus();
    scr.render();
  };



  return {
    open: open
  };
};


