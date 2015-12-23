import {basename} from 'path'

import {
  FOCUS_TAB,
  FOCUS_PANEL,
  RECEIVE_FILES,
  RECEIVE_CALLSTACK,
  RECEIVE_BREAKPOINTS,
  RECEIVE_SCOPE,
  RECEIVE_SOURCE,
  SELECT_FILE,
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

export function files(state = [], {type, payload}) {
  if (type !== RECEIVE_FILES) return state
  return payload
}

export function callstack(state = [], {type, payload}) {
  if (type !== RECEIVE_CALLSTACK) return state
  return payload.map(({
      functionName,
      location: {lineNumber:l, columnNumber:c, url}
    }) => 
        (functionName || '(anonymous function)') + '  ' + 
        basename(url) + ':' + l + ':' + c
      
  )
}

export function frames(state = [], {type, payload}) {
  if (type !== RECEIVE_CALLSTACK) return state
  return payload
}

export function breakpoints(state = [], {type, payload}) {
  if (type !== RECEIVE_BREAKPOINTS) return state
  return payload
}

export function scope(state = [], {type, payload}) {
  if (type !== RECEIVE_SCOPE) return state
  return payload
}

export function source(state = {}, {type, payload}) {
  if (type !== RECEIVE_SOURCE) return state
  return payload
}

export function file(state = '', {type, payload}) {
  if (type !== SELECT_FILE) return state
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

