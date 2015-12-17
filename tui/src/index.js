import React from 'react'
import blessed from 'blessed'
import {Provider} from 'react-redux'
import {render} from 'react-blessed'
import createStore from './store/create'
import {
  Console, Sources
} from './containers'

import {
  focusTab,
  focusPanel,
  receiveFiles,
  receiveCallstack,
  receiveBreakpoints,
  receiveScope,
  receiveSource
} from './actions'

const store = createStore()
const {dispatch} = store

const Devtools = () => (
  <element>
    <Sources/>
    <Console/>
  </element>
)

export default (pid) => {

  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Terminal Devtools',
    sendFocus: true,
    dockBorders: true,
    autoPadding: true,
    debug: true,
    ignoreLocked: ['C-c']
  })

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  })

  screen.key(['e'], () => dispatch(focusPanel('editor')))
  screen.key(['f'], () => dispatch(focusPanel('files')))
  screen.key(['s'], () => dispatch(focusPanel('scope')))
  screen.key(['c'], () => dispatch(focusPanel('console')))
  screen.key(['a'], () => dispatch(focusPanel('callstack')))
  screen.key(['b'], () => dispatch(focusPanel('breakpoints')))

  screen.key(['C-s'], () => dispatch(focusTab('source')))
  screen.key(['C-n'], () => dispatch(focusTab('networking')))
  screen.key(['C-p'], () => dispatch(focusTab('profiling')))
  screen.key(['C-k'], () => dispatch(focusTab('console')))


  return render(
    <Provider store={store}>
      <Devtools/>
    </Provider>
  , screen)

}