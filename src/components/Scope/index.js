import React from 'react'
import * as style from '../../style'

const Scope = ({items, top, left, width, height, focused, tooltips, actions: {focusPanel}}) => (
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
    inputOnFocused={true}
    keys={true}
    scrollbar={true}
    onFocus={() => focused || focusPanel('scope')}
    hoverText={tooltips && 'ctrl+o'}
  />
)

export default Scope