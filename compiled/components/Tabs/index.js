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

/* eslint-disable react/no-unknown-property */

var Tabs = function Tabs(_ref) {
  var items = _ref.items;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var onSelectTab = _ref.onSelectTab;
  return _react2.default.createElement('listbar', {
    mouse: true,
    autoCommandKeys: true,
    'class': style.list,
    top: top,
    left: left,
    width: width,
    height: height,
    items: items,
    onSelectTab: onSelectTab,
    onSelect: function onSelect(label) {
      return onSelectTab(label, label && label.data && label.data.cmd && label.data.cmd.prefix - 1 || 0);
    }
  });
};

exports.default = Tabs;
//# sourceMappingURL=index.js.map