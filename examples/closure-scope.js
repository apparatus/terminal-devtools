// run with node --debug-brk
// step into (i) each function

function fn() {
  var closedIn = true
  return function () {
    console.log('closedIn', closedIn)
  }
}

var stepInToMe = fn()

stepInToMe() //<-- step in