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

var Cog = function Cog(_ref) {
  var layout = _ref.layout;
  var active = _ref.active;
  var dispatch = _ref.dispatch;
  return _react2.default.createElement(_components.Cog, _extends({}, layout, {
    active: active,
    onClick: function onClick() {
      return dispatch((0, _actions.focusPanel)('settings'));
    }
  }));
};

exports.default = (0, _reactRedux.connect)(function (_ref2) {
  var layout = _ref2.layout;
  return {
    layout: layout.cog
  };
})(Cog);
//# sourceMappingURL=index.js.map