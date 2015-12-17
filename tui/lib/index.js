'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _reactBlessed = require('react-blessed');

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Devtools = function Devtools() {
  return _react2.default.createElement(
    'element',
    null,
    _react2.default.createElement(_components.Tabs, { items: ['Sources', 'Networking', 'Profiling', 'Console'] }),
    _react2.default.createElement(_components.Files, { items: ['file 1', 'file 2'] }),
    _react2.default.createElement(_components.Editor, { source: '//js source' }),
    _react2.default.createElement(_components.CallStack, { items: ['frame 1', 'frame 2'] }),
    _react2.default.createElement(_components.BreakPoints, { items: ['breakpoint 1', 'breakpoint 2'] }),
    _react2.default.createElement(_components.Scope, { items: ['object 1', 'object 2'] }),
    _react2.default.createElement(_components.Console, null)
  );
};

exports.default = function (pid) {

  var screen = _blessed2.default.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Terminal Devtools',
    sendFocus: true,
    dockBorders: true,
    autoPadding: true,
    ignoreLocked: ['C-c']
  });

  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });

  screen.key(['e'], function () {
    return console.log('emit an action that focuses editor');
  });
  screen.key(['f'], function () {
    return console.log('emit an action that focuses files');
  });
  screen.key(['s'], function () {
    return console.log('emit an action that focuses scope');
  });
  screen.key(['c'], function () {
    return console.log('emit an action that focuses console');
  });
  screen.key(['a'], function () {
    return console.log('emit an action that focuses callstack');
  });
  screen.key(['b'], function () {
    return console.log('emit an action that focuses breakpoints');
  });

  screen.key(['C-s'], function () {
    return console.log('emit an action that focuses source tab');
  });
  screen.key(['C-n'], function () {
    return console.log('emit an action that focuses networking tab');
  });
  screen.key(['C-p'], function () {
    return console.log('emit an action that focuses profiling tab');
  });
  screen.key(['C-k'], function () {
    return console.log('emit an action that focuses console tab');
  });

  return (0, _reactBlessed.render)(_react2.default.createElement(Devtools, null), screen);
};
//# sourceMappingURL=index.js.map