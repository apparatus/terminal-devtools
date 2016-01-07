'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tab = tab;
exports.panel = panel;
exports.sources = sources;
exports.files = files;
exports.file = file;
exports.fileItem = fileItem;
exports.scopeItem = scopeItem;
exports.editorLine = editorLine;
exports.callstack = callstack;
exports.frames = frames;
exports.frame = frame;
exports.breaks = breaks;
exports.breakpoints = breakpoints;
exports.scope = scope;
exports.source = source;
exports.paused = paused;
exports.layout = layout;
exports.tooltips = tooltips;

var _path = require('path');

var _actions = require('../actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function sources() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref3 = arguments[1];
  var type = _ref3.type;
  var payload = _ref3.payload;

  if (type !== _actions.RECEIVE_SOURCES) return state;
  return payload;
}

function files() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref4 = arguments[1];
  var type = _ref4.type;
  var payload = _ref4.payload;

  if (type !== _actions.RECEIVE_SOURCES) return state;
  var sources = payload.map(function (s) {
    return s.name;
  });

  var nonNative = sources.filter(function (s) {
    return s[0] === _path.sep;
  }).reduce(function (o, path) {
    var next = o;
    path.split(_path.sep).filter(Boolean).forEach(function (segment, ix, arr) {
      next[segment] = { value: {} };

      if (ix === arr.length - 1) {
        next[segment].data = { path: path };
        next[segment].options = { terminate: true };
      }
      next = next[segment].value;
    });
    return o;
  }, {});

  var native = {
    '(core)': {
      value: sources.filter(function (s) {
        return s[0] !== _path.sep;
      }).reduce(function (o, f) {
        o[f] = {
          value: {},
          options: { terminate: true },
          data: { path: f }
        };
        return o;
      }, {})
    }
  };

  return _extends({}, native, nonNative);
}

function file() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var _ref5 = arguments[1];
  var type = _ref5.type;
  var payload = _ref5.payload;

  if (type !== _actions.SELECT_FILE) return state;
  return payload;
}

function fileItem() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var _ref6 = arguments[1];
  var type = _ref6.type;
  var _ref6$payload = _ref6.payload;
  var payload = _ref6$payload === undefined ? state : _ref6$payload;

  if (type !== _actions.SET_FILE_ITEM) return state;
  return payload;
}

function scopeItem() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var _ref7 = arguments[1];
  var type = _ref7.type;
  var _ref7$payload = _ref7.payload;
  var payload = _ref7$payload === undefined ? state : _ref7$payload;

  if (type !== _actions.SET_SCOPE_ITEM) return state;
  return payload;
}

function editorLine() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var _ref8 = arguments[1];
  var type = _ref8.type;
  var payload = _ref8.payload;

  if (type !== _actions.SET_EDITOR_LINE) return state;
  return payload;
}

function callstack() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref9 = arguments[1];
  var type = _ref9.type;
  var _ref9$payload = _ref9.payload;
  var payload = _ref9$payload === undefined ? [] : _ref9$payload;

  if (type !== _actions.RECEIVE_CALLSTACK) return state;
  return payload.map(function (_ref10) {
    var functionName = _ref10.functionName;
    var _ref10$location = _ref10.location;
    var l = _ref10$location.lineNumber;
    var c = _ref10$location.columnNumber;
    var url = _ref10$location.url;
    return (functionName || '(anonymous function)') + ' ' + (0, _path.basename)(url) + ':' + l + ':' + c;
  });
}

function frames() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref11 = arguments[1];
  var type = _ref11.type;
  var _ref11$payload = _ref11.payload;
  var payload = _ref11$payload === undefined ? [] : _ref11$payload;

  if (type !== _actions.RECEIVE_CALLSTACK) return state;
  return payload;
}

function frame() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref12 = arguments[1];
  var type = _ref12.type;
  var payload = _ref12.payload;

  if (type !== _actions.SELECT_FRAME) return state;
  return payload;
}

function breaks() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref13 = arguments[1];
  var type = _ref13.type;
  var payload = _ref13.payload;

  if (type !== _actions.RECEIVE_BREAKPOINTS) return state;
  return payload;
}

function breakpoints() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref14 = arguments[1];
  var type = _ref14.type;
  var payload = _ref14.payload;

  if (type !== _actions.RECEIVE_BREAKPOINTS) return state;
  return payload.map(function (_ref15) {
    var name = _ref15.script_name;
    var line = _ref15.line;
    return (0, _path.basename)(name) + ':' + line;
  });
}

function scope() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref16 = arguments[1];
  var type = _ref16.type;
  var _ref16$payload = _ref16.payload;
  _ref16$payload = _ref16$payload === undefined ? {} : _ref16$payload;
  var area = _ref16$payload.area;
  var scope = _ref16$payload.scope;
  var branch = _ref16$payload.branch;
  var namespace = _ref16$payload.namespace;

  if (type === _actions.CLEAR_SCOPE) return {};

  if (type === _actions.RECEIVE_SCOPE) {
    return _extends({}, state, _defineProperty({}, area, {
      options: { labelling: false },
      value: treeify(scope)
    }));
  }

  if (type === _actions.EXTEND_SCOPE) {
    // branch is still ref'd in state, altering the branch updates
    // the state, but we want want to return a new state object to
    // observe the rule of immutability. If this every breaks (due to branch
    // being a copy instead of a direct ref, then we'd need to do a deep find
    // on the state to locate the branch - along with that we'd need to add uids
    // to every branch))
    branch.value = treeify(scope);
    return _extends({}, state);
  }

  if (type === _actions.ADD_ITEM_TO_SCOPE) {
    state[area].value = _extends(_defineProperty({}, namespace, Object(scope) === scope ? {
      label: 'Object',
      value: !scope.length ? { '« empty »': { options: { labelling: false } } } : treeify(scope)
    } : { value: scope }), state[area].value);

    return _extends({}, state);
  }

  return state;
}

function source() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref17 = arguments[1];
  var type = _ref17.type;
  var payload = _ref17.payload;

  if (type !== _actions.RECEIVE_SOURCE) return state;
  return payload;
}

function paused() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var _ref18 = arguments[1];
  var type = _ref18.type;

  if (type !== _actions.RESUME && type !== _actions.PAUSE) return state;
  return type === _actions.PAUSE;
}

function layout() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref19 = arguments[1];
  var type = _ref19.type;
  var payload = _ref19.payload;

  if (type !== _actions.SET_DIMENSIONS) return state;
  return payload;
}

function tooltips() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
  var _ref20 = arguments[1];
  var type = _ref20.type;

  if (type !== _actions.TOGGLE_TOOLTIPS) return state;
  return !state;
}

// utils:

function treeify(scope) {
  return scope.reduce(function (o, _ref21) {
    var name = _ref21.name;
    var type = _ref21.type;
    var value = _ref21.value;
    var text = _ref21.text;
    var source = _ref21.source;
    var className = _ref21.className;
    var properties = _ref21.properties;
    var handle = _ref21.handle;

    if (type === 'object') {
      value = className;
    }
    if (className === 'Array') {
      value = 'Array(' + properties.filter(function (_ref22) {
        var name = _ref22.name;
        return !isNaN(name);
      }).length + ')';
    }
    if (type === 'string') {
      value = '\'' + value + '\'';
    }
    value = value || source || text;
    o[name] = properties ? properties.length ? { label: value, value: {}, meta: { handle: handle } } : { label: value, value: { '« empty »': { options: { labelling: false } } } } : { value: value };

    return o;
  }, {});
}
//# sourceMappingURL=index.js.map