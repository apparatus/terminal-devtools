'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tree = require('../Tree');

var _Tree2 = _interopRequireDefault(_Tree);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-unknown-property */

var Navigator = function Navigator(_ref) {
  var items = _ref.items;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var focused = _ref.focused;
  var item = _ref.item;
  var tooltips = _ref.tooltips;
  var onEsc = _ref.onEsc;
  var _ref$actions = _ref.actions;
  var selectFile = _ref$actions.selectFile;
  var setEditorLine = _ref$actions.setEditorLine;
  var focusPanel = _ref$actions.focusPanel;
  return _react2.default.createElement(_Tree2.default, {
    vi: true,
    keys: true,
    mouse: true,
    inputOnFocused: true,
    indentation: 1,
    label: 'Navigator',
    focused: focused,
    'class': [style.panel, style.list, focused && style.selected],
    width: width,
    top: top,
    left: left,
    height: height,
    item: item,
    items: items,
    onKeyEscape: onEsc,
    onSelectItem: function onSelectItem(_ref2) {
      var path = _ref2.data.path;

      selectFile(path);
      setEditorLine(0);
    },
    onFocus: function onFocus() {
      return focused || focusPanel('navigator');
    },
    hoverText: tooltips && 'ctrl+n'
  });
};

exports.default = Navigator;
//# sourceMappingURL=index.js.map