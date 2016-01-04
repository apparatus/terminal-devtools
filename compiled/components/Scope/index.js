'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-unknown-property */

var Scope = function Scope(_ref) {
  var items = _ref.items;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var focused = _ref.focused;
  var tooltips = _ref.tooltips;
  var focusPanel = _ref.actions.focusPanel;
  return _react2.default.createElement('list', {
    keys: true,
    mouse: true,
    scrollbar: true,
    inputOnFocused: true,
    label: 'Scope',
    focused: focused,
    'class': [style.panel, focused && style.selected],
    top: top,
    left: left,
    width: width,
    height: height,
    items: items,
    onFocus: function onFocus() {
      return focused || focusPanel('scope');
    },
    hoverText: tooltips && 'ctrl+o'
  });
};

exports.default = Scope;
//# sourceMappingURL=index.js.map