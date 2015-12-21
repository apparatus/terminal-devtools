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

function f(lastElement) {
  console.log('LAS', lastElement);
  lastElement.style.border = { fg: 'white' };
}

var Files = function Files(_ref) {
  var items = _ref.items;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var focused = _ref.focused;
  return _react2.default.createElement('list', {
    label: 'Files',
    focused: focused,
    'class': style.panel,
    width: width,
    top: top,
    height: height,
    items: items,
    mouse: true,
    keys: true,
    inputOnFocused: true,
    onFocus: f
  });
};

exports.default = Files;
//# sourceMappingURL=index.js.map