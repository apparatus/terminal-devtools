import React from 'react'
import * as style from '../../style'

const btn = {
  input: true,
  keyable: true,
  clickable: true,
  mouse: true,
  keys: true,
  vi: true,
}

const enable = {
  class: {
    style: {
      fg: 'white'
    }
  }
}

const disable = {
  class: {
    style: {
      fg: 'blue'
    }
  }
}

const PauseResume = ({paused, onPress}) => (
  <button 
    onPress={onPress}
    hoverText='resume (r)'
  >
    {paused ? '⫸' : '‖'}
  </button>
)

const StepOver = ({enabled, onPress}) => (
  <button 
    {...(enabled ? enable : disable)} 
    onPress={onPress}
    hoverText='step over (n)'
  >
    ⤼
  </button>
)

const StepInto = ({enabled, onPress}) => (
  <button 
    {...(enabled ? enable : disable)} 
    onPress={onPress}
    hoverText='step into (i)'
  >
    ⤈
  </button>
)

const StepOut = ({enabled, onPress}) => (
  <button 
    {...(enabled ? enable : disable)} 
    onPress={onPress}
    hoverText='step into (o)'
  >
    ⤉
  </button>  
)
 
const BreakPointsActive = ({active, onPress}) => (
  <button 
    onPress={onPress}
    hoverText={`${active ? '' : 'de'}activate breakpoints (p)`}
  > 
    {active ? '⤇' : '⤃'}
  </button>
)

const UncaughtExceptions = ({onPress}) => (
  <button 
    onPress={onPress}
    hoverText='break on exception (x)'
  >
    ⬣
  </button>
)


const Controls = ({
  top, left, width, height, paused, areBreakpointsActive,
  pauseResume, stepOver, stepInto, stepOut, breakpointsActive, 
  uncaughtExceptions
}) => (
  <layout
    renderer={renderer}
    left={left}
    width={width}
    top={top}
    height={height}
  >
    <PauseResume paused={paused} onPress={pauseResume}/>
    <StepOver enabled={paused} onPress={stepOver}/> 
    <StepInto enabled={paused} onPress={stepInto}/>
    <StepOut enabled={paused} onPress={stepOut}/>
    <BreakPointsActive active={areBreakpointsActive} onPress={breakpointsActive}/>
    <UncaughtExceptions onPress={uncaughtExceptions}/>
  </layout>
)


function renderer({xl, xi, yl, yi}) {
  const width = xl - xi
  const height = yl - yi
  return (el, i) => {
    el.shrink = true
    const last = this.getLastCoords(i)
    if (!last) {
      el.position.left = 0
      el.position.top = 0
      return
    } 
    el.position.left = last.xl - xi + 2
  }
}

export default Controls