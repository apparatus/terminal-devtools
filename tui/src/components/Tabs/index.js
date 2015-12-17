import React from 'react'
import {panel} from '../../style'

const Tabs = ({items, top, left='5%', width='100%', height='shrink'}) => (
  <listbar 
    top={top}
    left={left}
    width={width}
    height={height}
    autoCommandKeys={true}
    items={items}
    mouse={true}
  />
)

export default Tabs
