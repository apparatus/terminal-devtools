'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require('React');

var _React2 = _interopRequireDefault(_React);

var _reactRedux = require('react-redux');

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sources = function Sources(props) {
  return _React2.default.createElement(
    'element',
    null,
    _React2.default.createElement(_components.Tabs, { items: ['Sources', 'Networking', 'Profiling', 'Console'] }),
    _React2.default.createElement(_components.Files, { items: ['file 1', 'file 2'] }),
    _React2.default.createElement(_components.Editor, { source: '//js source' }),
    _React2.default.createElement(_components.CallStack, { items: ['frame 1', 'frame 2'] }),
    _React2.default.createElement(_components.BreakPoints, { items: ['breakpoint 1', 'breakpoint 2'] }),
    _React2.default.createElement(_components.Scope, { items: ['object 1', 'object 2'] }),
    _React2.default.createElement(_components.Console, null)
  );
};

exports.default = (0, _reactRedux.connect)(function (_ref) {
  var tab = _ref.tab;
  var file = _ref.file;
  var source = _ref.source;
  var callstack = _ref.callstack;
  var breakpoints = _ref.breakpoints;
  var scope = _ref.scope;
  var panel = _ref.panel;
  return { file: file, source: source, callstack: callstack, breakpoints: breakpoints, scope: scope, panel: panel };
})(Sources);
//# sourceMappingURL=index.js.map