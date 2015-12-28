# Terminal Devtools

Terminal based Devtools for Node

![terminal devtools](./demo.gif)

## Development

See [devnotes](./devnotes.md)

## Experimental - Proof of Concept

Not for human consumption just yet ;)

## Install

```sh
npm i -g terminal-devtools
```

## Usage

```sh
devtools <pid>
```

## Navigating

* Press the **?** key in terminal devtools to see help and settings.
* use tab key to move forward between panels, use shift+tab to move backward
* also
  * ctrl+n - **n**avigator
  * ctrl+t - main **t**ext editor panel
  * ctrl+s - call**s**tack
  * ctrl+p - break**p**oints
  * ctrl+o - sc**o**pe
* keys 1-4 select sources, networking, profiling, console tabs
* press n to step next
* press r to resume
* press p to pause
* in editor press `b` key to toggle break point on selected line
* vi keys supported in editor (e.g. j/k for up/down)