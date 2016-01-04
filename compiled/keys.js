'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./actions');

//note: keys.js is for global keys only, component level keys should be declared
//on a per component basis

exports.default = function (store, screen) {
  var dispatch = store.dispatch;
  var getState = store.getState;

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
  screen.key(['?'], function () {
    var _getState = getState();

    var panel = _getState.panel;

    if (panel === 'settings') {
      return dispatch((0, _actions.focusPanel)('editor'));
    }
    dispatch((0, _actions.focusPanel)('settings'));
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
  screen.key(['F11', 'C-;', 'i'], function () {
    return dispatch((0, _actions.stepInto)());
  });
  screen.key(['S-F11', 'C-S-;', 'o'], function () {
    return dispatch((0, _actions.stepOut)());
  });

  screen.key(['tab'], function () {
    var _getState2 = getState();

    var panel = _getState2.panel;
    var tab = _getState2.tab;
    var layout = _getState2.layout;

    if (panel === 'settings') return;
    var ordering = layout[tab].ordering;

    var ix = ordering.indexOf(panel) + 1;
    if (ix >= ordering.length) ix = 0;
    dispatch((0, _actions.focusPanel)(ordering[ix]));
  });

  screen.key(['S-tab'], function () {
    var _getState3 = getState();

    var panel = _getState3.panel;
    var tab = _getState3.tab;
    var layout = _getState3.layout;

    if (panel === 'settings') return;
    var ordering = layout[tab].ordering;

    var ix = ordering.indexOf(panel) - 1;
    if (ix < 0) ix = ordering.length - 1;
    dispatch((0, _actions.focusPanel)(ordering[ix]));
  });
};
//# sourceMappingURL=keys.js.map