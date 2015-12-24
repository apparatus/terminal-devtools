import React from 'react'
import * as style from '../../style'

const Scope = ({items, top, left, width, height, focused, actions: {focusPanel}}) => (
  <list 
    label='Scope'
    focused={focused}
    class={[style.panel, focused && style.selected]}
    top={top}
    left={left}
    width={width}
    height={height}
    items={items}
    mouse={true}
    onFocus={() => focused || focusPanel('scope')}
  />
)

export default Scope