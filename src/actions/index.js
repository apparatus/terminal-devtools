import {default as Module} from 'module'
import fs from 'fs'
import createDebugger from '../lib/debug'
const debug = createDebugger()
let dbg

// UI Actions Types:

export const FOCUS_TAB = 'FOCUS_TAB'
export const FOCUS_PANEL = 'FOCUS_PANEL'
export const SELECT_FILE = 'SELECT_FILE'

// Operational Action Types:

export const ERROR = 'ERROR'
export const START_DEBUGGING = 'START_DEBUGGING'
export const RECEIVE_SOURCES = 'RECEIVE_SOURCES'
export const RECEIVE_CALLSTACK = 'RECEIVE_CALLSTACK'
export const RECEIVE_BREAKPOINTS = 'RECEIVE_BREAKPOINTS'
export const CLEAR_SCOPE = 'CLEAR_SCOPE'
export const RECEIVE_SCOPE = 'RECEIVE_SCOPE'
export const EXTEND_SCOPE = 'EXTEND_SCOPE'
export const SET_SCOPE_ITEM = 'SET_SCOPE_ITEM'
export const ADD_ITEM_TO_SCOPE = 'ADD_ITEM_TO_SCOPE'
export const RECEIVE_SOURCE = 'RECEIVE_SOURCE'
export const SET_FILE_ITEM = 'SET_FILE_ITEM'
export const SET_EDITOR_LINE = 'SET_EDITOR_LINE'
export const RECEIVE_STDOUT = 'RECEIVE_STDOUT'
export const RECEIVE_STDERR = 'RECEIVE_STDERR'
export const CONSOLE_INPUT = 'CONSOLE_INPUT'
export const CONSOLE_HISTORY = 'CONSOLE_HISTORY'
export const RECEIVE_EVAL_RESULT = 'RECEIVE_EVAL_RESULT'
export const RECEIVE_EVAL_ERROR = 'RECEIVE_EVAL_ERROR'

// Debugger Action Types
export const PAUSE = 'PAUSE'
export const RESUME = 'RESUME'
export const STEP_OVER = 'STEP_OVER'
export const STEP_INTO = 'STEP_INTO'
export const STEP_OUT = 'STEP_OUT'
export const NEXT_FRAME = 'NEXT_FRAME'
export const PREVIOUS_FRAME = 'PREVIOUS_FRAME'
export const SELECT_FRAME = 'SELECT_FRAME'
export const TOGGLE_BREAKPOINT = 'TOGGLE_BREAKPOINT'

// Configuration Action Types:

export const SET_DIMENSIONS = 'SET_DIMENSIONS'
export const TOGGLE_TOOLTIPS = 'TOGGLE_TOOLTIPS'

const stdoutQueue = []
let lockStdout = false

// User Action Creators:

export function startDebugging ({host, port}) {
  return dispatch => {
    dbg = debug.start({host, port}, (err, callstack) => {
      if (err) {
        return dispatch(error(err))
      }
      dispatch(receiveCallstack(callstack))

      debug.scripts((err, scripts) => {
        if (err) {
          return dispatch(error(err))
        }
        dispatch(receiveSources(scripts))
        if (callstack) {
          dispatch(pause())
          dispatch(selectFrame(0))
          return
        }
        const {name} = (scripts.find(s => s.name && s.name[0] === '/') || scripts[0])
        dispatch(selectFile(name))
      })

      debug.breakpoints((err, {breakpoints}) => {
        if (err) { return console.error(err) }
        dispatch(receiveBreakpoints(breakpoints))
      })
    })

    dbg.on('stdout', line => lockStdout
      ? stdoutQueue.push(line)
      : dispatch({type: RECEIVE_STDOUT, payload: line})
    )
    dbg.on('stderr', line => dispatch({type: RECEIVE_STDERR, payload: line}))
  }
}

