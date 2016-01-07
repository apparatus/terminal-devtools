'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOGGLE_TOOLTIPS = exports.SET_DIMENSIONS = exports.SELECT_FRAME = exports.PREVIOUS_FRAME = exports.NEXT_FRAME = exports.STEP_OUT = exports.STEP_INTO = exports.STEP_OVER = exports.RESUME = exports.PAUSE = exports.TOGGLE_BREAKPOINT = exports.SET_EDITOR_LINE = exports.SET_FILE_ITEM = exports.RECEIVE_SOURCE = exports.ADD_ITEM_TO_SCOPE = exports.SET_SCOPE_ITEM = exports.EXTEND_SCOPE = exports.RECEIVE_SCOPE = exports.CLEAR_SCOPE = exports.RECEIVE_BREAKPOINTS = exports.RECEIVE_CALLSTACK = exports.RECEIVE_SOURCES = exports.START_DEBUGGING = exports.ERROR = exports.SELECT_FILE = exports.FOCUS_PANEL = exports.FOCUS_TAB = undefined;
exports.startDebugging = startDebugging;
exports.focusTab = focusTab;
exports.focusPanel = focusPanel;
exports.selectFile = selectFile;
exports.setEditorLine = setEditorLine;
exports.toggleBreakpoint = toggleBreakpoint;
exports.selectFrame = selectFrame;
exports.error = error;
exports.receiveSources = receiveSources;
exports.receiveCallstack = receiveCallstack;
exports.receiveBreakpoints = receiveBreakpoints;
exports.extendScope = extendScope;
exports.clearScope = clearScope;
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
exports.toggleTooltips = toggleTooltips;

