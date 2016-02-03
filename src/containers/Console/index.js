import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

import {
  Console as ConsoleCmp
} from '../../components'

const Console = ({layout, output, actions}) => (
  <ConsoleCmp focused independent output={output} actions={actions} {...layout.element}/>
)

const mapDispatch = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(({layout, output}) => ({
  layout: layout.console,
  output
}), mapDispatch)(Console)
