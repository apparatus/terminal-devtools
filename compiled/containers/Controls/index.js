'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require('React');

var _React2 = _interopRequireDefault(_React);

var _reactRedux = require('react-redux');

var _components = require('../../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controls = function Controls(_ref) {
  var layout = _ref.layout;
  return _React2.default.createElement(_components.Controls, layout);
};

exports.default = (0, _reactRedux.connect)(function (_ref2) {
  var layout = _ref2.layout;
  return {
    layout: layout.controls
  };
})(Controls);
//# sourceMappingURL=index.js.map