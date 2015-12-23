import React from 'react'
import * as style from '../../style'

const CallStack = ({
  items, top, left, width, height, focused,
  actions: {selectFrame}
}) => (
  <list
    label='CallStack'
    focused={focused}
    class={[style.panel, style.list]}
    top={top}
    width={width}
    height={height}
    left={left}
    items={items}
    inputOnFocused={true}
    keys={true}
    mouse={true}
    onSelectItem={(item) => {
      const {content} = item
      const index = item.parent.items
        .map(({content}) => content)
        .indexOf(content)

      selectFrame(index)
        
    }}
  />
)

export default CallStack