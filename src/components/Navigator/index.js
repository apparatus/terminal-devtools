import React from 'react'
import Tree from '../Tree'
import * as style from '../../style'

/* eslint-disable react/no-unknown-property */

const Navigator = ({
  items, top, left, width, height, focused, item, tooltips,
  actions: {selectFile, setEditorLine, focusPanel}
}) => (
  <Tree
    vi
    keys
    mouse
    inputOnFocused
    indentation={1}
    label='Navigator'
    focused={focused}
    class={[style.panel, style.list, focused && style.selected]}
    width={width}
    top={top}
    left={left}
    height={height}
    item={item}
    items={items}
    onSelectItem = {
      ({data: {path}}) => {
        selectFile(path)
        setEditorLine(0)
      }
    }
    onFocus={() => focused || focusPanel('navigator')}
    hoverText={tooltips && 'ctrl+n'}
  />
)

export default Navigator
