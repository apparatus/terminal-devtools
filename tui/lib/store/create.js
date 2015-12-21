'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reducers = require('../reducers');

var reducers = _interopRequireWildcard(_reducers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)({
  logger: console,
  colors: {
    title: false,
    prevState: false,
    action: false,
    nextState: false,
    error: false
  }
}))(_redux.createStore);

var reducer = (0, _redux.combineReducers)(reducers);

exports.default = function (initialState) {
  return createStoreWithMiddleware(reducer, initialState);
};
//# sourceMappingURL=create.js.map