import React from 'react'
import {panel} from '../../style'

const Scope = ({items, top='40%-1', left='49%', width='51%', height='37.5%+1'}) => (
  <list label='Scope'
    class={panel}
    top={top}
    left={left}
    width={width}
    height={height}
    items={items}
    mouse={true}
  />
)

export default Scope