## Building

### Single build

```sh
npm run build
```

### Continuous build

```sh
npm run watch
```

This watches the files and rebuilds, but we still have to restart the tui.


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

### Reverse engineering Node Inspector

We can use protocol logging whilst interacting with node inspector to 
see how node inspector performs certain functions - this can be useful
to supplement the protocol docs and bring clarity to implementation details. 

First run node-inspector as a service (important to do this *first*)

```sh
$ node-inspector
```

In another terminal, run node on a file along with debug-brk and trace-debug-json

```sh
$ node --debug-brk --trace-debug-json somefile.js
```

Now open the node inspector url http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858
and start using features. 

Easy way to format the debugger request/response JSON output, copy it then:

```sh
$ npm i -g JSONStream
$ pbpaste | JSONStream | pbcopy
```

## Design principles

* **Every** component is pure - no components handle state, ever (e.g. no `setState`)
  * Each component is a function not a class, life cycle methods can added using [`react-functional`](http://npmjs.com/react-functional) if needed
* Redux is responsible for a central store
* container components hook up redux state to child dumb components
  * container components currently map to tab screens (e.g. the `Sources` container) is composed of all the panels in the sources tab, and likewise passes down relevant state and action methods to the components
* dumb components (e.g. non-containers) should not know anything about the app, they take props output JSX for rendering. 
* If it can't be done declaratively, don't fall back to using `refs` - instead patch and PR against react-blessed so that it is declarative (e.g. <https://github.com/Yomguithereal/react-blessed/pull/40>, <https://github.com/Yomguithereal/react-blessed/pull/36>, <https://github.com/Yomguithereal/react-blessed/pull/38>, <https://github.com/Yomguithereal/react-blessed/pull/37>, <https://github.com/Yomguithereal/react-blessed/pull/35)
* Avoid `refs` if at all possible, only use them for edge cases to control ui behaviour (e.g supporting a keypress on an element that calls a method on another element)

## `lib/debug`

* refactored from original to es6
* the `debugger-api` module lacks some fundamental functionality
* ~~currently using yadc alongside debugger-api to make raw calls~~
  * `debugger-api` has been swapped out for `yadc`
* v8 protocol documented here: https://chromium.googlesource.com/external/github.com/v8/v8.wiki/+/84541b3cd196e8d5026f6b988d6d0627bd6c4954/debugger_protocol.md


## text editor window

* ~~known issue with scrolling, sticks to bottom~~
  * fixed but new issue with scroll jumping depending on various factors



## Tasks

### In Progress

* **scope**
  * currently only displays local scope
    * global, closure, with and catch scopes are implemented at the debug interaction level, we just need to do some ui/ux work/thought to display the different scope areas
  * currently non-interactive
    * e.g. we can't interact with it like a tree and see it's props
    * some work around this is necessary, 
      * need to do a lookup on props when an object is interacted with 
      * need to integrate tree component also to support ui interaction
  * missing advanced features such as
    * `this` context
    * __proto__ lookup
    * prototype lookup
    * getter/setter dynamic lookups
    * none of these are worth implementing until we have ability to explore properties

### Todo

* support for other ports
* highlight breakpoints in editor
* optimize react to blessed rendering life cycle
* debug/log output customization via environment vars
* settings/help dialog when `?` key is pressed 
* support for devtools short cuts (e.g. ctrl+' for step etc.)
* console/repl
* console tab
* examples/demos
* tests
* ~~fix editor sticking to bottom issue~~
  * fixed, but new remaining scroll issue
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

