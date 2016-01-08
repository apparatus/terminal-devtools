'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require('React');

var _React2 = _interopRequireDefault(_React);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../../actions');

var actionCreators = _interopRequireWildcard(_actions);

var _components = require('../../components');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Console = function Console(_ref) {
  var layout = _ref.layout;
  var output = _ref.output;
  var actions = _ref.actions;
  return _React2.default.createElement(_components.Console, _extends({ focused: true, independent: true, output: output, actions: actions }, layout.element));
};

var mapDispatch = function mapDispatch(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actionCreators, dispatch)
  };
};

exports.default = (0, _reactRedux.connect)(function (_ref2) {
  var layout = _ref2.layout;
  var output = _ref2.output;
  return {
    layout: layout.console,
    output: output
  };
}, mapDispatch)(Console);
//# sourceMappingURL=index.js.map