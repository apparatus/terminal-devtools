'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = persistance;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function persistance(to) {
  var exists = _fs2.default.existsSync(to);
  if (!exists) {
    _fs2.default.writeFileSync(to, '{}');
  }

  var data = undefined;

  try {
    data = !exists ? {} : JSON.parse(_fs2.default.readFileSync(to));
  } catch (e) {
    data = {};
  }

  return function (cfg) {
    var actionTypes = Object.keys(cfg);
    var namespaces = Object.values(cfg);

    return function (_ref) {
      var dispatch = _ref.dispatch;
      var getState = _ref.getState;
      return function (next) {
        return function (action) {
          var result = next(action);
          var index = actionTypes.indexOf(action.type);

          if (~index) {
            var state = getState();
            var ns = namespaces[index];

            if (Object(ns) === ns) {
              data[ns.namespace] = ns.transform(state[ns.namespace]);
              return save(data, to);
            }

            data[ns] = state[ns];
            save(data, to);
          }

          return result;
        };
      };
    };
  };
}

function save(data, to) {
  //if necessary, make this function batch and throttle
  return _fs2.default.writeFileSync(to, JSON.stringify(data));
}
//# sourceMappingURL=persistance.js.map