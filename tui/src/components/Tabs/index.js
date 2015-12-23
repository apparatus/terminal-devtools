import React from 'react'
import * as style from '../../style'
import functional from 'react-functional'
import {focusTab} from '../../actions'

const Tabs = ({items, top, left, width, height, tab, dispatch}) => (
  <listbar
    class={style.list}
    top={top}
    left={left}
    width={width}
    height={height}
    autoCommandKeys={true}
    items={items}
    onSelectTab={
      ({data:{cmd:{text:tab}}}) => dispatch(focusTab(tab))
    }
  />
)

export default Tabs