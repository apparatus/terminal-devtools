//handy for testing async breakpoints
//run with debug-brk

setTimeout(function () { 

  console.log('a')
  console.log('b')

  setTimeout(function () {   
    console.log('c')
    console.log('d')
  }, 1000)

}, 1000)
