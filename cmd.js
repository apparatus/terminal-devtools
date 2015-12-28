#!/usr/bin/env node
var pid = process.argv.slice(2)[0]

require('./')(pid)
  .then(function (o) {
    setTimeout(()=> {
      o.render(o.wrap, o.screen)
    }, 5000)
  })