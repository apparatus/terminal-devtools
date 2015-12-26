import React from 'react'
import * as style from '../../style'

const Navigator = ({
  items, top, left, width, height, focused, index,
  actions: {selectFile, setEditorLine, focusPanel}
}) => (
  <list 
    label='Navigator'
    focused={focused}
    selected={index}
    class={[style.panel, style.list, focused && style.selected]}
    width={width}
    top={top}
    height={height}
    items={items}
    mouse={true}
    keys={true}
    vi={true}
    inputOnFocused={true}
    onSelectItem={
      ({content: item}) => {
        selectFile(item)
        setEditorLine(0)
      }
    }
    onFocus={() => focused || focusPanel('navigator')}
  />
)

export default Navigator