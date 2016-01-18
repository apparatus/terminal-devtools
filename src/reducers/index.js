import {basename, sep} from 'path'

import {
  FOCUS_TAB,
  FOCUS_PANEL,
  RECEIVE_CALLSTACK,
  RECEIVE_BREAKPOINTS,
  CLEAR_SCOPE,
  RECEIVE_SCOPE,
  EXTEND_SCOPE,
  SET_SCOPE_ITEM,
  ADD_ITEM_TO_SCOPE,
  RECEIVE_SOURCE,
  RECEIVE_SOURCES,
  SELECT_FILE,
  SET_FILE_ITEM,
  SET_EDITOR_LINE,
  SELECT_FRAME,
  PAUSE,
  RESUME,
  SET_DIMENSIONS,
  TOGGLE_TOOLTIPS,
  RECEIVE_STDOUT,
  RECEIVE_STDERR,
  CONSOLE_INPUT,
  CONSOLE_HISTORY,
  RECEIVE_EVAL_RESULT,
  RECEIVE_EVAL_ERROR
} from '../actions'

const CONSOLE_PREFIXES = {
  [CONSOLE_INPUT]: '> ',
  [RECEIVE_EVAL_RESULT]: '⦑ ',
  [RECEIVE_EVAL_ERROR]: '⨂ ',
  [RECEIVE_STDERR]: '⨂ ',
  [RECEIVE_STDOUT]: '  '
}

export function tab (state = 'sources', {type, payload}) {
  if (type !== FOCUS_TAB) return state
  return (payload + '').toLowerCase()
}

export function panel (state = 'console', {type, payload}) {
  if (type !== FOCUS_PANEL) return state
  return payload
}

export function sources (state = [], {type, payload}) {
  if (type !== RECEIVE_SOURCES) return state
  return payload
}

export function files (state = [], {type, payload}) {
  if (type !== RECEIVE_SOURCES) return state
  const sources = payload.map(s => s.name)

  const nonNative = sources.filter(s => s && s[0] === sep)
    .reduce((o, path) => {
      let next = o
      path.split(sep).filter(Boolean).forEach((segment, ix, arr) => {
        next[segment] = {value: {}}

        if (ix === arr.length - 1) {
          next[segment].data = {path}
          next[segment].options = {terminate: true}
        }
        next = next[segment].value
      })
      return o
    }, {})

  const native = {
    '(core)': {
      value: sources
        .filter(s => s && s[0] !== sep)
        .reduce((o, f) => {
          o[f] = {
            value: {},
            options: {terminate: true},
            data: {path: f}
          }
          return o
        }, {})
    }
  }

  return {...native, ...nonNative}
}

export function file (state = '', {type, payload}) {
  if (type !== SELECT_FILE) return state
  return payload
}

export function fileItem (state = null, {type, payload = state}) {
  if (type !== SET_FILE_ITEM) return state
  return payload
}

export function scopeItem (state = null, {type, payload = state}) {
  if (type !== SET_SCOPE_ITEM) return state
  return payload
}

export function editorLine (state = 0, {type, payload}) {
  if (type !== SET_EDITOR_LINE) return state
  return payload
}

export function callstack (state = [], {type, payload = []}) {
  if (type !== RECEIVE_CALLSTACK) return state
  return payload.map(({
      functionName,
      location: {lineNumber: l, columnNumber: c, url}
    }) => (
      (functionName || '(anonymous function)') + ' ' + basename(url) + ':' + l + ':' + c
    )
  )
}

export function frames (state = [], {type, payload = []}) {
  if (type !== RECEIVE_CALLSTACK) return state
  return payload
}

export function frame (state = {}, {type, payload}) {
  if (type !== SELECT_FRAME) return state
  return payload
}

export function breaks (state = [], {type, payload}) {
  if (type !== RECEIVE_BREAKPOINTS) return state
  return payload
}

