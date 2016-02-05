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

var Controls = function Controls(_ref) {
  var layout = _ref.layout;
  var tooltips = _ref.tooltips;
  var paused = _ref.paused;
  var dispatch = _ref.dispatch;
  return _react2.default.createElement(_components.Controls, _extends({}, layout, {
    paused: paused,
    tooltips: tooltips,
    pauseResume: function pauseResume() {
      return paused ? dispatch((0, _actions.resume)()) : dispatch((0, _actions.pause)());
    },
    stepOver: function stepOver() {
      return dispatch((0, _actions.stepOver)());
    },
    stepInto: function stepInto() {
      return dispatch((0, _actions.stepInto)());
    },
    stepOut: function stepOut() {
      return dispatch((0, _actions.stepOut)());
    }
  }));
};

exports.default = (0, _reactRedux.connect)(function (_ref2) {
  var layout = _ref2.layout;
  var tooltips = _ref2.tooltips;
  var paused = _ref2.paused;
  return {
    layout: layout.controls,
    tooltips: tooltips,
    paused: paused
  };
})(Controls);
//# sourceMappingURL=index.js.map