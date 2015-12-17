'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Files = function Files(_ref) {
  var items = _ref.items;
  var _ref$top = _ref.top;
  var top = _ref$top === undefined ? 1 : _ref$top;
  var left = _ref.left;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? '31%' : _ref$width;
  var _ref$height = _ref.height;
  var height = _ref$height === undefined ? '37.5%' : _ref$height;
  return _react2.default.createElement('list', {
    label: 'Files',
    'class': _style.panel,
    width: width,
    top: top,
    height: height,
    items: items,
    mouse: true,
    keys: true,
    vi: true,
    inputOnFocused: true
  });
};

exports.default = Files;
//# sourceMappingURL=index.js.map