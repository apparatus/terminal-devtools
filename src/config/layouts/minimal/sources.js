//element is outer wrapper for the tab
export const element = {
  top: 1,
  left: 0,
  width: '100%',
  height: '100%-1'  
}

//ordering specifies order of panels
export const ordering = [
  'editor',
  'callstack',
  'breakpoints'
]

export const navigator = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
}

export const editor = {
  top: 0,
  left: 0,
  width: '67.5%',
  height: '100%'
}

export const editorstatus = {
  top: '72.5%-1',
  rightEdgeLeft: '67.5%', //<-- the dynamic width is subtracted from rightEdgeLeft
  // width - width calculated in component
  height: 1
}

export const callstack = {
  top: 0,
  left: '67.5%-1',
  width: '32.5%+1',
  height: '50%+1'
}

export const breakpoints = {
  top: '50%',
  left: '67.5%-1',
  width: '32.5%+1',
  height: '50%'
}

export const scope = {
  top: 0,
  left: 0,
  width: 0,
  height: 0
}

export const console = {
  top: 0,
  left: 0,
  width: 0,
  height: 0
}