import * as sources from './sources'
import * as console from './console'

export const name ='compact'

export const cog = {
  top: 0,
  left: '100%-3',
  width: 2,
  height: 1
}

export const tabs = {
  top: 0,
  left: '5%',
  width: '100%',
  height: 'shrink'
}

export const settings = {
  top: '12%',
  left: '12.5%',
  width: '75%',
  height: '75%'
}

export const controls = {
  left: '100%-10',
  width: 10,
  height: 3,
  top: 0
}

export default {name, sources, console, cog, tabs, settings, controls}