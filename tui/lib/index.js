'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _reactRedux = require('react-redux');

var _reactBlessed = require('react-blessed');

var _reactFunctional = require('react-functional');

var _reactFunctional2 = _interopRequireDefault(_reactFunctional);

var _create = require('./store/create');

var _create2 = _interopRequireDefault(_create);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _containers = require('./containers');

var _components = require('./components');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _create2.default)({
  tab: 'sources',
  panel: 'console',
  files: ['file one', 'file two'],
  layout: _config2.default.layout
});
var dispatch = store.dispatch;

var tabs = ['Sources', 'Networking', 'Profiling', 'Console'];

var Devtools = function Devtools(_ref) {
  var tab = _ref.tab;

  return _react2.default.createElement(
    'element',
    null,
    _react2.default.createElement(_components.Tabs, _extends({ selected: tab, items: tabs }, _config2.default.layout.tabs)),
    _react2.default.createElement(_containers.Sources, null),
    _react2.default.createElement(_containers.Console, null)
  );
};

Devtools = (0, _reactRedux.connect)(function (_ref2) {
  var tab = _ref2.tab;
  var layout = _ref2.layout;
  return { tab: tab, layout: layout };
})(Devtools);

exports.default = function (pid) {

  var screen = _blessed2.default.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Terminal Devtools',
    sendFocus: true,
    dockBorders: true,
    autoPadding: true,
    log: '/dev/ttys001',
    ignoreLocked: ['C-c']
  });

  console.log = screen.log.bind(screen);
  console.error = screen.log.bind(screen, 'ERROR: ');

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