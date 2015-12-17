import React from 'react'
import {panel} from '../../style'

const Files = ({items, top=1, left, width='31%', height='37.5%'}) => (
  <list 
    label='Files'
    class={panel}
    width={width}
    top={top}
    height={height}
    items={items}
    mouse={true}
    keys={true}
    vi={true}
    inputOnFocused={true}
  />
)

export default Files