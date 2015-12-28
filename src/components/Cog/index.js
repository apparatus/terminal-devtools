import React from 'react'
import * as style from '../../style'
import {focusPanel} from '../../actions'

const Cog = ({active, file, top, left, width, height, align, padding, dispatch}) => (
  <button
    mouse={true}
    left={left}
    width={width}
    top={top}
    height={height}
    align={align}
    padding={padding}
    onClick={() => dispatch(focusPanel('settings'))}
  >{active ? '⚒' : '⚙'}</button>
)


export default Cog