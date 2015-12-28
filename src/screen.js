import {focusTab, focusPanel, resume, pause, stepOver} from './actions'

import blessed from 'blessed'

export default store => {
  const {dispatch, getState} = store
  const screen =  blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Terminal Devtools',
    sendFocus: true,
    dockBorders: true,
    autoPadding: true,
    log: './log',
    // log: '/dev/ttys001',
    ignoreLocked: ['C-c']
  })

  console.log = screen.log.bind(screen)
  console.error = screen.log.bind(screen, 'ERROR: ')

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  })

  screen.key(['C-n'], () => dispatch(focusPanel('navigator')))
  screen.key(['C-t'], () => dispatch(focusPanel('editor')))
  screen.key(['C-s'], () => dispatch(focusPanel('callstack')))
  screen.key(['C-p'], () => dispatch(focusPanel('breakpoints')))
  screen.key(['C-o'], () => dispatch(focusPanel('scope')))
  screen.key(['C-k'], () => dispatch(focusPanel('console')))
  screen.key(['C-k'], () => dispatch(focusPanel('console')))
  screen.key(['?'], () => dispatch(focusPanel('settings')))

  screen.key(['F8', 'C-\\', 'r'], () => dispatch(resume()))
  screen.key(['S-F8', 'C-S-\\', 'p'], () => dispatch(pause()))
  screen.key(['F10', 'C-\'', 'n'], () => dispatch(stepOver()))

  screen.key(['tab'], () => {
    const {panel, tab, layout} = getState()
    const {ordering} = layout[tab]
    let ix = ordering.indexOf(panel) + 1
    if (ix >= ordering.length) ix = 0
    dispatch(focusPanel(ordering[ix]))
  })

  screen.key(['S-tab'], () => {
    const {panel, tab, layout} = getState()
    const {ordering} = layout[tab]
    let ix = ordering.indexOf(panel) - 1
    if (ix < 0) ix = ordering.length -1
    dispatch(focusPanel(ordering[ix]))
  })
  return screen
}