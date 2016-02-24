'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tree = require('../Tree');

var _Tree2 = _interopRequireDefault(_Tree);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-unknown-property */

var Scope = function Scope(_ref) {
  var items = _ref.items;
  var item = _ref.item;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var focused = _ref.focused;
  var tooltips = _ref.tooltips;
  var onEsc = _ref.onEsc;
  var _ref$actions = _ref.actions;
  var focusPanel = _ref$actions.focusPanel;
  var extendScope = _ref$actions.extendScope;
  return _react2.default.createElement(_Tree2.default, {
    keys: true,
    mouse: true,
    scrollbar: true,
    inputOnFocused: true,
    labelling: true,
    label: 'Scope',
    focused: focused,
    'class': [style.panel, style.list, focused && style.selected],
    top: top,
    left: left,
    width: width,
    height: height,
    items: items,
    item: item,
    hoverText: tooltips && 'ctrl+o',
    onKeyEscape: onEsc,
    onFocus: function onFocus() {
      return focused || focusPanel('scope');
    },
    onExpand: function onExpand(item) {
      var meta = item.meta;

      if (!meta) return;
      extendScope(_extends({}, meta, { branch: item }));
    }
  });
};

exports.default = Scope;
//# sourceMappingURL=index.js.map