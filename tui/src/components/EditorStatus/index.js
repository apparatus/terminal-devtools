import React from 'react'
import * as style from '../../style'

const stat =  {
  style: {
    transparent: true,
  }
}

const EditorStatus = ({line, file, top, left, width, height, align, padding}) => (
  <box
    class={[style.panel, stat]}
    left={left}
    width={width}
    top={top}
    height={height}
    align={align}
    padding={padding}
  >{file}:{line} </box>
)


export default EditorStatus