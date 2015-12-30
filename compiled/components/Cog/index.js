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

var Cog = function Cog(_ref) {
  var active = _ref.active;
  var file = _ref.file;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var align = _ref.align;
  var padding = _ref.padding;
  var onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    {
      mouse: true,
      left: left,
      width: width,
      top: top,
      height: height,
      align: align,
      padding: padding,
      onClick: onClick
    },
    active ? '⚒' : '⚙'
  );
};

exports.default = Cog;
//# sourceMappingURL=index.js.map