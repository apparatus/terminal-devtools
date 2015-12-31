import React from 'React'
import {connect} from 'react-redux'

import {
  Controls as ControlsCmp
} from '../../components'

const Controls = ({layout, paused}) => (
  <ControlsCmp {...layout} paused={paused} />
)

export default connect(({layout, paused}) => ({
  layout: layout.controls,
  paused
}))(Controls)