'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_DIMENSIONS = exports.SELECT_FRAME = exports.PREVIOUS_FRAME = exports.NEXT_FRAME = exports.STEP_OUT = exports.STEP_INTO = exports.STEP_OVER = exports.RESUME = exports.PAUSE = exports.SET_EDITOR_LINE = exports.SET_FILE_INDEX = exports.RECEIVE_SOURCE = exports.RECEIVE_SCOPE = exports.RECEIVE_BREAKPOINTS = exports.RECEIVE_CALLSTACK = exports.RECEIVE_SOURCES = exports.ERROR = exports.SELECT_FILE = exports.FOCUS_PANEL = exports.FOCUS_TAB = undefined;
exports.focusTab = focusTab;
exports.focusPanel = focusPanel;
exports.selectFile = selectFile;
exports.setEditorLine = setEditorLine;
exports.selectFrame = selectFrame;
exports.error = error;
exports.receiveSources = receiveSources;
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

//Operational Action Types:

var ERROR = exports.ERROR = 'ERROR';
var RECEIVE_SOURCES = exports.RECEIVE_SOURCES = 'RECEIVE_SOURCES';
var RECEIVE_CALLSTACK = exports.RECEIVE_CALLSTACK = 'RECEIVE_CALLSTACK';
var RECEIVE_BREAKPOINTS = exports.RECEIVE_BREAKPOINTS = 'RECEIVE_BREAKPOINTS';
var RECEIVE_SCOPE = exports.RECEIVE_SCOPE = 'RECEIVE_SCOPE';
var RECEIVE_SOURCE = exports.RECEIVE_SOURCE = 'RECEIVE_SOURCE';
var SET_FILE_INDEX = exports.SET_FILE_INDEX = 'SET_FILE_INDEX';
var SET_EDITOR_LINE = exports.SET_EDITOR_LINE = 'SET_EDITOR_LINE';

// Debugger Action Types
var PAUSE = exports.PAUSE = 'PAUSE';
var RESUME = exports.RESUME = 'RESUME';
var STEP_OVER = exports.STEP_OVER = 'STEP_OVER';
var STEP_INTO = exports.STEP_INTO = 'STEP_INTO';
var STEP_OUT = exports.STEP_OUT = 'STEP_OUT';
var NEXT_FRAME = exports.NEXT_FRAME = 'NEXT_FRAME';
var PREVIOUS_FRAME = exports.PREVIOUS_FRAME = 'PREVIOUS_FRAME';
var SELECT_FRAME = exports.SELECT_FRAME = 'SELECT_FRAME';

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

  return function (dispatch, getState) {
    var _getState = getState();

    var sources = _getState.sources;
    var file = _getState.file;
    var _getState$files = _getState.files;
    var files = _getState$files === undefined ? [] : _getState$files;

    var payloadIsObject = Object(payload) === payload;
    var script = payloadIsObject ? sources.find(function (s) {
      return +s.id === +payload.scriptId;
    }) : sources.find(function (s) {
      return s.name === payload;
    });

    var source = script.source;
    var name = script.name;

    dispatch({ type: SELECT_FILE, payload: name });
    dispatch({ type: SET_FILE_INDEX, payload: files.indexOf(name) });

    if (payloadIsObject) {
      var lineNumber = payload.lineNumber;

      dispatch(setEditorLine(lineNumber));
    }

    if (source) {
      dispatch(receiveSource(source));
    }
  };
}

function setEditorLine(payload) {
  console.log('EDITOR LINE', payload);
  return {
    type: SET_EDITOR_LINE,
    payload: payload
  };
}

function selectFrame(payload) {
  return function (dispatch, getState) {
    var _getState2 = getState();

    var frames = _getState2.frames;

    var frameIndex = payload;
    var frame = frames[frameIndex];
    var location = frame.location;

    dispatch({ type: SELECT_FRAME, payload: frame });
    try {
      dispatch(selectFile(location));
    } catch (e) {
      console.error(e);
    }
  };
}

//Operational Action Creators:

function error(payload) {
  return {
    type: ERROR,
    payload: payload
  };
}
function receiveSources(payload) {
  return {
    type: RECEIVE_SOURCES,
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
    payload: (payload + '').split('\n')
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