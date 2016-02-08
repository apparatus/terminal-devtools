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
import {
  startDebugging,
  receiveSource
} from './actions'

const userSettings = path.join(__dirname, 'config', 'user-settings.json')

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

export default async (pid, {host: host = '127.0.0.1', port: port = 5858}) => {
  if (pid) {
    try {
      process.kill(pid, 'SIGUSR1')
    } catch (e) {
      console.log('Warning unable to locate supplied pid ', pid)
    }
  }

  let screen = createScreen(store)

  dispatch(receiveSource('Waiting for debug port ' + port))
  dispatch(startDebugging({host, port}))

  let Devtools = ({layout, tab, panel}) => {
    return (
      <element>
        {
          // force tab rendering after layout change:
          // todo: find a more elegant fix
        }
        {layout.name === 'normal' && <Tabs/>}
        {layout.name === 'minimal' && <Tabs/>}
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
