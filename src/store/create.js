import {
  createStore, 
  applyMiddleware, 
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import * as reducers from '../reducers'

const createStoreWithMiddleware = 
  applyMiddleware(thunk
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
  )(createStore)

const reducer = combineReducers(reducers)

export default initialState => 
  createStoreWithMiddleware(reducer, initialState)