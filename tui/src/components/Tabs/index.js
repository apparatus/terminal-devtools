import React from 'react'
import * as style from '../../style'
import functional from 'react-functional'

const Tabs = ({items, top, left, width, height}) => (
  <listbar 
    top={top}
    left={left}
    width={width}
    height={height}
    autoCommandKeys={true}
    items={items}
  />
)

export default Tabs
