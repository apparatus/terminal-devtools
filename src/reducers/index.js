import {basename} from 'path'

import {
  FOCUS_TAB,
  FOCUS_PANEL,
  RECEIVE_CALLSTACK,
  RECEIVE_BREAKPOINTS,
  RECEIVE_SCOPE,
  RECEIVE_SOURCE,
  RECEIVE_SOURCES,
  SELECT_FILE,
  SET_FILE_INDEX,
  SET_EDITOR_LINE,
  SELECT_FRAME,
  PAUSE,
  RESUME,
  STEP_OVER,
  STEP_INTO,
  STEP_OUT,
  NEXT_FRAME,
  PREVIOUS_FRAME,
  SET_DIMENSIONS
} from '../actions'

export function tab(state = 'sources', {type, payload}) {
  if (type !== FOCUS_TAB) return state
  return (payload + '').toLowerCase()
}

export function panel(state = 'console', {type, payload}) {
  if (type !== FOCUS_PANEL) return state
  return payload
}

export function sources(state = [], {type, payload}) {
  if (type !== RECEIVE_SOURCES) return state
  return payload
}

export function files(state = [], {type, payload}) {
  if (type !== RECEIVE_SOURCES) return state
  const sources = payload.map(s => s.name)
  const nonNative = sources.filter(s => s[0] === '/')
  const native = sources.filter(s => s[0] !== '/')
  return [...nonNative, ...native]
}

export function file(state = '', {type, payload}) {
  if (type !== SELECT_FILE) return state
  return payload
}

export function fileIndex(state = 0, {type, payload}) {
  if (type !== SET_FILE_INDEX) return state
  return payload
}

export function editorLine(state = 0, {type, payload}) {
  if (type !== SET_EDITOR_LINE) return state
  return payload
}

export function callstack(state = [], {type, payload}) {
  if (type !== RECEIVE_CALLSTACK) return state
  return payload.map(({
      functionName,
      location: {lineNumber:l, columnNumber:c, url}
    }) => ( 
      (functionName || '(anonymous function)') + ' ' + basename(url) + ':' + l + ':' + c
    )   
  )
}

export function frames(state = [], {type, payload}) {
  if (type !== RECEIVE_CALLSTACK) return state
  return payload
}

export function frame(state = {}, {type, payload}) {
  if (type !== SELECT_FRAME) return state
  return payload
}


export function breaks(state = [], {type, payload}) {
  if (type !== RECEIVE_BREAKPOINTS) return state
  return payload
}

export function breakpoints(state = [], {type, payload}) {
  if (type !== RECEIVE_BREAKPOINTS) return state
  return payload.map(({script_name:name, line}) => basename(name) + ':' + line)
}

export function scope(state = [], {type, payload}) {
  if (type !== RECEIVE_SCOPE) return state
  return payload
}

export function source(state = {}, {type, payload}) {
  if (type !== RECEIVE_SOURCE) return state
  return payload
}

export function paused(state = true, {type}) {
  if (type !== RESUME || type !== PAUSE) return state
  return type === PAUSE
}

export function layout(state = {}, {type, payload}) {
  if (type !== SET_DIMENSIONS) return state
  return payload
}

