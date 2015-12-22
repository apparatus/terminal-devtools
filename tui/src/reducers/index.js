import {
  FOCUS_TAB,
  FOCUS_PANEL,
  RECEIVE_FILES,
  RECEIVE_CALLSTACK,
  RECEIVE_BREAKPOINTS,
  RECEIVE_SCOPE,
  RECEIVE_SOURCE,
  VIEW_FILE,
  SET_DIMENSIONS
} from '../actions'

export function tab(state = 'sources', {type, payload}) {
  if (type !== FOCUS_TAB) return state
  return payload
}

export function panel(state = 'console', {type, payload}) {
  if (type !== FOCUS_PANEL) return state
  return payload
}

export function files(state = [], {type, payload}) {
  if (type !== RECEIVE_FILES) return state
  return state
}

export function callstack(state = [], {type, payload}) {
  if (type !== RECEIVE_CALLSTACK) return state
  return state
}

export function breakpoints(state = [], {type, payload}) {
  if (type !== RECEIVE_BREAKPOINTS) return state
  return state
}

export function scope(state = [], {type, payload}) {
  if (type !== RECEIVE_SCOPE) return state
  return state
}

export function source(state = '', {type, payload}) {
  if (type !== RECEIVE_SOURCE) return state
  return state
}

export function file(state = [], {type, payload}) {
  if (type !== VIEW_FILE) return state
  return state
}

export function layout(state = {}, {type, payload}) {
  if (type !== SET_DIMENSIONS) return state
  return state
}

