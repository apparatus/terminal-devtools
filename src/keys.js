import {focusTab, focusPanel, resume, pause, stepOver, stepInto, stepOut} from './actions'

//note: keys.js is for global keys only, component level keys should be declared
//on a per component basis

export default (store, screen) => {
  const {dispatch, getState} = store

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  })

  screen.key(['C-n'], () => dispatch(focusPanel('navigator')))
  screen.key(['C-t'], () => dispatch(focusPanel('editor')))
  screen.key(['C-s'], () => dispatch(focusPanel('callstack')))
  screen.key(['C-p'], () => dispatch(focusPanel('breakpoints')))
  screen.key(['C-o'], () => dispatch(focusPanel('scope')))
  screen.key(['C-k'], () => dispatch(focusPanel('console')))
  screen.key(['?'], () => {
    const {panel} = getState()
    if (panel === 'settings') {
      return dispatch(focusPanel('editor'))
    }
    dispatch(focusPanel('settings'))
  })

  screen.key(['F8', 'C-\\', 'r'], () => dispatch(resume()))
  screen.key(['S-F8', 'C-S-\\', 'p'], () => dispatch(pause()))
  screen.key(['F10', 'C-\'', 'n'], () => dispatch(stepOver()))
  screen.key(['F11', 'C-;', 'i'], () => dispatch(stepInto()))
  screen.key(['S-F11', 'C-S-;', 'o'], () => dispatch(stepOut()))

  screen.key(['tab'], () => {
    const {panel, tab, layout} = getState()
    if (panel === 'settings') return
    const {ordering} = layout[tab]
    let ix = ordering.indexOf(panel) + 1
    if (ix >= ordering.length) ix = 0
    dispatch(focusPanel(ordering[ix]))
  })

  screen.key(['S-tab'], () => {
    const {panel, tab, layout} = getState()
    if (panel === 'settings') return
    const {ordering} = layout[tab]
    let ix = ordering.indexOf(panel) - 1
    if (ix < 0) ix = ordering.length -1
    dispatch(focusPanel(ordering[ix]))
  })

}