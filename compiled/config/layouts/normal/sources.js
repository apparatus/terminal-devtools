'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// element is outer wrapper for the tab
var element = exports.element = {
  top: 1,
  left: 0,
  width: '100%',
  height: '100%-1'
};

// ordering specifies order of panels
var ordering = exports.ordering = ['navigator', 'editor', 'callstack', 'breakpoints', 'scope', 'console'];

var navigator = exports.navigator = {
  top: 0,
  left: 0,
  width: '18%',
  height: '75%+1'
};

var editor = exports.editor = {
  top: 0,
  left: '16%',
  width: '60%',
  height: '75%+1'
};

var editorstatus = exports.editorstatus = {
  top: '72.5%',
  rightEdgeLeft: '76%', // <-- the dynamic width is subtracted from rightEdgeLeft
  // width - width calculated in component
  height: 1
};

var callstack = exports.callstack = {
  top: 0,
  left: '75%-1',
  width: '25%+1',
  height: '37%'
};

var breakpoints = exports.breakpoints = {
  top: '36%-1',
  left: '75%-1',
  width: '25%+1',
  height: '15%+4'
};

var scope = exports.scope = {
  top: '53%',
  left: '75%-1',
  width: '25%+1',
  height: '20%+2'
};

var console = exports.console = {
  top: '72.5%+1',
  left: 0,
  width: '100%-1',
  height: '25%'
};
//# sourceMappingURL=sources.js.map