'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../../actions');

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = ['Sources', 'Console'];

var Tabs = function Tabs(_ref) {
  var layout = _ref.layout;
  var dispatch = _ref.dispatch;
  return _react2.default.createElement(_components.Tabs, _extends({}, layout, { items: tabs, onSelectTab: function onSelectTab(_, ix) {
      return dispatch((0, _actions.focusTab)(tabs[ix]));
    } }));
};

exports.default = (0, _reactRedux.connect)(function (_ref2) {
  var layout = _ref2.layout;
  return {
    layout: layout.tabs
  };
})(Tabs);
//# sourceMappingURL=index.js.map