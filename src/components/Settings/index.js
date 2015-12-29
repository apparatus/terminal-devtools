import React from 'react'
import * as style from '../../style'
import {focusPanel, setDimensions} from '../../actions'
import layouts from '../../config/layouts'
import functional from 'react-functional'

const bg = {
  style: {
    fg: 'white',
    bg: 'blue',
  }
}

const settings =  {
  border: {
    type: 'bg'
  },
  padding: {left: 1, right: 1},
  ...bg
}

const help = `
{underline}{bold}Keys{/bold}{/underline}

    {bold}1{/bold} - Sources                          {bold}?{/bold} - Settings/Help
    {bold}2{/bold} - Networking                       {bold}tab{/bold} - next panel
    {bold}3{/bold} - Profiling                        {bold}shift+tab{/bold} - previous panel  
    {bold}4{/bold} - Console                            
                                         {bold}ctrl+n{/bold} - {bold}n{/bold}avigator
    {bold}n{/bold} - step over ({bold}n{/bold}ext)                 {bold}ctrl+t{/bold} - {bold}t{/bold}ext editor
    {bold}r{/bold} - {bold}r{/bold}esume                           {bold}ctrl+s{/bold} - call{bold}s{/bold}tack
    {bold}p{/bold} - {bold}p{/bold}ause                            {bold}ctrl+p{/bold} - break{bold}p{/bold}oints
    {bold}b{/bold} - toggle {bold}b{/bold}reakpoint                {bold}ctrl+o{/bold} - sc{bold}o{/bold}pe
`

const hideWhen = dispatch => (ch, key) => {
  if (ch === '?') { dispatch(focusPanel('editor')) }
}

const changeLayout = (to, dispatch) => () => {
  //hack - react-blessed and/or blessed currently 
  //doesn't do well with multiple rendering changes 
  //in the same event loop
  setImmediate(() => {
    dispatch(focusPanel('editor'))
    setImmediate(() => {
      dispatch(setDimensions(layouts[to]))
      dispatch(focusPanel('settings'))
    })
  })  
}

const Settings = ({layout, focused, top, left, width, height, align, padding, dispatch}, cmp) => (
  <box
    keys={true}
    mouse={true}
    clickable={true}
    draggable={true}
    index={20}
    class={[style.panel, settings]}
    left={left}
    width={width}
    top={top}
    height={height}
    align={align}
    padding={padding}
  >
    <form
      ref='form'
      focused={focused}
      inputOnFocused={true}
      mouse={true}
      keys={true}
      class={{...bg}}
      onKeypress={hideWhen(dispatch)}
    >
      <box tags={true} top={1} class={{...bg}}>
        {'{underline}{bold}Layout{/bold}{/underline}'}
      </box>
      <radioset 
        mouse={true} 
        keys={true}  
        height={9} 
        top={3} 
        class={{...bg, padding: {left: 4}}}
      >
        <radiobutton
          onKeypress={(ch, {name}) => {
            if (name === 'right') {
              cmp.refs.form.focusNext()
            }
            hideWhen(dispatch)(ch)
          }} 
          onCheck={changeLayout('normal', dispatch)}
          height={1} 
          width={22} 
          checked={layout.name === 'normal'} 
          text='Normal'   
          class={{...bg}}
        />
        <radiobutton
          onKeypress={(ch, {name}) => {
            if (name === 'left') {
              cmp.refs.form.focusPrevious()
            }
            if (name === 'right') {
              cmp.refs.form.focusNext()
            }
            hideWhen(dispatch)(ch)
          }} 
          onCheck={changeLayout('compact', dispatch)}
          left={22} 
          height={1} 
          width={22} 
          checked={layout.name === 'compact'} 
          text='Compact' 
          class={{...bg}}
        />
        <radiobutton
          onKeypress={(ch, {name}) => {
            if (name === 'left') {
              cmp.refs.form.focusPrevious()
            }
            hideWhen(dispatch)(ch)
          }} 
          onCheck={changeLayout('minimal', dispatch)}
          left={44} 
          height={1} 
          width={22} 
          checked={layout.name === 'minimal'} 
          text='Minimal' 
          class={{...bg}}
        />
      </radioset>
    </form>
    <box top={9} height={10} tags={true}  class={{...bg}}>
    {help}
    </box>
  </box>
)


export default functional(Settings, {
  componentDidMount: (props, refs) => {
    //workaround
    const selected = refs.form.children[1].children.find(c => c.checked)
    setTimeout(() => selected.focus())
  }
})