import React from 'react'
import * as style from '../../style'

/* eslint-disable react/no-unknown-property */

const Scope = ({items, top, left, width, height, focused, tooltips, actions: {focusPanel}}) => (
  <list
    keys
    mouse
    scrollbar
    inputOnFocused
    label='Scope'
    focused={focused}
    class={[style.panel, focused && style.selected]}
    top={top}
    left={left}
    width={width}
    height={height}
    items={items}
    onFocus={() => focused || focusPanel('scope')}
    hoverText={tooltips && 'ctrl+o'}
  />
)

export default Scope
