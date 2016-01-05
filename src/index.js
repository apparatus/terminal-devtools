Error.stackTraceLimit = Infinity
import 'babel-polyfill'
import 'source-map-support/register'
import fs from 'fs'
import path from 'path'
import React from 'react'
import {Provider, connect} from 'react-redux'
import {render} from 'react-blessed'
import createStore from './store/create'
import createScreen from './screen'
import config from './config'
import {
  Console, Sources, Controls, Cog, Settings, Tabs
} from './containers'
import createDebugger from './lib/debug'
import {
  error,
  receiveCallstack,
  receiveBreakpoints,
  receiveSource,
  receiveSources,
  selectFile,
  selectFrame,
  pause
} from './actions'

const userSettings = path.join(__dirname, 'config', 'user-settings.json')
console.log(userSettings)
const defaultCfg = {tooltips: true, layout: 'normal'}

const userCfg = (fs.existsSync(userSettings))
  ? {...defaultCfg, ...require(userSettings)}
  : {...defaultCfg}

userCfg.layout = config.layouts[userCfg.layout]

const store = createStore({
  tab: 'sources',
  panel: 'editor',
  ...userCfg
})

const {dispatch} = store

export const debug = createDebugger()

export default async (pid, {host = '127.0.0.1', port: debugPort = 5858}) => {

  if (pid) {
    try {
      process.kill(pid, 'SIGUSR1')
    } catch (e) {
      console.log('Warning unable to locate supplied pid ', pid)
    }
  }

  let screen = createScreen(store)

  dispatch(receiveSource('Waiting for port debug port ' + debugPort))

  const dbg = debug.start({host, port: debugPort}, (err, callstack) => {
    if (err) {
      return dispatch(error(err))
    }
    dispatch(receiveCallstack(callstack))

    debug.scripts((err, scripts) => {
      if (err) {
        return dispatch(error(err))
      }
      dispatch(receiveSources(scripts))
      if (callstack) {
        dispatch(pause())
        dispatch(selectFrame(0))
        return
      }
      const {name} = (scripts.find(s => s.name[0] === '/') || scripts[0])
      dispatch(selectFile(name))
    })

    debug.breakpoints((err, {breakpoints}) => {
      if (err) { return console.error(err) }
      receiveBreakpoints(breakpoints)
    })
  })

  dbg.on('event', ({event, body}) => {
    if (event !== 'break') { return }
    const {sourceLine: lineNumber, script: {id: scriptId}} = body
    dispatch(selectFile({scriptId, lineNumber}))
    debug.callstack((err, callstack) => {
      if (err) {
        return dispatch(error(err))
      }
      if (!callstack) { return }
      dispatch(receiveCallstack(callstack))
      dispatch(pause())
      dispatch(selectFrame(0))
    })
  })


  let Devtools = ({layout, tab, panel}) => {
    return (
      <element>
        <Tabs />
        {tab === 'sources' && <Sources/>}
        {tab === 'console' && <Console/>}
        <Cog {...layout.cog} active={panel === 'settings'}/>
        {panel === 'settings' && <Settings focused={panel === 'settings'}/>}
        <Controls {...layout.controls}/>
      </element>
    )
  }

  Devtools = connect(({layout, tab, panel}) => ({layout, tab, panel}))(Devtools)

  return render(<Provider store={store}><Devtools/></Provider>, screen)
}
