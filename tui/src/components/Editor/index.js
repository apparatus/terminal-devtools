import React from 'react'
import * as style from '../../style'

const Editor = ({source, top, left, width, height, focused}) => (
  <textarea
    class={style.panel}
    left={left}
    width={width}
    top={top}
    height={height}
    inputOnFocus={true}
    value={source}
    onFocus={()=>console.log('ED FOCUSED')}
  />
)

export default Editor