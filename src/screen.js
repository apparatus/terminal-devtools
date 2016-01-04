import keys from './keys'
import blessed from 'blessed'

export default store => {
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

  keys(store, screen)

 return screen
}