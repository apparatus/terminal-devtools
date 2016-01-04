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

const PauseResume = ({paused, onClick}) => (
  <button 
    onClick={onClick}
    hoverText={'resume (r) '}
  >
    {paused ? '⫸' : '‖'}
  </button>
)

const StepOver = ({enabled, onClick}) => (
  <button 
    {...(enabled ? enable : disable)} 
    onClick={onClick}
    hoverText='step over (n)'
  >
    ⤼
  </button>
)

const StepInto = ({enabled, onClick}) => (
  <button 
    {...(enabled ? enable : disable)} 
    onClick={onClick}
    hoverText='step into (i)'
  >
    ⤈
  </button>
)

const StepOut = ({enabled, onClick}) => (
  <button 
    {...(enabled ? enable : disable)} 
    onClick={onClick}
    hoverText='step out (o)'
  >
    ⤉
  </button>  
)
 
const BreakPointsActive = ({active, onClick}) => (
  <button 
    onClick={onClick}
    hoverText={`${active ? '' : 'de'}activate breakpoints (p)`}
  > 
    {active ? '⤇' : '⤃'}
  </button>
)

const UncaughtExceptions = ({onClick}) => (
  <button 
    onClick={onClick}
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
    <PauseResume paused={paused} onClick={pauseResume}/>
    <StepOver enabled={paused} onClick={stepOver}/> 
    <StepInto enabled={paused} onClick={stepInto}/>
    <StepOut enabled={paused} onClick={stepOut}/>
    <BreakPointsActive active={areBreakpointsActive} onClick={breakpointsActive}/>
    <UncaughtExceptions onClick={uncaughtExceptions}/>
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