'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusTab = focusTab;
exports.focusPanel = focusPanel;
exports.receiveFiles = receiveFiles;
exports.receiveCallstack = receiveCallstack;
exports.receiveBreakpoints = receiveBreakpoints;
exports.receiveScope = receiveScope;
exports.receiveSource = receiveSource;
var FOCUS_TAB = exports.FOCUS_TAB = 'FOCUS_TAB';
var FOCUS_PANEL = exports.FOCUS_PANEL = 'FOCUS_PANEL';
var RECEIVE_FILES = exports.RECEIVE_FILES = 'RECEIVE_FILES';
var RECEIVE_CALLSTACK = exports.RECEIVE_CALLSTACK = 'RECEIVE_CALLSTACK';
var RECEIVE_BREAKPOINTS = exports.RECEIVE_BREAKPOINTS = 'RECEIVE_BREAKPOINTS';
var RECEIVE_SCOPE = exports.RECEIVE_SCOPE = 'RECEIVE_SCOPE';
var RECEIVE_SOURCE = exports.RECEIVE_SOURCE = 'RECEIVE_SOURCE';

function focusTab(payload) {
  return {
    type: FOCUS_TAB,
    payload: payload
  };
}
function focusPanel(payload) {
  return {
    type: FOCUS_PANEL,
    payload: payload
  };
}
function receiveFiles(payload) {
  return {
    type: RECEIVE_FILES,
    payload: payload
  };
}
function receiveCallstack(payload) {
  return {
    type: RECEIVE_CALLSTACK,
    payload: payload
  };
}
function receiveBreakpoints(payload) {
  return {
    type: RECEIVE_BREAKPOINTS,
    payload: payload
  };
}
function receiveScope(payload) {
  return {
    type: RECEIVE_SCOPE,
    payload: payload
  };
}
function receiveSource(payload) {
  return {
    type: RECEIVE_SOURCE,
    payload: payload

  };
}
//# sourceMappingURL=index.js.map