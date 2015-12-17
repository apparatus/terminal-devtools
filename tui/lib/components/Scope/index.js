'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scope = function Scope(_ref) {
  var items = _ref.items;
  var _ref$top = _ref.top;
  var top = _ref$top === undefined ? '40%-1' : _ref$top;
  var _ref$left = _ref.left;
  var left = _ref$left === undefined ? '49%' : _ref$left;
  var _ref$width = _ref.width;
  var width = _ref$width === undefined ? '51%' : _ref$width;
  var _ref$height = _ref.height;
  var height = _ref$height === undefined ? '37.5%+1' : _ref$height;
  return _react2.default.createElement('list', { label: 'Scope',
    'class': _style.panel,
    top: top,
    left: left,
    width: width,
    height: height,
    items: items,
    mouse: true
  });
};

exports.default = Scope;
//# sourceMappingURL=index.js.map