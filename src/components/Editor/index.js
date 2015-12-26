import React from 'react'
import functional from 'react-functional'
import * as style from '../../style'

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
    },
  }
}

const Editor = ({
  items, selected, top, left, width, height, focused, 
  actions: {setEditorLine, focusPanel, toggleBreakpoint}
}) => (
  <list
    class={[style.panel, ed, focused && style.selected]}
    selected={selected}
    left={left}
    width={width}
    top={top}
    height={height}
    scrollbar={true}
    mouse={true}
    keys={true}
    vi={true}
    inputOnFocused={true}
    focused={focused}
    items={items}
    onSelectItem={item => {
      focusPanel('editor')
      setEditorLine(item.parent.getItemIndex(item))
    }}
    onKeyB={() => toggleBreakpoint()}
  />
)

export default Editor

export default functional(Editor, {
  shouldComponentUpdate: (props, nextProps) => {
    if (!nextProps.focused && props.selected !== nextProps.selected) return true
    return props.focused !== nextProps.focused || props.items !== nextProps.items
  }
})