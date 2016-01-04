import React from 'react'
import * as style from '../../style'

/* eslint-disable react/no-unknown-property */

const Navigator = ({
  items, top, left, width, height, focused, index, tooltips,
  actions: {selectFile, setEditorLine, focusPanel}
}) => (
  <list
    vi
    keys
    mouse
    inputOnFocused
    label='Navigator'
    focused={focused}
    selected={index}
    class={[style.panel, style.list, focused && style.selected]}
    width={width}
    top={top}
    height={height}
    items={items}
    onSelectItem={
      ({content: item}) => {
        selectFile(item)
        setEditorLine(0)
      }
    }
    onFocus={() => focused || focusPanel('navigator')}
    hoverText={tooltips && 'ctrl+n'}
  />
)

export default Navigator
