'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sources = require('./sources');

var sources = _interopRequireWildcard(_sources);

var _console = require('./console');

var console = _interopRequireWildcard(_console);

var _tabs = require('./tabs');

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = { sources: sources, console: console, tabs: _tabs2.default };
//# sourceMappingURL=index.js.map