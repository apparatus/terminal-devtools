'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (store) {
  var screen = _blessed2.default.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Terminal Devtools',
    sendFocus: true,
    dockBorders: true,
    log: './log',
    // log: '/dev/ttys001',
    terminal: 'xterm-256color',
    ignoreLocked: ['C-c']
  });

  console.log = screen.log.bind(screen);
  console.error = screen.log.bind(screen, 'ERROR: ');

  (0, _keys2.default)(store, screen);

  return screen;
};
//# sourceMappingURL=screen.js.map