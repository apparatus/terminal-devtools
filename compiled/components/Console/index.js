'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFunctional = require('react-functional');

var _reactFunctional2 = _interopRequireDefault(_reactFunctional);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-unknown-property */

var Console = function Console(_ref, cmp) {
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var focused = _ref.focused;
  var independent = _ref.independent;
  var tooltips = _ref.tooltips;
  var output = _ref.output;
  var actions = _ref.actions;

  return _react2.default.createElement('textarea', {
    ref: function ref(el) {
      cmp.el = el;
      // hack :(
      if (el && independent && focused) cmp.el.focus();
    },
    mouse: true,
    label: 'Console',
    inputOnFocus: true,
    focused: focused,
    'class': [style.panel, focused && style.selected],
    top: top,
    left: left,
    width: width,
    height: height,
    hoverText: actions && tooltips && 'ctrl+k',
    value: !(cmp && cmp.force) ? output.all + '> ' + (output.historyIndex ? output.history.slice(output.historyIndex).shift() : '') : cmp.force(),
    onFocus: function onFocus() {
      return independent || focused || actions.focusPanel('console');
    },
    onKeyTab: function onKeyTab() {
      if (independent) {
        actions.focusTab('sources');
        actions.focusPanel('console');
        return;
      }
      cmp.el._done();
      actions.focusPanel('navigator');
    },
    onKeyUp: function onKeyUp() {
      actions.consoleHistory({ step: -1 });
    },
    onKeyDown: function onKeyDown() {
      actions.consoleHistory({ step: 1 });
    },
    onKeyBackspace: function onKeyBackspace(ch, key) {
      if (cmp.el.value.substr(-2) === '\n>') {
        (function () {
          var val = cmp.el.value;
          cmp.force = function () {
            cmp.force = null;return val + ' ';
          };
          cmp.forceUpdate();
        })();
      }
    },
    onKeypress: function onKeypress(ch, key) {
      if (key.name === 'return' && !key.shift) {
        var lines = cmp.el.getLines();
        var cmd = (lines[lines.length - 2] + '').substr(2);
        actions.consoleInput(cmd);
        return;
      }
      if (independent) {
        if (key.name === 'escape') {
          // hack :( - avoids intermittent crashing
          setTimeout(function () {
            actions.focusTab('sources');
            actions.focusPanel('console');
          });
        }
      }
    }
  });
};

exports.default = (0, _reactFunctional2.default)(Console);
//# sourceMappingURL=index.js.map