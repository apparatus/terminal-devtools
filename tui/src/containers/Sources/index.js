import React from 'React'
import {connect} from 'react-redux'
import {
  BreakPoints, CallStack, Console, Editor, Files, Scope, Tabs
} from '../../components'


const Sources = props => (
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

export default connect(
  ({tab, file, source, callstack, breakpoints, scope, panel}) => 
    ({file, source, callstack, breakpoints, scope, panel})
)(Sources)