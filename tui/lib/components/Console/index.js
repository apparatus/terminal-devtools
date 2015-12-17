'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Console = function Console(_ref) {
  var _ref$top = _ref.top;
  var top = _ref$top === undefined ? '72.5%-1' : _ref$top;
  var left = _ref.left;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? '100%-1' : _ref$width;
  var _ref$height = _ref.height;
  var height = _ref$height === undefined ? '30%' : _ref$height;
  return _react2.default.createElement('textarea', { label: 'Console',
    'class': _style.panel,
    top: top,
    left: left,
    width: width,
    height: height,
    mouse: true,
    source: '> '
  });
};

exports.default = Console;
//# sourceMappingURL=index.js.map