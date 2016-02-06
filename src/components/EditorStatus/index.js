import React from 'react'

/* eslint-disable react/no-unknown-property */

const stat = {
  style: {
    transparent: true
  }
}

const EditorStatus = ({line, file, top, rightEdgeLeft, height}) => {
  const status = `${file}:${line.num} `
  const width = status.length - 1
  const lineNumLength = (line.num + '').length
  const left = rightEdgeLeft + '-' + (width + lineNumLength + (lineNumLength < 2 ? 2 : 1))

  return (
    <text
    class={stat}
    left={left}
    width={width}
    top={top}
    height={height}
    >
      {status}
    </text>
  )
}

export default EditorStatus