export function focusTab (payload) {
  return {
    type: FOCUS_TAB,
    payload
  }
}
export function focusPanel (payload) {

  return (dispatch, getState) => {
    const {layout} = getState()
    if (layout.name === 'minimal') {
      if (payload === 'navigator') {
        layout.sources.navigator.height = layout.sources.navigator.visHeight
        dispatch(setDimensions({...layout}))
      } else if (layout.sources.navigator.height !== 0) {
        layout.sources.navigator.height = 0
        dispatch(setDimensions({...layout}))
      }
      if (payload === 'scope') {
        layout.sources.scope.height = layout.sources.scope.visHeight
        dispatch(setDimensions({...layout}))
      } else if (layout.sources.scope.height !== 0) {
        layout.sources.scope.height = 0
        dispatch(setDimensions({...layout}))
      }
    }

    dispatch({
      type: FOCUS_PANEL,
      payload
    })
  }
}
export function selectFile (payload) {
  return (dispatch, getState) => {
    const {sources, files = {}} = getState()
    if (!sources.length) return
    const payloadIsObject = Object(payload) === payload

    let script = payloadIsObject
      ? sources.find(s => +s.id === +payload.scriptId)
      : sources.find(s => s.name === payload)

    if (!script) {

      if (payloadIsObject || !fs.existsSync(payload)) {
        console.trace('no script', payload)
        return
      }

      script = {
        source: Module.wrap(fs.readFileSync(payload)),
        name: payload
      }

    }

    const {source, name} = script

    dispatch({type: SELECT_FILE, payload: name})

    function locate (f) {
      let found
      for (let o of f) {
        found = (o.data && o.data.path && o.data.path === name)
          ? o
          : locate(Object.values(o.value))
        if (found) break
      }
      return found
    }

    dispatch({type: SET_FILE_ITEM, payload: locate(Object.values(files))})

    if (payloadIsObject) {
      let { lineNumber = 0 } = payload
      dispatch(setEditorLine(lineNumber + 1))
    }

    if (source) {
      dispatch(receiveSource(source))
    }
  }
}

export function setEditorLine (payload) {
  return {
    type: SET_EDITOR_LINE,
    payload
  }
}

export function toggleBreakpoint () {
  return (dispatch, getState) => {
    const {editorLine, file, breaks} = getState()
    dispatch({type: TOGGLE_BREAKPOINT})

    const isSet = breaks.find(({line, script_name: name}) => (name === file && line === editorLine.num))

    if (isSet) {
      debug.clearBreakpoint(isSet.number, (err, result) => {
        if (err) { return error(err) }
        debug.breakpoints((err, {breakpoints}) => {
          if (err) { return error(err) }
          dispatch(receiveBreakpoints(breakpoints))
        })
      })
      return
    }

    // break point is set by index (from 0)
    debug.setBreakpoint({line: editorLine.idx, file}, (err, result) => {
      if (err) { return error(err) }
      debug.breakpoints((err, {breakpoints}) => {
        if (err) { return error(err) }
        dispatch(receiveBreakpoints(breakpoints))
      })
    })
  }
}

export function consoleHistory (payload) {
  return {
    type: CONSOLE_HISTORY,
    payload
  }
}

export function refetchScope() {
  return (dispatch, getState) => {
    const {frame} = getState()
    dispatch(selectFrame(frame ? frame.callFrameId : 0))
  }
}

export function consoleInput (payload) {
  return (dispatch, getState) => {
    const {frames, frame} = getState()
    const expression = payload
    const args = {expression}

    const frameIndex = frame ? frames.findIndex(
      ({callFrameId}) => callFrameId === frame.callFrameId
    ) : -1

    args[(!~frameIndex) ? 'global' : 'frame'] = (!~frameIndex)
      ? true
      : frameIndex

    lockStdout = true

    debug.evaluate(args, (err, out) => {
      if (err) return dispatch(error(err))
      const {res} = out
      if (!res.success) {
        lockStdout = false
        dispatch({type: CONSOLE_INPUT, payload: expression})
        dispatch({type: RECEIVE_EVAL_ERROR, payload: res.message})
        return
      }

      const {className, type, value, text} = res.body

      let output = className
        ? type === 'function'
          ? text
          : className
        : type === 'string'
          ? `'${value}'`
          : value

      if (output === className) {
        // todo - do a lookup to get the object props
        // todo after: present them in a tree like scope?
      }

      let stdout = stdoutQueue.length ? stdoutQueue.join('  ') : ''
      dispatch({type: CONSOLE_INPUT, payload: expression + (stdout ? '' : '\n')})
      if (stdout) {
        dispatch({type: RECEIVE_STDOUT, payload: '\n  ' + stdout})
      }
      dispatch({type: RECEIVE_EVAL_RESULT, payload: output})

      stdoutQueue.length = 0
      lockStdout = false
    })
  }
}

