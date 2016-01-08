'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require('React');

var _React2 = _interopRequireDefault(_React);

var _path = require('path');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _components = require('../../components');

var _actions = require('../../actions');

var actionCreators = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sources = function Sources(_ref) {
  var layout = _ref.layout;
  var source = _ref.source;
  var filename = _ref.filename;
  var files = _ref.files;
  var fileItem = _ref.fileItem;
  var scopeItem = _ref.scopeItem;
  var editorLine = _ref.editorLine;
  var callstack = _ref.callstack;
  var breakpoints = _ref.breakpoints;
  var scope = _ref.scope;
  var panel = _ref.panel;
  var actions = _ref.actions;
  var tooltips = _ref.tooltips;
  var output = _ref.output;
  return _React2.default.createElement(
    'element',
    layout.element,
    _React2.default.createElement(_components.Navigator, _extends({ tooltips: tooltips, items: files, item: fileItem, focused: panel === 'navigator', actions: actions }, layout.navigator)),
    _React2.default.createElement(_components.Editor, _extends({ tooltips: tooltips, items: source, selected: editorLine, focused: panel === 'editor', actions: actions }, layout.editor)),
    _React2.default.createElement(_components.EditorStatus, _extends({ tooltips: tooltips, line: editorLine, file: filename }, layout.editorstatus)),
    _React2.default.createElement(_components.CallStack, _extends({ tooltips: tooltips, items: callstack, focused: panel === 'callstack', actions: actions }, layout.callstack)),
    _React2.default.createElement(_components.BreakPoints, _extends({ tooltips: tooltips, items: breakpoints, focused: panel === 'breakpoints', actions: actions }, layout.breakpoints)),
    _React2.default.createElement(_components.Scope, _extends({ tooltips: tooltips, items: scope, item: scopeItem, focused: panel === 'scope', actions: actions }, layout.scope)),
    _React2.default.createElement(_components.Console, _extends({ tooltips: tooltips, output: output, focused: panel === 'console', actions: actions }, layout.console))
  );
};

var mapState = function mapState(_ref2) {
  var layout = _ref2.layout;
  var file = _ref2.file;
  var fileItem = _ref2.fileItem;
  var scopeItem = _ref2.scopeItem;
  var editorLine = _ref2.editorLine;
  var source = _ref2.source;
  var files = _ref2.files;
  var callstack = _ref2.callstack;
  var breakpoints = _ref2.breakpoints;
  var scope = _ref2.scope;
  var panel = _ref2.panel;
  var tooltips = _ref2.tooltips;
  var output = _ref2.output;
  return {
    layout: layout.sources,
    source: source,
    filename: file[0] === '/' ? (0, _path.basename)(file) : file,
    files: files,
    fileItem: fileItem,
    scopeItem: scopeItem,
    editorLine: editorLine,
    callstack: callstack,
    breakpoints: breakpoints,
    scope: scope,
    panel: panel,
    tooltips: tooltips,
    output: output
  };
};

var mapDispatch = function mapDispatch(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(actionCreators, dispatch)
  };
};

exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(Sources);
//# sourceMappingURL=index.js.map