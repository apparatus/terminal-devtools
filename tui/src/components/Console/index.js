import React from 'react'
import {panel} from '../../style'

const Console = ({top='72.5%-1', left, width='100%-1', height='30%'}) => (
  <textarea label='Console'
    class={panel}
    top={top}
    left={left}
    width={width}
    height={height}
    mouse={true}
    source='> '
  />
)

export default Console