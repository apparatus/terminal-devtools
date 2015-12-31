import React from 'react'
import * as style from '../../style'
import functional from 'react-functional'

const Tabs = ({items, top, left, width, height, onSelectTab}) => (
  <listbar
    class={style.list}
    top={top}
    left={left}
    width={width}
    height={height}
    autoCommandKeys={true}
    mouse={true}
    items={items}
    onSelectTab={onSelectTab}
  />
)

export default Tabs