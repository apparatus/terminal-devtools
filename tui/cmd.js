#!/usr/bin/env node
var pid = process.argv.slice(2)[0]

require('./')(pid)