import React from 'react'
import {panel} from '../../style'

const Editor = ({source, top=1, left='30%', width='70%', height='37.5%'}) => (
  <textarea
    class={panel}
    left={left}
    width={width}
    top={top}
    height={height}
    inputOnFocus={true}
    value={source}
    mouse={true}
  />
)

export default Editor