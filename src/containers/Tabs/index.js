import React from 'react'
import {connect} from 'react-redux'
import {focusTab} from '../../actions'

import {
  Tabs as TabsCmp
} from '../../components'

const tabs = ['Sources', 'Networking', 'Profiling', 'Console']

const Tabs = ({layout, dispatch}) => (
  <TabsCmp {...layout} items={tabs} onSelectTab={
    (_, ix) => dispatch(focusTab(tabs[ix]))
  }/>
)

export default connect(({layout}) => ({
  layout: layout.tabs
}))(Tabs)
