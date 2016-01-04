import React from 'react'
import * as style from '../../style'

const Console = ({top, left, width, height, focused, tooltips, actions}) => (
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
    onFocus={() => actions && (focused || actions.focusPanel('console'))}
    hoverText={actions && tooltips && 'ctrl+k'}
  />
)

export default Console