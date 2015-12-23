import {debug} from '../'


//User Actions Types:

export const FOCUS_TAB = 'FOCUS_TAB'
export const FOCUS_PANEL = 'FOCUS_PANEL'
export const SELECT_FILE = 'SELECT_FILE'
export const SELECT_FRAME = 'SELECT_FRAME'

//Operational Action Types:

export const RECEIVE_FILES = 'RECEIVE_FILES'
export const RECEIVE_CALLSTACK = 'RECEIVE_CALLSTACK'
export const RECEIVE_BREAKPOINTS = 'RECEIVE_BREAKPOINTS'
export const RECEIVE_SCOPE = 'RECEIVE_SCOPE'
export const RECEIVE_SOURCE = 'RECEIVE_SOURCE'

// Debugger Action Types
export const PAUSE = 'PAUSE'
export const RESUME = 'RESUME'
export const STEP_OVER = 'STEP_OVER'
export const STEP_INTO = 'STEP_INTO'
export const STEP_OUT = 'STEP_OUT'
export const NEXT_FRAME = 'NEXT_FRAME'
export const PREVIOUS_FRAME = 'PREVIOUS_FRAME'

//Configuration Action Types:

export const SET_DIMENSIONS = 'SET_DIMENSIONS'


//User Action Creators:

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
export function selectFile(payload) {
  return {
    type: SELECT_FILE,
    payload
  }
}

export function selectFrame(payload) {
  return {
    type: SELECT_FRAME,
    payload
  }
}

//Operational Action Creators:

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
  }
}

// Debugger Action Creators

export function pause() {
  return dispatch => {
    dispatch({type: PAUSE})
    debug.pause((err, {source, bp: {callFrames: callstack}}) => {
      dispatch(receiveSource(source))
      dispatch(receiveCallstack(callstack))
    })
  }
}

export function resume() {
  return dispatch => {
    dispatch({type: RESUME})
    dispatch(receiveSource(''))
    dispatch(receiveCallstack([]))
    debug.resume(() => {})
  }
}

export function stepOver() {
  return dispatch => {
    dispatch({type: STEP_OVER})
    debug.step((err, {source, bp: {callFrames: callstack}}) => {
      dispatch(receiveSource(source))
      dispatch(receiveCallstack(callstack))
    })
  }
}

export function stepInto(payload) {
  return {
    type: STEP_INTO,
    payload
  }
}

export function stepOut(payload) {
  return {
    type: STEP_OUT,
    payload
  }
}

export function nextFrame(payload) {
  return {
    type: NEXT_FRAME,
    payload
  }
}

export function previousFrame(payload) {
  return {
    type: PREVIOUS_FRAME,
    payload
  }
}

//Configuration Action Creators:

export function setDimensions(payload) {
  return {
    type: SET_DIMENSIONS,
    payload
  }
}