export function breakpoints (state = [], {type, payload}) {
  if (type !== RECEIVE_BREAKPOINTS) return state
  return payload.map(({script_name: name, line}) => basename(name) + ':' + line)
}

export function scope (state = {}, {type, payload: {area, scope, branch, namespace} = {}}) {
  if (type === CLEAR_SCOPE) return {}

  if (type === RECEIVE_SCOPE) {
    return {
      ...state,
      [area]: {
        options: {labelling: false},
        value: treeify(scope)
      }
    }
  }

  if (type === EXTEND_SCOPE) {
    // branch is still ref'd in state, altering the branch updates
    // the state, but we want want to return a new state object to
    // observe the rule of immutability. If this every breaks (due to branch
    // being a copy instead of a direct ref, then we'd need to do a deep find
    // on the state to locate the branch - along with that we'd need to add uids
    // to every branch))
    branch.value = treeify(scope)
    return {...state}
  }

  if (type === ADD_ITEM_TO_SCOPE) {
    state[area].value = {
      [namespace]: Object(scope) === scope
        ? {
          label: 'Object',
          value: !scope.length
            ? {'« empty »': {options: {labelling: false}}}
            : treeify(scope)
        }
        : {value: scope},
      ...state[area].value
    }

    return {...state}
  }

  return state
}

export function source (state = {}, {type, payload}) {
  if (type !== RECEIVE_SOURCE) return state
  return payload
}

export function paused (state = false, {type}) {
  if (type !== RESUME && type !== PAUSE) return state
  return type === PAUSE
}

export function layout (state = {}, {type, payload}) {
  if (type !== SET_DIMENSIONS) return state
  return payload
}

export function tooltips (state = true, {type}) {
  if (type !== TOGGLE_TOOLTIPS) return state
  return !state
}

export function output (state = {out: '', err: '', all: ''}, {type, payload}) {
  console.log('type', type)
  if (type === CONSOLE_HISTORY) {

    if (!state.history && !state.history.length) {
      return state
    }

    payload = payload || {step: -1}
    const {step} = payload
    let {historyIndex = 0} = state

    historyIndex += step

    if (historyIndex > 0) historyIndex = 0
    if (-historyIndex > state.history.length) historyIndex = -(state.history.length)

    return {
      ...state,
      historyIndex
    }
  }

  if (type !== RECEIVE_STDOUT && type !== RECEIVE_STDERR &&
    type !== CONSOLE_INPUT && type !== RECEIVE_EVAL_RESULT &&
    type !== RECEIVE_EVAL_ERROR) return state

  const {out, err, all, history = []} = state

  const line = type === RECEIVE_EVAL_RESULT
    ? CONSOLE_PREFIXES[type] + payload + '\n'
    : type === RECEIVE_EVAL_ERROR
      ? '\n' + CONSOLE_PREFIXES[type] + payload + '\n'
      : CONSOLE_PREFIXES[type] + payload

  if (type === CONSOLE_INPUT) { 
    history.push((payload + '').trim())
    state.historyIndex = 0
  }

  return {
    ...state,
    history,
    out: (type === RECEIVE_STDOUT) ? CONSOLE_PREFIXES[type] + out + payload : out,
    err: (type === RECEIVE_STDERR) ? CONSOLE_PREFIXES[type] + err + payload : err,
    all: all + line
  }
}

// utils:

function treeify (scope) {
  return scope.reduce((o, {name, type, value, text, source, className, properties, handle}) => {
    if (type === 'object') { value = className }
    if (className === 'Array') {
      value = 'Array(' + properties.filter(({name}) => !isNaN(name)).length + ')'
    }
    if (type === 'string') {
      value = '\'' + value + '\''
    }
    value = value || source || text
    o[name] = properties
      ? properties.length
        ? {label: value, value: {}, meta: {handle}}
        : {label: value, value: {'« empty »': {options: {labelling: false}}}}
      : {value}

    return o
  }, {})
}
