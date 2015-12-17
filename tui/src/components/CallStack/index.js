import React from 'react'
import {panel} from '../../style'

const CallStack = ({items, top='40%-1', left, width='50%', height='25%'}) => (
  <list
    label='CallStack'
    class={panel}
    top={top}
    width={width}
    height={height}
    items={items}
    mouse={true}
  />
)

export default CallStack