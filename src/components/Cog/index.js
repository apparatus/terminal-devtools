import React from 'react'
import * as style from '../../style'

const Cog = ({active, file, top, left, width, height, align, padding, onClick}) => (
  <button
    mouse={true}
    left={left}
    width={width}
    top={top}
    height={height}
    align={align}
    padding={padding}
    onClick={onClick}
  >{active ? '⚒' : '⚙'}</button>
)

export default Cog