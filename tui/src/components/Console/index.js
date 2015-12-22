import React from 'react'
import * as style from '../../style'

const Console = ({top, left, width, height, focused}) => (
  <textarea 
    label='Console'
    focused={focused}
    class={style.panel}
    top={top}
    left={left}
    width={width}
    height={height}
    mouse={true}
    source='> '
  />
)

export default Console