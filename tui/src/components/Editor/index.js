import React from 'react'
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
  actions: {setEditorLine}
}) => (
  <list
    class={[style.panel, ed]}
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
    onSelectItem={item => setEditorLine(item.parent.getItemIndex(item))}
  />
)


export default Editor