import keys from './keys'
import blessed from 'blessed'

export default store => {
  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Terminal Devtools',
    sendFocus: true,
    dockBorders: true,
    log: './log',
    // log: '/dev/ttys001',
    terminal: 'xterm-256color',
    ignoreLocked: ['C-c']
  })

  console.log = screen.log.bind(screen)
  console.error = screen.log.bind(screen, 'ERROR: ')

  keys(store, screen)

  return screen
}
