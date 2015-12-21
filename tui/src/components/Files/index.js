import React from 'react'
import * as style from '../../style'

function f(lastElement) {
  console.log('LAS', lastElement)
  lastElement.style.border = {fg: 'white'}


}

const Files = ({items, top, left, width, height, focused}) => (
  <list 
    label='Files'
    focused={focused}
    class={style.panel}
    width={width}
    top={top}
    height={height}
    items={items}
    mouse={true}
    keys={true}
    inputOnFocused={true}
    onFocus={f}
  />
)

export default Files