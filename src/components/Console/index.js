import React from 'react'
import * as style from '../../style'

const Console = ({top, left, width, height, focused, actions: {focusPanel}}) => (
  <textarea 
    label='Console'
    focused={focused}
    class={[style.panel, focused && style.selected]}
    top={top}
    left={left}
    width={width}
    height={height}
    mouse={true}
    value='> '
    onFocus={() => focused || focusPanel('console')}
  />
)

export default Console