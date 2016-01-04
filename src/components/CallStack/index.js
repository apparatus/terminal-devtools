import React from 'react'
import * as style from '../../style'

/* eslint-disable react/no-unknown-property */

const CallStack = ({items, top, left, width, height, focused, tooltips, actions: {selectFrame, focusPanel}}) => (
  <list
    keys
    mouse
    inputOnFocused
    label='CallStack'
    focused={focused}
    class={[style.panel, style.list, focused && style.selected]}
    top={top}
    width={width}
    height={height}
    left={left}
    items={items}
    onSelectItem={(item) => {
      const {content} = item
      const index = item.parent.items
        .map(({content}) => content)
        .indexOf(content)

      selectFrame(index)
    }}
    onFocus={() => focused || focusPanel('callstack')}
    hoverText={tooltips && 'ctrl+s'}
  />
)

export default CallStack
