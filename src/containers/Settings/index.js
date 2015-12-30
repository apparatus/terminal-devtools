import React from 'React'
import {connect} from 'react-redux'
import {focusPanel, setDimensions} from '../../actions'
import layouts from '../../config/layouts'

import {
  Settings as SettingsCmp
} from '../../components'

const Settings = ({layout, dispatch, focused}) => {
  const hideWhen = (ch, key) => {
    if (ch === '?') { dispatch(focusPanel('editor')) }
  }

  const changeLayout = (to) => () => {
    //hack - react-blessed and/or blessed currently 
    //doesn't do well with multiple rendering changes 
    //in the same event loop
    setImmediate(() => {
      dispatch(focusPanel('editor'))
      setImmediate(() => {
        dispatch(setDimensions(layouts[to]))
        dispatch(focusPanel('settings'))
      })
    })  
  }

  return (<SettingsCmp 
    {...layout.settings}
    focused={focused}
    layout={layout}
    hideWhen={hideWhen}
    changeLayout={changeLayout} 
  />)
}

export default connect(({layout}) => ({layout}))(Settings)