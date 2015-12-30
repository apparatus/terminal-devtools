import React from 'React'
import {connect} from 'react-redux'

import {
  Controls as ControlsCmp
} from '../../components'

const Controls = ({layout}) => (
  <ControlsCmp {...layout}/>
)

export default connect(({layout}) => ({
  layout: layout.controls
}))(Controls)