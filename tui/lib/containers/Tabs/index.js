'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require('React');

var _React2 = _interopRequireDefault(_React);

var _reactRedux = require('react-redux');

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = function Tabs(props) {
  return _React2.default.createElement(_components.Tabs, { items: ['Sources', 'Networking', 'Profiling', 'Console'] });
};

exports.default = (0, _reactRedux.connect)(function (_ref) {
  var tab = _ref.tab;
  return { tab: tab };
})(Tabs);
//# sourceMappingURL=index.js.map