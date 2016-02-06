'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-unknown-property */

var stat = {
  style: {
    transparent: true
  }
};

var EditorStatus = function EditorStatus(_ref) {
  var line = _ref.line;
  var file = _ref.file;
  var top = _ref.top;
  var rightEdgeLeft = _ref.rightEdgeLeft;
  var height = _ref.height;

  var status = file + ':' + line.num + ' ';
  var width = status.length - 1;
  var lineNumLength = (line.num + '').length;
  var left = rightEdgeLeft + '-' + (width + lineNumLength + (lineNumLength < 2 ? 2 : 1));

  return _react2.default.createElement(
    'text',
    {
      'class': stat,
      left: left,
      width: width,
      top: top,
      height: height
    },
    status
  );
};

exports.default = EditorStatus;
//# sourceMappingURL=index.js.map