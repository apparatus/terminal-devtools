'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = function Tabs(_ref) {
  var items = _ref.items;
  var top = _ref.top;
  var _ref$left = _ref.left;
  var left = _ref$left === undefined ? '5%' : _ref$left;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? '100%' : _ref$width;
  var _ref$height = _ref.height;
  var height = _ref$height === undefined ? 'shrink' : _ref$height;
  return _react2.default.createElement('listbar', {
    top: top,
    left: left,
    width: width,
    height: height,
    autoCommandKeys: true,
    items: items,
    mouse: true
  });
};

exports.default = Tabs;
//# sourceMappingURL=index.js.map