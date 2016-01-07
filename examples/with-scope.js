// run with node --debug-brk
var o = {a: 1}

with (o) {
  debugger
  console.log('a', a)
}
