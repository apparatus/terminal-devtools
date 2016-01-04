import React from 'React'
import {connect} from 'react-redux'
import {
  Console as ConsoleCmp
} from '../../components'

const Console = ({layout}) => (
  <ConsoleCmp {...layout.element}/>
)

export default connect(({layout}) => ({
  layout: layout.console
}))(Console)