export function selectFrame (payload) {
  return (dispatch, getState) => {
    const {frames} = getState()
    const frameIndex = payload
    const frame = frames[frameIndex]
    const {location} = frame
    dispatch({type: SELECT_FRAME, payload: frame})
    dispatch(selectFile(location))

    debug.scopes(frame, (err, scopes) => {
      if (err) {
        console.error(err)
        return dispatch(error(err))
      }

      const keys = Object.keys(scopes)
      const handles = keys.map(area => scopes[area])

      debug.scope(handles, (err, scopes) => {
        if (err) { dispatch(error(err)) }
        dispatch(clearScope())
        scopes.forEach((scope, ix) => {
          const area = keys[ix]
          dispatch(receiveScope({area, scope: scope.props}))
        })

        // get this object:
        debug.scope(frame.contextHandle, (err, thisScope) => {
          if (err) { return dispatch(error(err)) }
          if (!thisScope) { return }
          // handle edge case - sometimes v8 proto returns context
          // as a function, in these cases the scope should be global
          // (or undefined if strict mode).
          const scope = (thisScope.meta.type === 'function')
            ? getState().scope.global
            : thisScope.props

          dispatch({
            type: ADD_ITEM_TO_SCOPE,
            payload: {
              area: 'local',
              scope,
              namespace: 'this'
            }
          })
        })
      })
    })
  }
}

// Operational Action Creators:

export function error (payload) {
  return {
    type: ERROR,
    payload
  }
}

export function receiveSources (payload) {
  return {
    type: RECEIVE_SOURCES,
    payload
  }
}

export function receiveCallstack (payload) {
  return {
    type: RECEIVE_CALLSTACK,
    payload
  }
}

export function receiveBreakpoints (payload) {
  return {
    type: RECEIVE_BREAKPOINTS,
    payload
  }
}

export function extendScope ({handle, branch}) {
  return dispatch => {
    debug.scope(handle, (err, scope) => {
      if (err) {
        console.error(err)
        return dispatch(error(err))
      }

      dispatch({
        type: EXTEND_SCOPE,
        payload: {scope: scope.props, branch}
      })

      dispatch({
        type: SET_SCOPE_ITEM,
        payload: branch
      })
    })
  }
}

export function clearScope (payload) {
  return {
    type: CLEAR_SCOPE,
    payload
  }
}

export function receiveScope (payload) {
  return {
    type: RECEIVE_SCOPE,
    payload
  }
}

export function receiveSource (payload) {
  return {
    type: RECEIVE_SOURCE,
    payload: (payload + '').split('\n')
  }
}

// Debugger Action Creators

export function pause () {
  return dispatch => {
    dispatch({type: PAUSE})
    debug.pause((err, callstack) => {
      if (err) {
        return dispatch(error(err))
      }
      if (!callstack || !callstack.length) {
        return receiveCallstack([])
      }
      dispatch(receiveCallstack(callstack))
      dispatch(selectFile(callstack[0].location))
    })
  }
}

export function resume () {
  return dispatch => {
    dispatch({type: RESUME})
    dispatch(receiveCallstack([]))
    debug.resume(() => {
      const catchBreak = ({body}) => {
        const {sourceLine: idx, script: {id: scriptId}} = body

        dispatch(selectFile({scriptId, lineNumber: idx}))
        debug.callstack((err, callstack) => {
          if (err) {
            return dispatch(error(err))
          }
          if (!callstack) { return }
          dispatch(receiveCallstack(callstack))
          dispatch(pause())
          dispatch(selectFrame(0))
        })
      }
      dbg.once('break', catchBreak)
    })
  }
}

export function stepOver () {
  return step('Over', STEP_OVER)
}

export function stepInto (payload) {
  return step('Into', STEP_INTO)
}

export function stepOut (payload) {
  return step('Out', STEP_OUT)
}

export function nextFrame (payload) {
  return {
    type: NEXT_FRAME,
    payload
  }
}

export function previousFrame (payload) {
  return {
    type: PREVIOUS_FRAME,
    payload
  }
}

// Configuration Action Creators:

export function setDimensions (payload) {
  return {
    type: SET_DIMENSIONS,
    payload
  }
}

export function toggleTooltips () {
  return {
    type: TOGGLE_TOOLTIPS,
    payload: {}
  }
}

// utils:

function step (act, type) {
  return dispatch => {
    dispatch({type})
    const update = () => { dispatch({type: RESUME}) }

    debug['step' + act]((err, callstack) => {
      if (err) {
        console.error(err)
        return dispatch(error(err))
      }
      if (!callstack || !callstack.length) {
        update()
        return receiveCallstack([])
      }
      dispatch(receiveCallstack(callstack))
      dispatch(selectFrame(0))
    })
  }
}
