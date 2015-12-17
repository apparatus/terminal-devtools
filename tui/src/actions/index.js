export const FOCUS_TAB = 'FOCUS_TAB'
export const FOCUS_PANEL = 'FOCUS_PANEL'
export const RECEIVE_FILES = 'RECEIVE_FILES'
export const RECEIVE_CALLSTACK = 'RECEIVE_CALLSTACK'
export const RECEIVE_BREAKPOINTS = 'RECEIVE_BREAKPOINTS'
export const RECEIVE_SCOPE = 'RECEIVE_SCOPE'
export const RECEIVE_SOURCE = 'RECEIVE_SOURCE'

export function focusTab(payload) {
  return {
    type: FOCUS_TAB,
    payload
  }
}
export function focusPanel(payload) {
  return {
    type: FOCUS_PANEL,
    payload
  }
}
export function receiveFiles(payload) {
  return {
    type: RECEIVE_FILES,
    payload
  }
}
export function receiveCallstack(payload) {
  return {
    type: RECEIVE_CALLSTACK,
    payload
  }
}
export function receiveBreakpoints(payload) {
  return {
    type: RECEIVE_BREAKPOINTS,
    payload
  }
}
export function receiveScope(payload) {
  return {
    type: RECEIVE_SCOPE,
    payload
  }
}
export function receiveSource(payload) {
  return {
    type: RECEIVE_SOURCE,
    payload

  }}