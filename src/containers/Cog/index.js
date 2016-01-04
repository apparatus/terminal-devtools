import React from 'React'
import { connect } from 'react-redux'
import { focusPanel } from '../../actions'

import { Cog as CogCmp } from '../../components'

const Cog = ({layout, active, dispatch}) => (
  <CogCmp
    {...layout}
    active={active}
    onClick={() => dispatch(focusPanel('settings'))}
  />
)

export default connect(({layout}) => ({
  layout: layout.cog
}))(Cog)
