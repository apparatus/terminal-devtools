import {
  createStore, 
  applyMiddleware, 
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import * as reducers from '../reducers'

const createStoreWithMiddleware = 
  applyMiddleware(thunk, logger({
    logger: console,
    colors: {
      title: false,
      prevState: false,
      action: false,
      nextState: false,
      error: false,
    }
  }))(createStore)

const reducer = combineReducers(reducers)

export default initialState => 
  createStoreWithMiddleware(reducer, initialState)