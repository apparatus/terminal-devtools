//element is outer wrapper for the tab
export const element = {
  top: 1,
  left: 0,
  width: '100%',
  height: '100%-1'  
}

//ordering specifies order of panels
export const ordering = [
  'navigator',
  'editor',
  'callstack',
  'breakpoints',
  'scope',
  'console'
]

export const navigator = {
  top: 0,
  left: 0,
  width: '18%',
  height: '75%+1'
}

export const editor = {
  top: 0,
  left: '16%',
  width: '60%',
  height: '75%+1'
}

export const editorstatus = {
  top: '72.5%-1',
  left: '56%',
  width: '21%',
  height: 3,
  align: 'right',
  padding: {right: 1}
}

export const callstack = {
  top: 0,
  left: '75%-1',
  width: '25%+1',
  height: '37%'
}

export const breakpoints = {
  top: '36%-1',
  left: '75%-1',
  width: '25%+1',
  height: '15%+4'
}

export const scope = {
  top: '53%',
  left: '75%-1',
  width: '25%+1',
  height: '20%+2'
}

export const console = {
  top: '72.5%+1',
  left: 0,
  width: '100%-1',
  height: '25%'
}