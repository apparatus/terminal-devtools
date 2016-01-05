'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controls = exports.settings = exports.tabs = exports.cog = exports.name = undefined;

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
  top: '47.5%-14',
  left: '50%-46',
  width: 90,
  height: 28
};

var controls = exports.controls = {
  left: '100%-10',
  width: 10,
  height: 3,
  top: 0
};

exports.default = { name: name, sources: sources, console: console, cog: cog, tabs: tabs, settings: settings, controls: controls };
//# sourceMappingURL=index.js.map