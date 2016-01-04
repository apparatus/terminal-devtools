import React from 'react'
import * as style from '../../style'
import functional from 'react-functional'

const bg = {
  style: {
    fg: 'white',
    bg: 'blue',
  }
}

const settings =  {
  border: null,
  padding: {left: 1, right: 1},
  ...bg
}

const help = `
{underline}{bold}Keys{/bold}{/underline}

    {bold}?{/bold} - Settings/help                    {bold}1{/bold} - Sources                          
    {bold}tab{/bold} - next panel                     {bold}2{/bold} - Networking                       
    {bold}shift+tab{/bold} - previous panel           {bold}3{/bold} - Profiling                          
                                         {bold}4{/bold} - Console 

    {bold}n{/bold} - step over ({bold}n{/bold}ext)                 {bold}ctrl+n{/bold} - {bold}n{/bold}avigator
    {bold}i{/bold} - step {bold}i{/bold}nto                        {bold}ctrl+t{/bold} - source {bold}t{/bold}ext
    {bold}o{/bold} - step {bold}o{/bold}ut                         {bold}ctrl+s{/bold} - call{bold}s{/bold}tack
    {bold}c{/bold} - pause/resume ([dis]{bold}c{/bold}ontinue)     {bold}ctrl+p{/bold} - break{bold}p{/bold}oints
    {bold}p{/bold} - [de]activiate break{bold}p{/bold}oints        {bold}ctrl+o{/bold} - sc{bold}o{/bold}pe
    {bold}x{/bold} - break on e{bold}x{/bold}ception               {bold}ctrl+k{/bold} - console ({bold}k{/bold}onsole)

    {underline}Source Panel{/underline}
    {bold}b{/bold} - toggle {bold}b{/bold}reakpoint                
`
const nav = cmp => (ch, {name}) => {
  if (name === 'left') {
    cmp.refs.form.focusPrevious()
  }
  if (name === 'right') {
    cmp.refs.form.focusNext()
  }
}

const Settings = ({layout, focused, top, left, width, height, align, tooltips, padding, toggleTooltips, changeLayout}, cmp) => {

  return (<box
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
          onKeypress={nav(cmp)} 
          onCheck={changeLayout('normal')}
          height={1} 
          width={22} 
          checked={layout.name === 'normal'} 
          text='Normal'   
          class={{...bg}}
        />
        <radiobutton
          onKeypress={nav(cmp)} 
          onCheck={changeLayout('compact')}
          left={22} 
          height={1} 
          width={22} 
          checked={layout.name === 'compact'} 
          text='Compact' 
          class={{...bg}}
        />
        <radiobutton
          onKeypress={nav(cmp)} 
          onCheck={changeLayout('minimal')}
          left={44} 
          height={1} 
          width={22} 
          checked={layout.name === 'minimal'} 
          text='Minimal' 
          class={{...bg}}
        />
      </radioset>
      <box top={5} height={1} tags={true}  class={{...bg}}>
      {'{underline}{bold}General{/bold}{/underline}'}
      </box>
      <checkbox 
        onKeypress={nav(cmp)}
        onCheck={toggleTooltips}
        onUncheck={toggleTooltips}
        top={7}
        height={1}
        width={22} 
        left={4}
        checked={tooltips} 
        mouse={true} 
        text='Tooltips'
        class={{...bg}}
      />
    </form>
    <box top={8} height={18} tags={true}  class={{...bg}}>
    {help}
    </box>
  </box>)
}


export default functional(Settings, {
  componentDidMount: ({focusedInput = 'normal'}, refs) => {
    const {children: layout} = refs.form.children[1]
    const tooltips = refs.form.children[3]

    const selected = layout.find(c => c.text.toLowerCase() === focusedInput) || 
      tooltips.options.text.toLowerCase() === focusedInput && tooltips 

    if (!selected) { return }
    setTimeout(() => selected.focus())
  }
})