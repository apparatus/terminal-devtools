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
    onSelect={
      (label) =>
        onSelectTab(label,
          label && label.data && label.data.cmd && (label.data.cmd.prefix - 1) || 0
        )
    }
  />
)

export default Tabs
