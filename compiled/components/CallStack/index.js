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

var CallStack = function CallStack(_ref) {
  var items = _ref.items;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var focused = _ref.focused;
  var tooltips = _ref.tooltips;
  var _ref$actions = _ref.actions;
  var selectFrame = _ref$actions.selectFrame;
  var focusPanel = _ref$actions.focusPanel;
  return _react2.default.createElement('list', {
    keys: true,
    mouse: true,
    inputOnFocused: true,
    label: 'CallStack',
    focused: focused,
    'class': [style.panel, style.list, focused && style.selected],
    top: top,
    width: width,
    height: height,
    left: left,
    items: items,
    onSelectItem: function onSelectItem(item) {
      var content = item.content;

      var index = item.parent.items.map(function (_ref2) {
        var content = _ref2.content;
        return content;
      }).indexOf(content);

      selectFrame(index);
    },
    onFocus: function onFocus() {
      return focused || focusPanel('callstack');
    },
    hoverText: tooltips && 'ctrl+s'
  });
};

exports.default = CallStack;
//# sourceMappingURL=index.js.map