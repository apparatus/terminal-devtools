import React from 'react'
import * as style from '../../style'

const Scope = ({items, top, left, width, height, focused}) => (
  <list 
    label='Scope'
    focused={focused}
    class={style.panel}
    top={top}
    left={left}
    width={width}
    height={height}
    items={items}
    mouse={true}
  />
)

export default Scope