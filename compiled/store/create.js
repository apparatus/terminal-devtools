'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _persistanceMap;

var _redux = require('redux');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _persistance = require('./persistance');

var _persistance2 = _interopRequireDefault(_persistance);

var _reducers = require('../reducers');

var reducers = _interopRequireWildcard(_reducers);

var _actions = require('../actions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/* eslint-disable */

/* eslint-enable */


var persist = (0, _persistance2.default)(_path2.default.join(__dirname, '..', 'config', 'user-settings.json'));

var persistanceMap = (_persistanceMap = {}, _defineProperty(_persistanceMap, _actions.TOGGLE_TOOLTIPS, 'tooltips'), _defineProperty(_persistanceMap, _actions.SET_DIMENSIONS, {
  namespace: 'layout',
  transform: function transform(_ref) {
    var name = _ref.name;
    return name;
  }
}), _persistanceMap);

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, persist(persistanceMap)
/* eslint-disable */
// , logger({
//   logger: console,
//   // actionTransformer: action => {
//   //   const {payload} = action
//   //   if (Array.isArray(payload)) payload.forEach(o => {
//   //     if (o.source) o.source = o.source.substr(0, 150)
//   //   })
//   //   if (typeof payload === 'string') {
//   //     action.payload = payload.substr(0, 150)
//   //   }
//   //   return action
//   // },
//   // stateTransformer: state => {
//   //   if (Array.isArray(state)) state.forEach(o => {
//   //     if (o.source) o.source = o.source.substr(0, 150) + '...'
//   //   })
//   //   return state
//   // },
//   colors: {
//     title: false,
//     prevState: false,
//     action: false,
//     nextState: false,
//     error: false,
//   }
// })
/* eslint-enable */
)(_redux.createStore);

var reducer = (0, _redux.combineReducers)(reducers);

exports.default = function (initialState) {
  return createStoreWithMiddleware(reducer, initialState);
};
//# sourceMappingURL=create.js.map