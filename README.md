# Terminal Devtools

Terminal based Devtools for Node

![terminal devtools](./demo.gif)

## Status: Pre-release

## Install

```sh
$ npm i -g terminal-devtools
```

## Usage

```sh
$ devtools [--port <port>] [--host <host>]
```

By default `devtools` will connect to the default debugger port (5858)

```sh
$ devtools <pid>
```

When a valid `node` Process ID is passed, `devtools` will send a `SIGUSR2`
signal to the process, putting it into debug mode then connect to port
5858.

## Navigating

* **?** - help and settings
* **c** - **c**ontinue, resume if paused, pause if resumed
* **n** - step **n**ext
* **i** - step **i**into
* **o** - step **out** of
* **b** - set **breakpoint** (must be in code text panel)

* **tab** - move forward between panels
* **shift+tab** - move backward between panels
* **ctrl+n** - **n**avigator
* **ctrl+t** - code **t**ext 
* **ctrl+s** - call**s**tack
* **ctrl+p** - break**p**oints
* **ctrl+o** - sc**o**pe
* **ctrl+k** - console panel
* **2** - select Console tab

* arrow keys and vi keys (hjkl) control selections in panels
* the mouse can also be used to select tabs, panels and items

## Examples

### Zero-config
Put a service into debug mode, break on first line

```sh
$ node --debug-brk examples/simple
```

Connect to default debug port
```sh
$ devtools
```

### Multi-process
If we need to use more than debug port we can specify

Expose debug port as 5859
```sh
$ node --debug-brk=5859 examples/debugger-single-tick
```

Connect to custom debug port
```sh
$ devtools --port 5859
```

### Debug a running process

Start a process as normal, debug mode is completely off

```sh
$ node examples/debugger
3879
```

Process handily outputs PID, pass it to `devtools`

```sh
$ devtools 3879
```

`devtools` puts process into debug mode and connects to debugger.


## Layouts

There are two supported layouts, Normal and Minimal.

The layout can be changed in Settings (`?` or click the ⚙ icon).

In minimal layout, hidden panels can be revealed with their 
`ctrl` based shortcuts (Navigator: ctrl+n, Scope: ctrl+o).


## Contributing

More than welcome

See [devnotes](./devnotes.md)

Any questions, twitter: [@davidmarkclem](https://twitter.com/@davidmarkclem)

## License

MIT



