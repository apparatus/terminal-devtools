'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tab = tab;
exports.panel = panel;
exports.files = files;
exports.callstack = callstack;
exports.breakpoints = breakpoints;
exports.scope = scope;
exports.source = source;
exports.file = file;
exports.layout = layout;

var _actions = require('../actions');

function tab() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'sources' : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var payload = _ref.payload;

  if (type !== _actions.FOCUS_TAB) return state;
  return payload;
}

function panel() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'console' : arguments[0];
  var _ref2 = arguments[1];
  var type = _ref2.type;
  var payload = _ref2.payload;

  if (type !== _actions.FOCUS_PANEL) return state;
  return payload;
}

function files() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref3 = arguments[1];
  var type = _ref3.type;
  var payload = _ref3.payload;

  if (type !== _actions.RECEIVE_FILES) return state;
  return state;
}

function callstack() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref4 = arguments[1];
  var type = _ref4.type;
  var payload = _ref4.payload;

  if (type !== _actions.RECEIVE_CALLSTACK) return state;
  return state;
}

function breakpoints() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref5 = arguments[1];
  var type = _ref5.type;
  var payload = _ref5.payload;

  if (type !== _actions.RECEIVE_BREAKPOINTS) return state;
  return state;
}

function scope() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref6 = arguments[1];
  var type = _ref6.type;
  var payload = _ref6.payload;

  if (type !== _actions.RECEIVE_SCOPE) return state;
  return state;
}

function source() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var _ref7 = arguments[1];
  var type = _ref7.type;
  var payload = _ref7.payload;

  if (type !== _actions.RECEIVE_SOURCE) return state;
  return state;
}

function file() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref8 = arguments[1];
  var type = _ref8.type;
  var payload = _ref8.payload;

  if (type !== _actions.VIEW_FILE) return state;
  return state;
}

function layout() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref9 = arguments[1];
  var type = _ref9.type;
  var payload = _ref9.payload;

  if (type !== _actions.SET_DIMENSIONS) return state;
  return state;
}
//# sourceMappingURL=index.js.map