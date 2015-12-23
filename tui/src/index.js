import 'babel-polyfill'
import React from 'react'
import {Component} from 'react'
import blessed from 'blessed'
import {Provider, connect} from 'react-redux'
import {render} from 'react-blessed'
import functional from 'react-functional'
import {waitUntilUsed} from 'tcp-port-used'
import createStore from './store/create'
import config from './config'
import { Console, Sources } from './containers'
import { Tabs } from './components'
import createDebugger from './lib/debug'
import {
  focusTab,
  focusPanel,
  receiveFiles,
  receiveCallstack,
  receiveBreakpoints,
  receiveScope,
  receiveSource,
  pause,
  resume,
  stepOver,
  stepInto,
  stepOut,
  nextFrame,
  previousFrame
} from './actions'

const store = createStore({
  tab: 'sources',
  panel: 'editor',
  files: ['file one', 'file two'],
  source: '',
  layout: config.layout,
})
const {dispatch} = store
const tabs = ['Sources', 'Networking', 'Profiling', 'Console']

let Devtools = ({layout, tab}) => {
  return (
    <element>
      <Tabs dispatch={dispatch} items={tabs} {...layout.tabs}/>
      {tab === 'sources' && <Sources/>}
      {tab === 'console' && <Console/>}
    </element>
  )
}

Devtools = connect(({layout, tab}) => ({layout, tab}))(Devtools)

export const debug = createDebugger()

export default async (pid) => {
  const debugPort = 5858

  // if (pid) { 
    // process.kill(pid, 'SIGUSR1')
    // await waitUntilUsed(debugPort)
  // }


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

  debug.start(debugPort, (err, {source, bp: {callFrames: callstack}}) => {
    dispatch(receiveSource(source))
    dispatch(receiveCallstack(callstack))
  })

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  })

  screen.key(['C-t'], () => dispatch(focusPanel('editor')))
  screen.key(['C-n'], () => dispatch(focusPanel('navigator')))
  screen.key(['C-o'], () => dispatch(focusPanel('scope')))
  screen.key(['C-k'], () => dispatch(focusPanel('console')))
  screen.key(['C-s'], () => dispatch(focusPanel('callstack')))
  screen.key(['C-p'], () => dispatch(focusPanel('breakpoints')))

  screen.key(['F8', 'C-\\', 'r'], () => dispatch(resume()))
  screen.key(['S-F8', 'C-S-\\', 'p'], () => dispatch(pause()))
  screen.key(['F10', 'C-\'', 'n'], () => dispatch(stepOver()))



  return render(
    <Provider store={store}>
      <Devtools/>
    </Provider>
  , screen)

}