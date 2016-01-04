import React from 'react'
import * as style from '../../style'

/* eslint-disable react/no-unknown-property */

const Tabs = ({items, top, left, width, height, onSelectTab}) => (
  <listbar
    mouse
    autoCommandKeys
    class={style.list}
    top={top}
    left={left}
    width={width}
    height={height}
    items={items}
    onSelectTab={onSelectTab}
  />
)

export default Tabs
