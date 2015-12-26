import 'babel-polyfill'
import React from 'react'
import {Component} from 'react'
import blessed from 'blessed'
import {Provider, connect} from 'react-redux'
import {render} from 'react-blessed'
import functional from 'react-functional'
import portly from 'portly'
import createStore from './store/create'
import config from './config'
import { Console, Sources } from './containers'
import { Tabs } from './components'
import createDebugger from './lib/debug'
import {
  focusTab,
  focusPanel,
  receiveCallstack,
  receiveBreakpoints,
  receiveScope,
  receiveSource,
  receiveSources,
  selectFile,
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

  if (pid) {
    try { 
      process.kill(pid, 'SIGUSR1')
    } catch (e) {
      console.log('Warning unable to locate supplied pid ', pid)
    }
  }

  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Terminal Devtools',
    sendFocus: true,
    dockBorders: true,
    autoPadding: true,
    log: __dirname + '/log', //'/dev/ttys002',
    ignoreLocked: ['C-c']
  })

  console.log = screen.log.bind(screen)
  console.error = screen.log.bind(screen, 'ERROR: ')

  dispatch(receiveSource('Waiting for port debug port ' + debugPort))
  portly(debugPort).then(portPid => {
    debug.start(debugPort, (err, callstack) => {
      dispatch(receiveCallstack(callstack))

      debug.scripts((err, scripts) => {
        dispatch(receiveSources(scripts))
        if (callstack) {
          return dispatch(selectFile(callstack[0].location))
        }
        const {name} = (scripts.find(s => s.name[0] === '/') || scripts[0])
        dispatch(selectFile(name))
      })

      debug.breakpoints((err, {breakpoints}) => {
        if (err) { return console.error(err) }
        receiveBreakpoints(breakpoints)
      })
    })
  })


  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  })


  screen.key(['C-n'], () => dispatch(focusPanel('navigator')))
  screen.key(['C-t'], () => dispatch(focusPanel('editor')))
  screen.key(['C-s'], () => dispatch(focusPanel('callstack')))
  screen.key(['C-p'], () => dispatch(focusPanel('breakpoints')))
  screen.key(['C-o'], () => dispatch(focusPanel('scope')))
  screen.key(['C-k'], () => dispatch(focusPanel('console')))

  screen.key(['F8', 'C-\\', 'r'], () => dispatch(resume()))
  screen.key(['S-F8', 'C-S-\\', 'p'], () => dispatch(pause()))
  screen.key(['F10', 'C-\'', 'n'], () => dispatch(stepOver()))

  screen.key(['tab'], () => {
    const {panel, tab} = store.getState()
    const {ordering} = config.layout[tab]
    let ix = ordering.indexOf(panel) + 1
    if (ix >= ordering.length) ix = 0
    dispatch(focusPanel(ordering[ix]))
  })

  screen.key(['S-tab'], () => {
    const {panel, tab} = store.getState()
    const {ordering} = config.layout[tab]
    let ix = ordering.indexOf(panel) - 1
    if (ix < 0) ix = ordering.length -1
    dispatch(focusPanel(ordering[ix]))
  })

  return render(
    <Provider store={store}>
      <Devtools/>
    </Provider>
  , screen)

}