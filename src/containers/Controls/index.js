import React from 'React'
import {connect} from 'react-redux'
import {pause, resume, stepOver, stepInto, stepOut} from '../../actions'


import {
  Controls as ControlsCmp
} from '../../components'

const Controls = ({layout, paused, dispatch}) => (
  <ControlsCmp 
    {...layout} 
    paused={paused} 
    pauseResume={()=>(paused ? dispatch(resume()) : dispatch(pause()))}
    stepOver={()=>dispatch(stepOver())}
    stepInto={()=>dispatch(stepInto())}
    stepOut={()=>dispatch(stepOut())}
  />
)

export default connect(({layout, paused}) => ({
  layout: layout.controls,
  paused
}))(Controls)