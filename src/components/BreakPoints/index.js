import React from 'react'
import * as style from '../../style'

/* eslint-disable react/no-unknown-property */

const BreakPoints = ({items, top, left, width, height, focused, tooltips, actions: {focusPanel}}) => (
  <list
    mouse
    label='BreakPoints'
    focused={focused}
    class={[style.panel, focused && style.selected]}
    top={top}
    left={left}
    width={width}
    height={height}
    items={items}
    onFocus={() => focused || focusPanel('breakpoints')}
    hoverText={tooltips && 'ctrl+p'}
  />
)

export default BreakPoints
