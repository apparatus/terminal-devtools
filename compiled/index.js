'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debug = undefined;

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _reactRedux = require('react-redux');

var _reactBlessed = require('react-blessed');

var _reactFunctional = require('react-functional');

var _reactFunctional2 = _interopRequireDefault(_reactFunctional);

var _portly = require('portly');

var _portly2 = _interopRequireDefault(_portly);

var _create = require('./store/create');

var _create2 = _interopRequireDefault(_create);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _containers = require('./containers');

var _components = require('./components');

var _debug = require('./lib/debug');

var _debug2 = _interopRequireDefault(_debug);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

var store = (0, _create2.default)({
  tab: 'sources',
  panel: 'editor',
  layout: _config2.default.layout
});
var dispatch = store.dispatch;

var tabs = ['Sources', 'Networking', 'Profiling', 'Console'];

var Devtools = function Devtools(_ref) {
  var layout = _ref.layout;
  var tab = _ref.tab;

  return _react2.default.createElement(
    'element',
    null,
    _react2.default.createElement(_components.Tabs, _extends({ dispatch: dispatch, items: tabs }, layout.tabs)),
    tab === 'sources' && _react2.default.createElement(_containers.Sources, null),
    tab === 'console' && _react2.default.createElement(_containers.Console, null)
  );
};

Devtools = (0, _reactRedux.connect)(function (_ref2) {
  var layout = _ref2.layout;
  var tab = _ref2.tab;
  return { layout: layout, tab: tab };
})(Devtools);

var debug = exports.debug = (0, _debug2.default)();

exports.default = (function () {
  var _this = this;

  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(pid) {
    var debugPort, screen;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            debugPort = 5858;

            if (pid) {
              try {
                process.kill(pid, 'SIGUSR1');
              } catch (e) {
                console.log('Warning unable to locate supplied pid ', pid);
              }
            }

            screen = _blessed2.default.screen({
              autoPadding: true,
              smartCSR: true,
              title: 'Terminal Devtools',
              sendFocus: true,
              dockBorders: true,
              autoPadding: true,
              log: './log',
              // log: '/dev/ttys002',
              ignoreLocked: ['C-c']
            });

            console.log = screen.log.bind(screen);
            console.error = screen.log.bind(screen, 'ERROR: ');

            dispatch((0, _actions.receiveSource)('Waiting for port debug port ' + debugPort));
            (0, _portly2.default)(debugPort).then(function (portPid) {
              debug.start(debugPort, function (err, callstack) {
                dispatch((0, _actions.receiveCallstack)(callstack));

                debug.scripts(function (err, scripts) {
                  dispatch((0, _actions.receiveSources)(scripts));
                  if (callstack) {
                    return dispatch((0, _actions.selectFrame)(0));
                  }

                  var _ref3 = scripts.find(function (s) {
                    return s.name[0] === '/';
                  }) || scripts[0];

                  var name = _ref3.name;

                  dispatch((0, _actions.selectFile)(name));
                });

                debug.breakpoints(function (err, _ref4) {
                  var breakpoints = _ref4.breakpoints;

                  if (err) {
                    return console.error(err);
                  }
                  (0, _actions.receiveBreakpoints)(breakpoints);
                });
              });
            });

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
              var _store$getState = store.getState();

              var panel = _store$getState.panel;
              var tab = _store$getState.tab;
              var ordering = _config2.default.layout[tab].ordering;

              var ix = ordering.indexOf(panel) + 1;
              if (ix >= ordering.length) ix = 0;
              dispatch((0, _actions.focusPanel)(ordering[ix]));
            });

            screen.key(['S-tab'], function () {
              var _store$getState2 = store.getState();

              var panel = _store$getState2.panel;
              var tab = _store$getState2.tab;
              var ordering = _config2.default.layout[tab].ordering;

              var ix = ordering.indexOf(panel) - 1;
              if (ix < 0) ix = ordering.length - 1;
              dispatch((0, _actions.focusPanel)(ordering[ix]));
            });

            return _context.abrupt('return', (0, _reactBlessed.render)(_react2.default.createElement(
              _reactRedux.Provider,
              { store: store },
              _react2.default.createElement(Devtools, null)
            ), screen));

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x) {
    return ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=index.js.map