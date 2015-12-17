import React from 'react'
import {panel} from '../../style'

const BreakPoints = ({items, top='60%-2', left, width='50%', height='17.5%+1'}) => (
  <list 
    label='BreakPoints'
    class={panel}
    top={top}
    left={left}
    width={width}
    height={height}
    items={items}
    mouse={true}
  />
)

export default BreakPoints