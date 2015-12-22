import React from 'react'
import {Component} from 'react'
import blessed from 'blessed'
import {Provider, connect} from 'react-redux'
import {render} from 'react-blessed'
import functional from 'react-functional'
import createStore from './store/create'
import config from './config'
import {
  Console, Sources
} from './containers'
import {
  Tabs
} from './components'

import {
  focusTab,
  focusPanel,
  receiveFiles,
  receiveCallstack,
  receiveBreakpoints,
  receiveScope,
  receiveSource
} from './actions'

const store = createStore({
  tab: 'sources',
  panel: 'console',
  files: ['file one', 'file two'],
  layout: config.layout,
})
const {dispatch} = store
const tabs = ['Sources', 'Networking', 'Profiling', 'Console']


let Devtools = ({tab}) => {

  return (
    <element>
      <Tabs selected={tab} items={tabs} {...config.layout.tabs}/>
      <Sources/>
      <Console/>
    </element>
  )

}

Devtools = connect(({tab, layout}) => ({tab, layout}))(Devtools)

export default (pid) => {

  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Terminal Devtools',
    sendFocus: true,
    dockBorders: true,
    autoPadding: true,
    log: '/dev/ttys001',
    ignoreLocked: ['C-c']
  })

  console.log = screen.log.bind(screen)
  console.error = screen.log.bind(screen, 'ERROR: ')

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