'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require('React');

var _React2 = _interopRequireDefault(_React);

var _reactRedux = require('react-redux');

var _blessed = require('blessed');

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sources = function Sources(_ref) {
  var layout = _ref.layout;
  var file = _ref.file;
  var source = _ref.source;
  var files = _ref.files;
  var callstack = _ref.callstack;
  var breakpoints = _ref.breakpoints;
  var scope = _ref.scope;
  var panel = _ref.panel;
  return _React2.default.createElement(
    'element',
    layout.element,
    _React2.default.createElement(_components.Files, _extends({ items: files, focused: panel === 'files' }, layout.files)),
    _React2.default.createElement(_components.Editor, _extends({ source: source, focused: panel === 'editor' }, layout.editor)),
    _React2.default.createElement(_components.CallStack, _extends({ items: callstack, focused: panel === 'callstack' }, layout.callstack)),
    _React2.default.createElement(_components.BreakPoints, _extends({ items: breakpoints, focused: panel === 'breakpoints' }, layout.breakpoints)),
    _React2.default.createElement(_components.Scope, _extends({ items: scope, focused: panel === 'scope' }, layout.scope)),
    _React2.default.createElement(_components.Console, _extends({ focused: panel === 'console' }, layout.console))
  );
};

var mapper = function mapper(_ref2) {
  var layout = _ref2.layout;
  var file = _ref2.file;
  var source = _ref2.source;
  var files = _ref2.files;
  var callstack = _ref2.callstack;
  var breakpoints = _ref2.breakpoints;
  var scope = _ref2.scope;
  var panel = _ref2.panel;
  return {
    layout: layout.sources,
    file: file,
    source: source,
    files: files,
    callstack: callstack,
    breakpoints: breakpoints,
    scope: scope,
    panel: panel
  };
};

exports.default = (0, _reactRedux.connect)(mapper)(Sources);
//# sourceMappingURL=index.js.map