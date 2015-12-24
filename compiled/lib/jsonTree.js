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

module.exports = function (screen, options, obj, name) {
  var _obj = {};
  var _list = blessed.list(options);
  var _index;

  var whitespace = function whitespace(depth) {
    var ws = '';
    for (var i = 0; i < depth; ++i) {
      ws += '  ';
    }
    return ws;
  };

  var setMeta = function setMeta(obj, depth) {
    _.each(_.keys(obj), function (key) {
      if (_.isObject(obj[key])) {
        setMeta(obj[key], depth + 1);
        obj[key].meta = { expanded: false, depth: depth };
      }
    });
  };

  var clearIndex = function clearIndex(obj) {
    _.each(_.keys(obj), function (key) {
      if (_.isObject(obj[key])) {
        if (obj[key].meta) {
          obj[key].meta.index = null;
        }
        clearIndex(obj[key]);
      }
    });
  };

  var traverse = function traverse(obj, depth) {
    var items = [];
    var s;

    _.each(_.keys(obj), function (key) {
      if (_.isObject(obj[key])) {
        if (key !== 'meta') {
          if (obj[key].meta.expanded === true) {
            s = whitespace(depth) + key + ' [-]';
            items.push(s);
            obj[key].meta.index = _index;
            _index++;
            items = _(items).concat(traverse(obj[key], depth + 1)).value();
          } else {
            s = whitespace(depth) + key + ' [+]';
            obj[key].meta.index = _index;
            items.push(s);
            _index++;
          }
          obj[key].meta.match = s;
        }
      } else {
        items.push(whitespace(depth) + key + ': ' + obj[key]);
        _index++;
      }
    });
    return items;
  };

  var doSelect = function doSelect(obj, index) {
    _.each(_.keys(obj), function (key) {
      if (_.isObject(obj[key])) {
        if (obj[key].meta && obj[key].meta.index && obj[key].meta.index === index) {
          obj[key].meta.expanded = !obj[key].meta.expanded;
        } else {
          doSelect(obj[key], index);
        }
      }
    });
  };

  var render = function render() {
    clearIndex(_obj);
    _index = 0;
    _list.setItems(traverse(_obj, 0));
  };

  var init = function init() {
    _obj[name] = obj;
    setMeta(_obj, 1);
    _obj.meta = { expanded: true, depth: 0 };
    _obj[name].meta.expanded = true;
    render();
    _list.focus();

    _list.on('select', function (line) {
      debugger;
      doSelect(_obj, _list.getItemIndex(line));
      render();
      _list.focus();
      screen.render();
    });
  };

  var get = function get() {
    return _list;
  };

  init();
  return {
    get: get
  };
};
//# sourceMappingURL=jsonTree.js.map