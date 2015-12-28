'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.tabs = exports.cog = exports.name = undefined;

var _sources = require('./sources');

var sources = _interopRequireWildcard(_sources);

var _console = require('./console');

var console = _interopRequireWildcard(_console);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var name = exports.name = 'compact';

var cog = exports.cog = {
  top: 0,
  left: '100%-3',
  width: 2,
  height: 1
};

var tabs = exports.tabs = {
  top: 0,
  left: '5%',
  width: '100%',
  height: 'shrink'
};

var settings = exports.settings = {
  top: '12%',
  left: '12.5%',
  width: '75%',
  height: '75%'
};

exports.default = { name: name, sources: sources, console: console, cog: cog, tabs: tabs, settings: settings };
//# sourceMappingURL=index.js.map