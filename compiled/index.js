'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

require('source-map-support/register');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactBlessed = require('react-blessed');

var _create = require('./store/create');

var _create2 = _interopRequireDefault(_create);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _containers = require('./containers');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

Error.stackTraceLimit = Infinity;


var userSettings = _path2.default.join(__dirname, 'config', 'user-settings.json');

var defaultCfg = { tooltips: true, layout: 'normal' };

var userCfg = _fs2.default.existsSync(userSettings) ? _extends({}, defaultCfg, require(userSettings)) : _extends({}, defaultCfg);

userCfg.layout = _config2.default.layouts[userCfg.layout];

var store = (0, _create2.default)(_extends({
  tab: 'sources',
  panel: 'editor'
}, userCfg));

var dispatch = store.dispatch;

exports.default = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(pid, _ref) {
    var _ref$host = _ref.host;
    var host = _ref$host === undefined ? '127.0.0.1' : _ref$host;
    var _ref$port = _ref.port;
    var port = _ref$port === undefined ? 5858 : _ref$port;
    var screen, Devtools;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (pid) {
              try {
                process.kill(pid, 'SIGUSR1');
              } catch (e) {
                console.log('Warning unable to locate supplied pid ', pid);
              }
            }

            screen = (0, _screen2.default)(store);


            dispatch((0, _actions.receiveSource)('Waiting for debug port ' + port));
            dispatch((0, _actions.startDebugging)({ host: host, port: port }));

            Devtools = function Devtools(_ref2) {
              var layout = _ref2.layout;
              var tab = _ref2.tab;
              var panel = _ref2.panel;

              return _react2.default.createElement(
                'element',
                null,
                layout.name === 'normal' && _react2.default.createElement(_containers.Tabs, null),
                layout.name === 'minimal' && _react2.default.createElement(_containers.Tabs, null),
                tab === 'sources' && _react2.default.createElement(_containers.Sources, null),
                tab === 'console' && _react2.default.createElement(_containers.Console, null),
                _react2.default.createElement(_containers.Cog, _extends({}, layout.cog, { active: panel === 'settings' })),
                panel === 'settings' && _react2.default.createElement(_containers.Settings, { focused: panel === 'settings' }),
                _react2.default.createElement(_containers.Controls, layout.controls)
              );
            };

            Devtools = (0, _reactRedux.connect)(function (_ref3) {
              var layout = _ref3.layout;
              var tab = _ref3.tab;
              var panel = _ref3.panel;
              return { layout: layout, tab: tab, panel: panel };
            })(Devtools);

            return _context.abrupt('return', (0, _reactBlessed.render)(_react2.default.createElement(
              _reactRedux.Provider,
              { store: store },
              _react2.default.createElement(Devtools, null)
            ), screen));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })),
      _this = undefined;

  return function (_x, _x2) {
    return ref.apply(_this, arguments);
  };
}();
//# sourceMappingURL=index.js.map