import React from 'React'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {log} from 'blessed'
import {
  BreakPoints, CallStack, Console, Editor, Navigator, Scope
} from '../../components'
import * as actionCreators from '../../actions'

const Sources = ({
  layout, 
  file, 
  source, 
  files, 
  callstack, 
  breakpoints, 
  scope, 
  panel,
  actions
}) => (
  <element {...layout.element}>
    <Navigator items={files} focused={panel === 'navigator'} actions={actions} {...layout.navigator}/>
    <Editor source={source} focused={panel === 'editor'} actions={actions} {...layout.editor}/>
    <CallStack items={callstack} focused={panel === 'callstack'} actions={actions} {...layout.callstack}/>
    <BreakPoints items={breakpoints} focused={panel === 'breakpoints'} actions={actions} {...layout.breakpoints}/>
    <Scope items={scope} focused={panel === 'scope'} actions={actions} {...layout.scope}/>
    <Console focused={panel === 'console'} actions={actions} {...layout.console}/>
  </element>
)

const mapState = ({
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

const mapDispatch = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapState, mapDispatch)(Sources)