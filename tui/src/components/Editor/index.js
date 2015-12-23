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

const Editor = ({source, top, left, width, height, focused}) => (
  <list
    class={[style.panel, ed]}
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
    items={source.split('\n')}
  />
)


export default Editor