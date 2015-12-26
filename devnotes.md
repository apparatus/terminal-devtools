## Logging

console.log and console.error calls go to a log file

In src/index.js when we instantiate the screen, 

```js
  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'Terminal Devtools',
    sendFocus: true,
    dockBorders: true,
    autoPadding: true,
    log: './log', //'/dev/ttys004',
    ignoreLocked: ['C-c']
  })

  console.log = screen.log.bind(screen)
  console.error = screen.log.bind(screen, 'ERROR: ')
```

Notice the comment on the log property, running
`tty` in a terminal will give you it's tty device. 
You can open a new terminal and set `log` to its 
tty file to output logs directly to a secondary terminal.

### State logging

Logger middleware in `store/create.js` is commented out, this
will output every action and corresponding state change to the
log. It's commented out because it's a firehose.

### Protocol Logging

Use `--trace-debug-json` to see debugger API request/response JSON.

```sh
$ node --debug-brk --trace-debug-json somefile.js
```

## `lib/debug`

* refactored from original to es6
* the `debugger-api` module lacks some fundamental functionality
* ~~currently using yadc alongside debugger-api to make raw calls~~
  * `debugger-api` has been swapped out for `yadc`
* v8 protocol documented here: https://chromium.googlesource.com/external/github.com/v8/v8.wiki/+/84541b3cd196e8d5026f6b988d6d0627bd6c4954/debugger_protocol.md


## text editor window

* known issue with scrolling, sticks to bottom 

## Tasks

* highlight breakpoints in editor
* optimize react to blessed rendering life cycle
* debug/log output customization via environment vars
* settings/help dialog when `?` key is pressed 
* support for devtools short cuts (e.g. ctrl+' for step etc.)
* console/repl
* console tab
* scope
* examples/demos
* tests
* fix editor sticking to bottom issue
* improve selection indicator (partial yellow border)
  * maybe paint a border over the top
* panel resizing
  * show/hide navigator
  * show hide callstack column
  * implement "accordian" behaviour for callstack-breakpoints-scope
    * e.g. expand the currently selected and contract the others
* step in
* step out
* pause on uncaught exception / pause on exception
* de-activate/re-activate all breakpoints without removing
* line numbers
* configurable layouts (preferences)
* navigator improvements
  * navigation tree
  * option to hide native
  

## Release plan

* branch master to v2 branch
* on master, carve away incompleted pieces (networking, profiling, console tabs)
  * release as v1
* continue work on v2


## v2 Roadmap

* networking
* profiling

