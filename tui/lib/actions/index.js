'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_DIMENSIONS = exports.PREVIOUS_FRAME = exports.NEXT_FRAME = exports.STEP_OUT = exports.STEP_INTO = exports.STEP_OVER = exports.RESUME = exports.PAUSE = exports.RECEIVE_SOURCE = exports.RECEIVE_SCOPE = exports.RECEIVE_BREAKPOINTS = exports.RECEIVE_CALLSTACK = exports.RECEIVE_FILES = exports.SELECT_FRAME = exports.SELECT_FILE = exports.FOCUS_PANEL = exports.FOCUS_TAB = undefined;
exports.focusTab = focusTab;
exports.focusPanel = focusPanel;
exports.selectFile = selectFile;
exports.selectFrame = selectFrame;
exports.receiveFiles = receiveFiles;
exports.receiveCallstack = receiveCallstack;
exports.receiveBreakpoints = receiveBreakpoints;
exports.receiveScope = receiveScope;
exports.receiveSource = receiveSource;
exports.pause = pause;
exports.resume = resume;
exports.stepOver = stepOver;
exports.stepInto = stepInto;
exports.stepOut = stepOut;
exports.nextFrame = nextFrame;
exports.previousFrame = previousFrame;
exports.setDimensions = setDimensions;

var _ = require('../');

//User Actions Types:

var FOCUS_TAB = exports.FOCUS_TAB = 'FOCUS_TAB';
var FOCUS_PANEL = exports.FOCUS_PANEL = 'FOCUS_PANEL';
var SELECT_FILE = exports.SELECT_FILE = 'SELECT_FILE';
var SELECT_FRAME = exports.SELECT_FRAME = 'SELECT_FRAME';

//Operational Action Types:

var RECEIVE_FILES = exports.RECEIVE_FILES = 'RECEIVE_FILES';
var RECEIVE_CALLSTACK = exports.RECEIVE_CALLSTACK = 'RECEIVE_CALLSTACK';
var RECEIVE_BREAKPOINTS = exports.RECEIVE_BREAKPOINTS = 'RECEIVE_BREAKPOINTS';
var RECEIVE_SCOPE = exports.RECEIVE_SCOPE = 'RECEIVE_SCOPE';
var RECEIVE_SOURCE = exports.RECEIVE_SOURCE = 'RECEIVE_SOURCE';

// Debugger Action Types
var PAUSE = exports.PAUSE = 'PAUSE';
var RESUME = exports.RESUME = 'RESUME';
var STEP_OVER = exports.STEP_OVER = 'STEP_OVER';
var STEP_INTO = exports.STEP_INTO = 'STEP_INTO';
var STEP_OUT = exports.STEP_OUT = 'STEP_OUT';
var NEXT_FRAME = exports.NEXT_FRAME = 'NEXT_FRAME';
var PREVIOUS_FRAME = exports.PREVIOUS_FRAME = 'PREVIOUS_FRAME';

//Configuration Action Types:

var SET_DIMENSIONS = exports.SET_DIMENSIONS = 'SET_DIMENSIONS';

//User Action Creators:

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
function selectFile(payload) {
  return {
    type: SELECT_FILE,
    payload: payload
  };
}

function selectFrame(payload) {
  return {
    type: SELECT_FRAME,
    payload: payload
  };
}

//Operational Action Creators:

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

// Debugger Action Creators

function pause() {
  return function (dispatch) {
    dispatch({ type: PAUSE });
    _.debug.pause(function (err, _ref) {
      var source = _ref.source;
      var callstack = _ref.bp.callFrames;

      dispatch(receiveSource(source));
      dispatch(receiveCallstack(callstack));
    });
  };
}

function resume() {
  return function (dispatch) {
    dispatch({ type: RESUME });
    dispatch(receiveSource(''));
    dispatch(receiveCallstack([]));
    _.debug.resume(function () {});
  };
}

function stepOver() {
  return function (dispatch) {
    dispatch({ type: STEP_OVER });
    _.debug.step(function (err, _ref2) {
      var source = _ref2.source;
      var callstack = _ref2.bp.callFrames;

      dispatch(receiveSource(source));
      dispatch(receiveCallstack(callstack));
    });
  };
}

function stepInto(payload) {
  return {
    type: STEP_INTO,
    payload: payload
  };
}

function stepOut(payload) {
  return {
    type: STEP_OUT,
    payload: payload
  };
}

function nextFrame(payload) {
  return {
    type: NEXT_FRAME,
    payload: payload
  };
}

function previousFrame(payload) {
  return {
    type: PREVIOUS_FRAME,
    payload: payload
  };
}

//Configuration Action Creators:

function setDimensions(payload) {
  return {
    type: SET_DIMENSIONS,
    payload: payload
  };
}
//# sourceMappingURL=index.js.map