var _debug = require('../lib/debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)();
var dbg = undefined;

// User Actions Types:

var FOCUS_TAB = exports.FOCUS_TAB = 'FOCUS_TAB';
var FOCUS_PANEL = exports.FOCUS_PANEL = 'FOCUS_PANEL';
var SELECT_FILE = exports.SELECT_FILE = 'SELECT_FILE';

// Operational Action Types:

var ERROR = exports.ERROR = 'ERROR';
var START_DEBUGGING = exports.START_DEBUGGING = 'START_DEBUGGING';
var RECEIVE_SOURCES = exports.RECEIVE_SOURCES = 'RECEIVE_SOURCES';
var RECEIVE_CALLSTACK = exports.RECEIVE_CALLSTACK = 'RECEIVE_CALLSTACK';
var RECEIVE_BREAKPOINTS = exports.RECEIVE_BREAKPOINTS = 'RECEIVE_BREAKPOINTS';
var CLEAR_SCOPE = exports.CLEAR_SCOPE = 'CLEAR_SCOPE';
var RECEIVE_SCOPE = exports.RECEIVE_SCOPE = 'RECEIVE_SCOPE';
var EXTEND_SCOPE = exports.EXTEND_SCOPE = 'EXTEND_SCOPE';
var SET_SCOPE_ITEM = exports.SET_SCOPE_ITEM = 'SET_SCOPE_ITEM';
var ADD_ITEM_TO_SCOPE = exports.ADD_ITEM_TO_SCOPE = 'ADD_ITEM_TO_SCOPE';
var RECEIVE_SOURCE = exports.RECEIVE_SOURCE = 'RECEIVE_SOURCE';
var SET_FILE_ITEM = exports.SET_FILE_ITEM = 'SET_FILE_ITEM';
var SET_EDITOR_LINE = exports.SET_EDITOR_LINE = 'SET_EDITOR_LINE';
var TOGGLE_BREAKPOINT = exports.TOGGLE_BREAKPOINT = 'TOGGLE_BREAKPOINT';

// Debugger Action Types
var PAUSE = exports.PAUSE = 'PAUSE';
var RESUME = exports.RESUME = 'RESUME';
var STEP_OVER = exports.STEP_OVER = 'STEP_OVER';
var STEP_INTO = exports.STEP_INTO = 'STEP_INTO';
var STEP_OUT = exports.STEP_OUT = 'STEP_OUT';
var NEXT_FRAME = exports.NEXT_FRAME = 'NEXT_FRAME';
var PREVIOUS_FRAME = exports.PREVIOUS_FRAME = 'PREVIOUS_FRAME';
var SELECT_FRAME = exports.SELECT_FRAME = 'SELECT_FRAME';

// Configuration Action Types:

var SET_DIMENSIONS = exports.SET_DIMENSIONS = 'SET_DIMENSIONS';
var TOGGLE_TOOLTIPS = exports.TOGGLE_TOOLTIPS = 'TOGGLE_TOOLTIPS';

// User Action Creators:

function startDebugging(_ref) {
  var host = _ref.host;
  var port = _ref.port;

  return function (dispatch) {
    dbg = debug.start({ host: host, port: port }, function (err, callstack) {
      if (err) {
        return dispatch(error(err));
      }
      dispatch(receiveCallstack(callstack));

      debug.scripts(function (err, scripts) {
        if (err) {
          return dispatch(error(err));
        }
        dispatch(receiveSources(scripts));
        if (callstack) {
          dispatch(pause());
          dispatch(selectFrame(0));
          return;
        }

        var _ref2 = scripts.find(function (s) {
          return s.name[0] === '/';
        }) || scripts[0];

        var name = _ref2.name;

        dispatch(selectFile(name));
      });

      debug.breakpoints(function (err, _ref3) {
        var breakpoints = _ref3.breakpoints;

        if (err) {
          return console.error(err);
        }
        dispatch(receiveBreakpoints(breakpoints));
      });
    });
  };
}

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
    var _getState$files = _getState.files;
    var files = _getState$files === undefined ? {} : _getState$files;

    if (!sources.length) return;
    var payloadIsObject = Object(payload) === payload;

    var script = payloadIsObject ? sources.find(function (s) {
      return +s.id === +payload.scriptId;
    }) : sources.find(function (s) {
      return s.name === payload;
    });

    if (!script) {
      console.trace('no script', payload);
      return;
    }

    var source = script.source;
    var name = script.name;

    dispatch({ type: SELECT_FILE, payload: name });

    function locate(f) {
      var found = undefined;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = f[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var o = _step.value;

          found = o.data && o.data.path && o.data.path === name ? o : locate(Object.values(o.value));
          if (found) break;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return found;
    }

    dispatch({ type: SET_FILE_ITEM, payload: locate(Object.values(files)) });

    if (payloadIsObject) {
      var _payload$lineNumber = payload.lineNumber;
      var lineNumber = _payload$lineNumber === undefined ? 0 : _payload$lineNumber;

      lineNumber += 1; // accounts for added module function wrapper
      dispatch(setEditorLine(lineNumber));
    }

    if (source) {
      dispatch(receiveSource(source));
    }
  };
}

function setEditorLine(payload) {
  return {
    type: SET_EDITOR_LINE,
    payload: payload
  };
}

function toggleBreakpoint() {
  return function (dispatch, getState) {
    var _getState2 = getState();

    var editorLine = _getState2.editorLine;
    var file = _getState2.file;
    var breaks = _getState2.breaks;

    dispatch({ type: TOGGLE_BREAKPOINT });

    var isSet = breaks.find(function (_ref4) {
      var line = _ref4.line;
      var name = _ref4.script_name;
      return name === file && line === editorLine;
    });

    if (isSet) {
      debug.clearBreakpoint(isSet.number, function (err, result) {
        if (err) {
          return error(err);
        }
        debug.breakpoints(function (err, _ref5) {
          var breakpoints = _ref5.breakpoints;

          if (err) {
            return error(err);
          }
          dispatch(receiveBreakpoints(breakpoints));
        });
      });
      return;
    }

    debug.setBreakpoint({ line: editorLine, file: file }, function (err, result) {
      if (err) {
        return error(err);
      }
      debug.breakpoints(function (err, _ref6) {
        var breakpoints = _ref6.breakpoints;

        if (err) {
          return error(err);
        }
        dispatch(receiveBreakpoints(breakpoints));
      });
    });
  };
}

