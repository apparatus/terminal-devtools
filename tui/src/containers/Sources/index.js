import React from 'React'
import {connect} from 'react-redux'
import {log} from 'blessed'
import {
  BreakPoints, CallStack, Console, Editor, Files, Scope
} from '../../components'

const Sources = ({
  layout, 
  file, 
  source, 
  files, 
  callstack, 
  breakpoints, 
  scope, 
  panel
}) => (
  <element {...layout.element}>
    <Files items={files} focused={panel === 'files'} {...layout.files}/>
    <Editor source={source} focused={panel === 'editor'} {...layout.editor}/>
    <CallStack items={callstack} focused={panel === 'callstack'} {...layout.callstack}/>
    <BreakPoints items={breakpoints} focused={panel === 'breakpoints'} {...layout.breakpoints}/>
    <Scope items={scope} focused={panel === 'scope'} {...layout.scope}/>
    <Console focused={panel === 'console'} {...layout.console}/>
  </element>
)

const mapper = ({
  layout, 
  file, 
  source, 
  files, 
  callstack, 
  breakpoints, 
  scope, 
  panel
}) => ({
  layout: layout.sources, 
  file, 
  source, 
  files, 
  callstack, 
  breakpoints, 
  scope, 
  panel
})

export default connect(mapper)(Sources)