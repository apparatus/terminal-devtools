import React from 'react'
import { connect } from 'react-redux'
import { focusPanel, setDimensions, toggleTooltips } from '../../actions'
import layouts from '../../config/layouts'

import { Settings as SettingsCmp } from '../../components'

let focusedInput = 'normal'

const Settings = ({layout, tooltips, dispatch, focused}) => {
  const changeLayout = (to) => () => {
    // hack - react-blessed and/or blessed currently
    // doesn't do well with multiple rendering changes
    // in the same event loop
    setImmediate(() => {
      dispatch(focusPanel('editor'))
      setImmediate(() => {
        dispatch(setDimensions(layouts[to]))
        focusedInput = to
        dispatch(focusPanel('settings'))
      })
    })
  }

  const tooltipsToggle = () => {
    setImmediate(() => {
      dispatch(focusPanel('editor'))
      setImmediate(() => {
        dispatch(toggleTooltips())
        focusedInput = 'tooltips'
        dispatch(focusPanel('settings'))
      })
    })
  }

  return (
    <SettingsCmp
      {...layout.settings}
      focusedInput={focusedInput || layout}
      focused={focused}
      layout={layout}
      tooltips={tooltips}
      changeLayout={changeLayout}
      toggleTooltips={tooltipsToggle}
    />
  )
}

export default connect(({layout, tooltips}) => ({layout, tooltips}))(Settings)
