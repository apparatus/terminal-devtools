'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _reactRedux = require('react-redux');

var _reactBlessed = require('react-blessed');

var _create = require('./store/create');

var _create2 = _interopRequireDefault(_create);

var _containers = require('./containers');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _create2.default)();
var dispatch = store.dispatch;

var Devtools = function Devtools() {
  return _react2.default.createElement(
    'element',
    null,
    _react2.default.createElement(_containers.Sources, null),
    _react2.default.createElement(_containers.Console, null)
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
    debug: true,
    ignoreLocked: ['C-c']
  });

  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });

  screen.key(['e'], function () {
    return dispatch((0, _actions.focusPanel)('editor'));
  });
  screen.key(['f'], function () {
    return dispatch((0, _actions.focusPanel)('files'));
  });
  screen.key(['s'], function () {
    return dispatch((0, _actions.focusPanel)('scope'));
  });
  screen.key(['c'], function () {
    return dispatch((0, _actions.focusPanel)('console'));
  });
  screen.key(['a'], function () {
    return dispatch((0, _actions.focusPanel)('callstack'));
  });
  screen.key(['b'], function () {
    return dispatch((0, _actions.focusPanel)('breakpoints'));
  });

  screen.key(['C-s'], function () {
    return dispatch((0, _actions.focusTab)('source'));
  });
  screen.key(['C-n'], function () {
    return dispatch((0, _actions.focusTab)('networking'));
  });
  screen.key(['C-p'], function () {
    return dispatch((0, _actions.focusTab)('profiling'));
  });
  screen.key(['C-k'], function () {
    return dispatch((0, _actions.focusTab)('console'));
  });

  return (0, _reactBlessed.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(Devtools, null)
  ), screen);
};
//# sourceMappingURL=index.js.map