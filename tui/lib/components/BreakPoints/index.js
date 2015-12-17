'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreakPoints = function BreakPoints(_ref) {
  var items = _ref.items;
  var _ref$top = _ref.top;
  var top = _ref$top === undefined ? '60%-2' : _ref$top;
  var left = _ref.left;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? '50%' : _ref$width;
  var _ref$height = _ref.height;
  var height = _ref$height === undefined ? '17.5%+1' : _ref$height;
  return _react2.default.createElement('list', {
    label: 'BreakPoints',
    'class': _style.panel,
    top: top,
    left: left,
    width: width,
    height: height,
    items: items,
    mouse: true
  });
};

exports.default = BreakPoints;
//# sourceMappingURL=index.js.map