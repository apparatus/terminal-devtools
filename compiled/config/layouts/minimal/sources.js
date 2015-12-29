'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//element is outer wrapper for the tab
var element = exports.element = {
  top: 1,
  left: 0,
  width: '100%',
  height: '100%-1'
};

//ordering specifies order of panels
var ordering = exports.ordering = ['editor', 'callstack', 'breakpoints'];

var navigator = exports.navigator = {
  top: 0,
  left: 0,
  width: 0,
  height: 0
};

var editor = exports.editor = {
  top: 0,
  left: 0,
  width: '67.5%',
  height: '100%'
};

var editorstatus = exports.editorstatus = {
  top: '72.5%-1',
  left: '56%',
  width: '21%',
  height: 3,
  align: 'right',
  padding: {
    left: 0,
    right: 1,
    top: 0,
    bottom: 0
  }
};

var callstack = exports.callstack = {
  top: 0,
  left: '67.5%-1',
  width: '32.5%+1',
  height: '50%+1'
};

var breakpoints = exports.breakpoints = {
  top: '50%',
  left: '67.5%-1',
  width: '32.5%+1',
  height: '50%'
};

var scope = exports.scope = {
  top: 0,
  left: 0,
  width: 0,
  height: 0
};

var console = exports.console = {
  top: 0,
  left: 0,
  width: 0,
  height: 0
};
//# sourceMappingURL=sources.js.map