'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = function Editor(_ref) {
  var source = _ref.source;
  var _ref$top = _ref.top;
  var top = _ref$top === undefined ? 1 : _ref$top;
  var _ref$left = _ref.left;
  var left = _ref$left === undefined ? '30%' : _ref$left;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? '70%' : _ref$width;
  var _ref$height = _ref.height;
  var height = _ref$height === undefined ? '37.5%' : _ref$height;
  return _react2.default.createElement('textarea', {
    'class': _style.panel,
    left: left,
    width: width,
    top: top,
    height: height,
    inputOnFocus: true,
    value: source,
    mouse: true
  });
};

exports.default = Editor;
//# sourceMappingURL=index.js.map