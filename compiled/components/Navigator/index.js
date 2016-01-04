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

var Navigator = function Navigator(_ref) {
  var items = _ref.items;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var focused = _ref.focused;
  var index = _ref.index;
  var tooltips = _ref.tooltips;
  var _ref$actions = _ref.actions;
  var selectFile = _ref$actions.selectFile;
  var setEditorLine = _ref$actions.setEditorLine;
  var focusPanel = _ref$actions.focusPanel;
  return _react2.default.createElement('list', {
    vi: true,
    keys: true,
    mouse: true,
    inputOnFocused: true,
    label: 'Navigator',
    focused: focused,
    selected: index,
    'class': [style.panel, style.list, focused && style.selected],
    width: width,
    top: top,
    height: height,
    items: items,
    onSelectItem: function onSelectItem(_ref2) {
      var item = _ref2.content;

      selectFile(item);
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