import React from 'react'
import Tree from '../Tree'
import * as style from '../../style'

/* eslint-disable react/no-unknown-property */

const Scope = ({items, item, top, left, width, height, focused, tooltips, actions: {focusPanel, extendScope}}) => (
  <Tree
    keys
    mouse
    scrollbar
    inputOnFocused
    labelling
    label='Scope'
    focused={focused}
    class={[style.panel, style.list, focused && style.selected]}
    top={top}
    left={left}
    width={width}
    height={height}
    items={items}
    item={item}
    hoverText={tooltips && 'ctrl+o'}
    onFocus={() => focused || focusPanel('scope')}
    onExpand={(item) => {
      const {meta} = item
      if (!meta) return
      extendScope({...meta, branch: item})
    }}
  />
)

export default Scope
