import React from 'react'
import functional from 'react-functional'
import * as style from '../../style'

/* eslint-disable react/no-unknown-property */

const ed = {
  style: {
    selected: {
      bold: true,
      bg: 'blue'
    },
    item: {
      bold: false
    },
    scrollbar: {
      bg: 'white'
    }
  }
}

const Editor = ({items, selected, top, left, width, height, focused, tooltips, actions: {setEditorLine, focusPanel, toggleBreakpoint}}) => (
  <list
    vi
    keys
    mouse
    scrollbar
    inputOnFocused
    class={[style.panel, ed, focused && style.selected]}
    selected={selected.idx}
    left={left}
    width={width}
    top={top}
    height={height}
    focused={focused}
    items={items}
    onSelectItem={item => {
      focusPanel('editor')
      setEditorLine(item.parent.getItemIndex(item) + 1)
    }}
    onKeyB={() => toggleBreakpoint()}
    hoverText={tooltips && 'Source Text (ctrl+t)'}
  />
)

export default Editor

export default functional(Editor, {
  shouldComponentUpdate: (props, nextProps) => {
    if (!nextProps.focused && props.selected !== nextProps.selected) return true
    return props.focused !== nextProps.focused || props.items !== nextProps.items
  }
})
