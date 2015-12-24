import React from 'react'
import * as style from '../../style'

const BreakPoints = ({items, top, left, width, height, focused, actions: {focusPanel}}) => (
  <list 
    label='BreakPoints'
    focused={focused}
    class={[style.panel, focused && style.selected]}
    top={top}
    left={left}
    width={width}
    height={height}
    items={items}
    mouse={true}
    onFocus={() => focused || focusPanel('breakpoints')}
  />
)

export default BreakPoints