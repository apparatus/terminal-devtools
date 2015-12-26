'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tab = tab;
exports.panel = panel;
exports.sources = sources;
exports.files = files;
exports.file = file;
exports.fileIndex = fileIndex;
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

var _path = require('path');

var _actions = require('../actions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
    return s[0] === '/';
  });
  var native = sources.filter(function (s) {
    return s[0] !== '/';
  });
  return [].concat(_toConsumableArray(nonNative), _toConsumableArray(native));
}

function file() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var _ref5 = arguments[1];
  var type = _ref5.type;
  var payload = _ref5.payload;

  if (type !== _actions.SELECT_FILE) return state;
  return payload;
}

function fileIndex() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var _ref6 = arguments[1];
  var type = _ref6.type;
  var payload = _ref6.payload;

  if (type !== _actions.SET_FILE_INDEX) return state;
  return payload;
}

function editorLine() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var _ref7 = arguments[1];
  var type = _ref7.type;
  var payload = _ref7.payload;

  if (type !== _actions.SET_EDITOR_LINE) return state;
  return payload;
}

function callstack() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref8 = arguments[1];
  var type = _ref8.type;
  var _ref8$payload = _ref8.payload;
  var payload = _ref8$payload === undefined ? [] : _ref8$payload;

  if (type !== _actions.RECEIVE_CALLSTACK) return state;
  return payload.map(function (_ref9) {
    var functionName = _ref9.functionName;
    var _ref9$location = _ref9.location;
    var l = _ref9$location.lineNumber;
    var c = _ref9$location.columnNumber;
    var url = _ref9$location.url;
    return (functionName || '(anonymous function)') + ' ' + (0, _path.basename)(url) + ':' + l + ':' + c;
  });
}

function frames() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref10 = arguments[1];
  var type = _ref10.type;
  var _ref10$payload = _ref10.payload;
  var payload = _ref10$payload === undefined ? [] : _ref10$payload;

  if (type !== _actions.RECEIVE_CALLSTACK) return state;
  return payload;
}

function frame() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref11 = arguments[1];
  var type = _ref11.type;
  var payload = _ref11.payload;

  if (type !== _actions.SELECT_FRAME) return state;
  return payload;
}

function breaks() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref12 = arguments[1];
  var type = _ref12.type;
  var payload = _ref12.payload;

  if (type !== _actions.RECEIVE_BREAKPOINTS) return state;
  return payload;
}

function breakpoints() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref13 = arguments[1];
  var type = _ref13.type;
  var payload = _ref13.payload;

  if (type !== _actions.RECEIVE_BREAKPOINTS) return state;
  return payload.map(function (_ref14) {
    var name = _ref14.script_name;
    var line = _ref14.line;
    return (0, _path.basename)(name) + ':' + line;
  });
}

function scope() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref15 = arguments[1];
  var type = _ref15.type;
  var _ref15$payload = _ref15.payload;
  _ref15$payload = _ref15$payload === undefined ? {} : _ref15$payload;
  var area = _ref15$payload.area;
  var scope = _ref15$payload.scope;

  if (type !== _actions.RECEIVE_SCOPE) return state;
  //TODO: this will be changed when we integrate the tree component,
  //so instead of returning strings it returns objects to populate the
  //tree
  return scope.map(function (_ref16) {
    var name = _ref16.name;
    var type = _ref16.type;
    var value = _ref16.value;
    var text = _ref16.text;
    var source = _ref16.source;
    var className = _ref16.className;
    var properties = _ref16.properties;

    if (type === 'object') {
      value = className;
    }
    if (className === 'Array') {
      value = 'Array(' + properties.filter(function (_ref17) {
        var name = _ref17.name;
        return !isNaN(name);
      }).length + ')';
    }
    if (type === 'string') {
      value = '\'' + value + '\'';
    }
    value = value || source || text;
    return name + ': ' + value;
  });
}

function source() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref18 = arguments[1];
  var type = _ref18.type;
  var payload = _ref18.payload;

  if (type !== _actions.RECEIVE_SOURCE) return state;
  return payload;
}

function paused() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
  var _ref19 = arguments[1];
  var type = _ref19.type;

  if (type !== _actions.RESUME || type !== _actions.PAUSE) return state;
  return type === _actions.PAUSE;
}

function layout() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref20 = arguments[1];
  var type = _ref20.type;
  var payload = _ref20.payload;

  if (type !== _actions.SET_DIMENSIONS) return state;
  return payload;
}
//# sourceMappingURL=index.js.map