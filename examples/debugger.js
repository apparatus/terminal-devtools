//run devtools <pid> to begin debugging this process and trigger the debugger breakpoints

console.log(process.pid)

setInterval(function () {

  console.log('a')
  debugger;
  console.log('b')
  debugger;
  console.log('c')

}, 100)
