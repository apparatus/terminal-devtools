import React from 'react'

/* eslint-disable react/no-unknown-property */

const Cog = ({active, file, top, left, width, height, align, padding, onClick}) => (
  <button
    mouse
    left={left}
    width={width}
    top={top}
    height={height}
    align={align}
    padding={padding}
    onClick={onClick}
  >
    {active ? '⚒' : '⚙'}
  </button>
)

export default Cog
