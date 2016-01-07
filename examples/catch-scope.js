// run with node --debug-brk

try {
  throw Error(':)')
} catch (e) {
  debugger
  console.log('e', e.stack)
}