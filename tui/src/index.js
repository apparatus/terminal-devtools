import React from 'react'
import blessed from 'blessed'
import {render} from 'react-blessed'
import {
  BreakPoints, CallStack, Console, Editor, Files, Scope, Tabs
} from './components'

const Devtools = () => (
  <element>
    <Tabs items={['Sources', 'Networking', 'Profiling', 'Console']}/>
    <Files items={['file 1', 'file 2']}/>
    <Editor source='//js source'/>
    <CallStack items={['frame 1', 'frame 2']}/>
    <BreakPoints items={['breakpoint 1', 'breakpoint 2']}/>
    <Scope items={['object 1', 'object 2']}/>
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
    ignoreLocked: ['C-c']
  })

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  })

  screen.key(['e'], () => console.log('emit an action that focuses editor'))
  screen.key(['f'], () => console.log('emit an action that focuses files'))
  screen.key(['s'], () => console.log('emit an action that focuses scope'))
  screen.key(['c'], () => console.log('emit an action that focuses console'))
  screen.key(['a'], () => console.log('emit an action that focuses callstack'))
  screen.key(['b'], () => console.log('emit an action that focuses breakpoints'))

  screen.key(['C-s'], () => console.log('emit an action that focuses source tab'))
  screen.key(['C-n'], () => console.log('emit an action that focuses networking tab'))
  screen.key(['C-p'], () => console.log('emit an action that focuses profiling tab'))
  screen.key(['C-k'], () => console.log('emit an action that focuses console tab'))


  return render(<Devtools />, screen)

}