import React from 'react'
import * as style from '../../style'

const stat =  {
  border: {
    type: 'bg'
  },
  style: {
    transparent: true,
  }
}

const Settings = ({top, left, width, height, align, padding}) => (
  <box
    class={[style.panel, stat]}
    left={left}
    width={width}
    top={top}
    height={height}
    align={align}
    padding={padding}
  >settings</box>
)


export default Settings