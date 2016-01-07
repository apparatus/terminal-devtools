// run with node --debug-brk

var obj = Object.create(null, {
  prop: {
    get: function () {
      return ':)'
    },
    set: function (v) {
      this._val = v
    }
  }
})

console.log(obj)
