'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layouts = require('./layouts');

var _layouts2 = _interopRequireDefault(_layouts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO make profile this user configurable
var profile = 'normal';

var layout = _layouts2.default[profile];

exports.default = { layout: layout };
//# sourceMappingURL=index.js.map