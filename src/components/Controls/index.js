import React from 'react'
import * as style from '../../style'

const btn = {
  input: true,
  keyable: true,
  clickable: true,
  mouse: true,
  keys: true,
  vi: true,
  class: {
    style: {
      fg: 'white'
    }
  }
}

const PauseResume = ({paused, onPress}) => (
  <button {...btn} onPress={onPress}>{paused ? '⫸' : '‖'}</button>
)

const StepOver = ({onPress}) => (
  <button {...btn} onPress={onPress}>⤼</button>
)

const StepInto = ({onPress}) => (
  <button {...btn} onPress={onPress}>⤈</button>
)

const StepOut = ({onPress}) => (
  <button {...btn} onPress={onPress}>⤉</button>  
)
 
const BreakPointsActive = ({active, onPress}) => (
  <button {...btn} onPress={onPress}>{active ? '⤃' : '⤇'}</button>
)

const UncaughtExceptions = ({onPress}) => (
  <button {...btn} onPress={onPress}>⬣</button>
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
    <StepOver onPress={stepOver}/> 
    <StepInto onPress={stepInto}/>
    <StepOut onPress={stepOut}/>
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