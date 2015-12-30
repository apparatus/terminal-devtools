'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require('React');

var _React2 = _interopRequireDefault(_React);

var _reactRedux = require('react-redux');

var _actions = require('../../actions');

var _layouts = require('../../config/layouts');

var _layouts2 = _interopRequireDefault(_layouts);

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Settings = function Settings(_ref) {
  var layout = _ref.layout;
  var dispatch = _ref.dispatch;
  var focused = _ref.focused;

  var hideWhen = function hideWhen(ch, key) {
    if (ch === '?') {
      dispatch((0, _actions.focusPanel)('editor'));
    }
  };

  var changeLayout = function changeLayout(to) {
    return function () {
      //hack - react-blessed and/or blessed currently
      //doesn't do well with multiple rendering changes
      //in the same event loop
      setImmediate(function () {
        dispatch((0, _actions.focusPanel)('editor'));
        setImmediate(function () {
          dispatch((0, _actions.setDimensions)(_layouts2.default[to]));
          dispatch((0, _actions.focusPanel)('settings'));
        });
      });
    };
  };

  return _React2.default.createElement(_components.Settings, _extends({}, layout.settings, {
    focused: focused,
    layout: layout,
    hideWhen: hideWhen,
    changeLayout: changeLayout
  }));
};

exports.default = (0, _reactRedux.connect)(function (_ref2) {
  var layout = _ref2.layout;
  return { layout: layout };
})(Settings);
//# sourceMappingURL=index.js.map