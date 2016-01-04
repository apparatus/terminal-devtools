import {
  createStore, 
  applyMiddleware, 
  combineReducers
} from 'redux'
import path from 'path'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import persistance from './persistance'
import * as reducers from '../reducers'
import {TOGGLE_TOOLTIPS, SET_DIMENSIONS} from '../actions'

const persist = persistance(path.join(__dirname, '..', 'config', 'user-settings.json'))


const persistanceMap = {
  [TOGGLE_TOOLTIPS]: 'tooltips',
  [SET_DIMENSIONS]: {
    namespace: 'layout',
    transform: ({name}) => name
  }
}

const createStoreWithMiddleware = 
  applyMiddleware(thunk, persist(persistanceMap)
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




