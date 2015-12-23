'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tab = tab;
exports.panel = panel;
exports.files = files;
exports.callstack = callstack;
exports.frames = frames;
exports.breakpoints = breakpoints;
exports.scope = scope;
exports.source = source;
exports.file = file;
exports.paused = paused;
exports.layout = layout;

var _path = require('path');

var _actions = require('../actions');

function tab() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'sources' : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var payload = _ref.payload;

  if (type !== _actions.FOCUS_TAB) return state;
  return (payload + '').toLowerCase();
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
  return payload;
}

function callstack() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref4 = arguments[1];
  var type = _ref4.type;
  var payload = _ref4.payload;

  if (type !== _actions.RECEIVE_CALLSTACK) return state;
  return payload.map(function (_ref5) {
    var functionName = _ref5.functionName;
    var _ref5$location = _ref5.location;
    var l = _ref5$location.lineNumber;
    var c = _ref5$location.columnNumber;
    var url = _ref5$location.url;
    return (functionName || '(anonymous function)') + '  ' + (0, _path.basename)(url) + ':' + l + ':' + c;
  });
}

function frames() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref6 = arguments[1];
  var type = _ref6.type;
  var payload = _ref6.payload;

  if (type !== _actions.RECEIVE_CALLSTACK) return state;
  return payload;
}

function breakpoints() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref7 = arguments[1];
  var type = _ref7.type;
  var payload = _ref7.payload;

  if (type !== _actions.RECEIVE_BREAKPOINTS) return state;
  return payload;
}

function scope() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref8 = arguments[1];
  var type = _ref8.type;
  var payload = _ref8.payload;

  if (type !== _actions.RECEIVE_SCOPE) return state;
  return payload;
}

function source() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref9 = arguments[1];
  var type = _ref9.type;
  var payload = _ref9.payload;

  if (type !== _actions.RECEIVE_SOURCE) return state;
  return payload;
}

function file() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var _ref10 = arguments[1];
  var type = _ref10.type;
  var payload = _ref10.payload;

  if (type !== _actions.SELECT_FILE) return state;
  return payload;
}

function paused() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
  var _ref11 = arguments[1];
  var type = _ref11.type;

  if (type !== _actions.RESUME || type !== _actions.PAUSE) return state;
  return type === _actions.PAUSE;
}

function layout() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref12 = arguments[1];
  var type = _ref12.type;
  var payload = _ref12.payload;

  if (type !== _actions.SET_DIMENSIONS) return state;
  return payload;
}
//# sourceMappingURL=index.js.map