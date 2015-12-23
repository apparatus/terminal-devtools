import React from 'react'
import * as style from '../../style'

const Navigator = ({
  items, top, left, width, height, focused, 
  actions: {selectFile}
}) => (
  <list 
    label='Navigator'
    focused={focused}
    class={[style.panel, style.list]}
    width={width}
    top={top}
    height={height}
    items={items}
    mouse={true}
    keys={true}
    inputOnFocused={true}
    onSelectItem={({content: item}) => selectFile(item)}
  />
)

export default Navigator