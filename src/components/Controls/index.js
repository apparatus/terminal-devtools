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

const PauseResume = ({paused, tooltips, onClick}) => (
  <button 
    onClick={onClick}
    hoverText={tooltips && (paused ? 'resume (c) ' : 'pause (c)')}
  >
    {paused ? '⫸' : '‖'}
  </button>
)

const StepOver = ({enabled, tooltips, onClick}) => (
  <button 
    {...(enabled ? enable : disable)} 
    onClick={onClick}
    hoverText={tooltips && 'step over (n)'}
  >
    ⤼
  </button>
)

const StepInto = ({enabled, tooltips, onClick}) => (
  <button 
    {...(enabled ? enable : disable)} 
    onClick={onClick}
    hoverText={tooltips && 'step into (i)'}
  >
    ⤈
  </button>
)

const StepOut = ({enabled, tooltips, onClick}) => (
  <button 
    {...(enabled ? enable : disable)} 
    onClick={onClick}
    hoverText={tooltips && 'step out (o)'}
  >
    ⤉
  </button>  
)
 
const BreakPointsActive = ({active, tooltips, onClick}) => (
  <button 
    onClick={onClick}
    hoverText={tooltips && `${active ? '' : 'de'}activate breakpoints (p)`}
  > 
    {active ? '⤇' : '⤃'}
  </button>
)

const UncaughtExceptions = ({tooltips, onClick}) => (
  <button 
    onClick={onClick}
    hoverText={tooltips && 'break on exception (x)'}
  >
    ⬣
  </button>
)


const Controls = ({
  top, left, width, height, paused, areBreakpointsActive,
  pauseResume, stepOver, stepInto, stepOut, breakpointsActive, 
  uncaughtExceptions, tooltips
}) => (
  <layout
    renderer={renderer}
    left={left}
    width={width}
    top={top}
    height={height}
  >
    <PauseResume paused={paused} onClick={pauseResume} tooltips={tooltips}/>
    <StepOver enabled={paused} onClick={stepOver} tooltips={tooltips}/> 
    <StepInto enabled={paused} onClick={stepInto} tooltips={tooltips}/>
    <StepOut enabled={paused} onClick={stepOut} tooltips={tooltips}/>
    <BreakPointsActive active={areBreakpointsActive} onClick={breakpointsActive} tooltips={tooltips}/>
    <UncaughtExceptions onClick={uncaughtExceptions} tooltips={tooltips}/>
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