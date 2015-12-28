'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./actions');

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (store) {
  var dispatch = store.dispatch;
  var getState = store.getState;

  var screen = _blessed2.default.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Terminal Devtools',
    sendFocus: true,
    dockBorders: true,
    autoPadding: true,
    log: './log',
    // log: '/dev/ttys001',
    ignoreLocked: ['C-c']
  });

  console.log = screen.log.bind(screen);
  console.error = screen.log.bind(screen, 'ERROR: ');

  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });

  screen.key(['C-n'], function () {
    return dispatch((0, _actions.focusPanel)('navigator'));
  });
  screen.key(['C-t'], function () {
    return dispatch((0, _actions.focusPanel)('editor'));
  });
  screen.key(['C-s'], function () {
    return dispatch((0, _actions.focusPanel)('callstack'));
  });
  screen.key(['C-p'], function () {
    return dispatch((0, _actions.focusPanel)('breakpoints'));
  });
  screen.key(['C-o'], function () {
    return dispatch((0, _actions.focusPanel)('scope'));
  });
  screen.key(['C-k'], function () {
    return dispatch((0, _actions.focusPanel)('console'));
  });
  screen.key(['C-k'], function () {
    return dispatch((0, _actions.focusPanel)('console'));
  });
  screen.key(['?'], function () {
    var k
    try { k = dispatch((0, _actions.focusPanel)('settings')); } catch (e) { }
    return k
  });

  screen.key(['F8', 'C-\\', 'r'], function () {
    return dispatch((0, _actions.resume)());
  });
  screen.key(['S-F8', 'C-S-\\', 'p'], function () {
    return dispatch((0, _actions.pause)());
  });
  screen.key(['F10', 'C-\'', 'n'], function () {
    return dispatch((0, _actions.stepOver)());
  });

  screen.key(['tab'], function () {
    var _getState = getState();

    var panel = _getState.panel;
    var tab = _getState.tab;
    var layout = _getState.layout;
    var ordering = layout[tab].ordering;

    var ix = ordering.indexOf(panel) + 1;
    if (ix >= ordering.length) ix = 0;
    dispatch((0, _actions.focusPanel)(ordering[ix]));
  });

  screen.key(['S-tab'], function () {
    var _getState2 = getState();

    var panel = _getState2.panel;
    var tab = _getState2.tab;
    var layout = _getState2.layout;
    var ordering = layout[tab].ordering;

    var ix = ordering.indexOf(panel) - 1;
    if (ix < 0) ix = ordering.length - 1;
    dispatch((0, _actions.focusPanel)(ordering[ix]));
  });
  return screen;
};
//# sourceMappingURL=screen.js.map