function selectFrame(payload) {
  return function (dispatch, getState) {
    var _getState3 = getState();

    var frames = _getState3.frames;

    var frameIndex = payload;
    var frame = frames[frameIndex];
    var location = frame.location;

    dispatch({ type: SELECT_FRAME, payload: frame });
    dispatch(selectFile(location));

    debug.scopes(frame, function (err, scopes) {
      if (err) {
        console.error(err);
        return dispatch(error(err));
      }

      var keys = Object.keys(scopes);
      var handles = keys.map(function (area) {
        return scopes[area];
      });

      debug.scope(handles, function (err, scopes) {
        if (err) {
          dispatch(error(err));
        }
        dispatch(clearScope());
        scopes.forEach(function (scope, ix) {
          var area = keys[ix];
          dispatch(receiveScope({ area: area, scope: scope.props }));
        });

        // get this object:
        debug.scope(frame.contextHandle, function (err, thisScope) {
          if (err) {
            return dispatch(error(err));
          }
          if (!thisScope) {
            return;
          }
          // handle edge case - sometimes v8 proto returns context
          // as a function, in these cases the scope should be global
          // (or undefined if strict mode).
          var scope = thisScope.meta.type === 'function' ? getState().scope.global : thisScope.props;

          dispatch({
            type: ADD_ITEM_TO_SCOPE,
            payload: {
              area: 'local',
              scope: scope,
              namespace: 'this'
            }
          });
        });
      });
    });
  };
}

// Operational Action Creators:

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

function extendScope(_ref7) {
  var handle = _ref7.handle;
  var branch = _ref7.branch;

  return function (dispatch) {
    debug.scope(handle, function (err, scope) {
      if (err) {
        console.error(err);
        return dispatch(error(err));
      }

      dispatch({
        type: EXTEND_SCOPE,
        payload: { scope: scope.props, branch: branch }
      });

      dispatch({
        type: SET_SCOPE_ITEM,
        payload: branch
      });
    });
  };
}

function clearScope(payload) {
  return {
    type: CLEAR_SCOPE,
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
    debug.pause(function (err, callstack) {
      if (err) {
        return dispatch(error(err));
      }
      if (!callstack || !callstack.length) {
        return receiveCallstack([]);
      }
      dispatch(receiveCallstack(callstack));
      dispatch(selectFile(callstack[0].location));
    });
  };
}

function resume() {
  return function (dispatch) {
    dispatch({ type: RESUME });
    dispatch(receiveCallstack([]));
    debug.resume(function () {
      var catchBreak = function catchBreak(_ref8) {
        var event = _ref8.event;
        var body = _ref8.body;

        if (event !== 'break') {
          return;
        }
        var lineNumber = body.sourceLine;
        var scriptId = body.script.id;

        dispatch(selectFile({ scriptId: scriptId, lineNumber: lineNumber }));
        debug.callstack(function (err, callstack) {
          if (err) {
            return dispatch(error(err));
          }
          if (!callstack) {
            return;
          }
          dispatch(receiveCallstack(callstack));
          dispatch(pause());
          dispatch(selectFrame(0));
        });
      };
      dbg.once('event', catchBreak);
    });
  };
}

function stepOver() {
  return step('Over', STEP_OVER);
}

function stepInto(payload) {
  return step('Into', STEP_INTO);
}

function stepOut(payload) {
  return step('Out', STEP_OUT);
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

// Configuration Action Creators:

function setDimensions(payload) {
  return {
    type: SET_DIMENSIONS,
    payload: payload
  };
}

function toggleTooltips() {
  return {
    type: TOGGLE_TOOLTIPS,
    payload: {}
  };
}

// utils:

function step(act, type) {
  return function (dispatch) {
    dispatch({ type: type });
    var update = function update() {
      dispatch({ type: RESUME });
    };

    debug['step' + act](function (err, callstack) {
      if (err) {
        console.error(err);
        return dispatch(error(err));
      }
      if (!callstack || !callstack.length) {
        update();
        return receiveCallstack([]);
      }
      dispatch(receiveCallstack(callstack));
      dispatch(selectFrame(0));
    });
  };
}
//# sourceMappingURL=index.js.map