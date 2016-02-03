import React from 'react'
import {connect} from 'react-redux'
import {pause, resume, stepOver, stepInto, stepOut} from '../../actions'

import {
  Controls as ControlsCmp
} from '../../components'

const Controls = ({layout, tooltips, paused, dispatch}) => (
  <ControlsCmp
    {...layout}
    paused={paused}
    tooltips={tooltips}
    pauseResume={() => (paused ? dispatch(resume()) : dispatch(pause()))}
    stepOver={() => dispatch(stepOver())}
    stepInto={() => dispatch(stepInto())}
    stepOut={() => dispatch(stepOut())}
  />
)

export default connect(({layout, tooltips, paused}) => ({
  layout: layout.controls,
  tooltips,
  paused
}))(Controls)
