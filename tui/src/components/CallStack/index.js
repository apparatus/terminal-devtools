import React from 'react'
import * as style from '../../style'

const CallStack = ({items, top, left, width, height, focused}) => (
  <list
    label='CallStack'
    focused={focused}
    class={style.panel}
    top={top}
    width={width}
    height={height}
    items={items}
    mouse={true}
  />
)

export default CallStack