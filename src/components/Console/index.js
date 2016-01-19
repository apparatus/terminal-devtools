import React from 'react'
import functional from 'react-functional'
import * as style from '../../style'

/* eslint-disable react/no-unknown-property */

const Console = ({top, left, width, height, focused, independent, tooltips, output, actions}, cmp) => {
  return (
    <textarea
      ref={el => {
        cmp.el = el
        // hack :(
        if (el && independent && focused) cmp.el.focus()
      }}
      mouse
      label='Console'
      inputOnFocus
      focused={focused}
      class={[style.panel, focused && style.selected]}
      top={top}
      left={left}
      width={width}
      height={height}
      hoverText={actions && tooltips && 'ctrl+k'}
      value={
        !(cmp && cmp.force) ?
          (output.all + '> ' + (
            output.historyIndex ? 
              output.history.slice(output.historyIndex).shift() : 
              ''
          )) : 
          cmp.force()
      }
      onFocus={() => (independent || focused || actions.focusPanel('console'))}
      onKeyTab={() => {
        if (independent) {
          actions.focusTab('sources')
          actions.focusPanel('console')
          return
        }
        cmp.el._done()
        actions.focusPanel('navigator')
      }}
      onKeyUp={() => {
        actions.consoleHistory({step: -1})
      }}
      onKeyDown={() => {
        actions.consoleHistory({step: 1})
      }}
      onKeyBackspace={(ch, key) => {
        if (cmp.el.value.substr(-2) === '\n>') {
          const val = cmp.el.value
          cmp.force = () => { cmp.force = null; return val + ' ' }
          cmp.forceUpdate()
        }
      }}
      onKeypress={(ch, key) => {
        if (key.name === 'return' && !key.shift) {
          const lines = cmp.el.getLines()
          const cmd = (lines[lines.length - 2]+'').substr(2)
          actions.consoleInput(cmd)
          return
        }
        if (independent) {
          if (key.name === 'escape') {
            // hack :( - avoids intermittent crashing
            setTimeout(() => {
              actions.focusTab('sources')
              actions.focusPanel('console')
            })
          }
        }
      }}
    />
  )
}

export default functional(Console)
