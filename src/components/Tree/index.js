import React from 'react'
import functional from 'react-functional'

/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

const noop = () => {}

const Tree = (props, cmp) => {
  let selected = 0
  const {
    items: tree, onExpand = noop, onContract = noop,
    onSelect = noop, onSelectItem = noop, item,
    indentation, labelling, selectOverride
  } = props

  let {items, map} = traverse(tree, {indentation, labelling})

  if (item && !cmp.$$forcingUpdate$$) {
    let index = map.indexOf(item)
    if (index < 0) {
      const parent = map.find(function locate (o) {
        let found = o === item && o
        if (!found) {
          found = o.value && Object.values(o.value).find(locate)
        }
        if (found) {
          found.options = found.options || {}
          if (!found.options.expanded) {
            found.options.expanded = true
            found.options.autoexpanded = true
          }
        }
        return found
      })
      if (parent) {
        parent.options = parent.options || {}
        if (!parent.options.expanded) {
          parent.options.expanded = true
          parent.options.autoexpanded = true
        }
      }

      map
        .filter(p => p !== parent)
        .forEach(function reset (o) {
          if (o.options && o.options.expanded && o.options.autoexpanded) {
            delete o.options.autoexpanded
            o.options.expanded = false
            if (o.value) Object.values(o.value).forEach(reset)
          }
        })

      const retrav = traverse(tree, {indentation, labelling})
      map = retrav.map
      items = retrav.items
      if (item.data && item.data.path) {
        index = map.findIndex(o => {
          if (!o.data) return
          return o.data.path === item.data.path
        })
      }
    }

    if (index > -1) {
      selected = index
    }
  }

  if (cmp.$$forcingUpdate$$) {
    selected = cmp.$$index$$
  }

  return (
    <list
      {...props}
      keys
      mouse
      scrollbar
      inputOnFocused
      items={items}
      selected={selected}
      onSelectItem={selectOverride ? onSelectItem : noop}
      onSelect={selectOverride ? onSelect : (c, index) => {
        const {options = {}, value} = map[index]
        if (!map[index].options) map[index].options = options

        if (Object(value) !== value || options.terminate) {
          onSelect(map[index], items[index], index)
          onSelectItem(map[index], items[index], index, c)
          cmp.$$index$$ = index
          cmp.$$forcingUpdate$$ = true
          cmp.forceUpdate()
          cmp.$$forcingUpdate$$ = false
          return
        }

        options.expanded = !options.expanded
        if (options.expanded) onExpand(map[index], items[index], index, c)
        if (!options.expanded) onContract(map[index], items[index], index, c)

        cmp.$$index$$ = index
        cmp.$$forcingUpdate$$ = true
        cmp.forceUpdate()
        cmp.$$forcingUpdate$$ = false
      }}
    />
  )
}

export default functional(Tree)

function pad (depth = 0, indentation = 2) {
  return Array.apply(0, Array((depth + 1) * indentation)).join(' ')
}

function traverse (obj, cfg, depth = 0) {
  if (Array.isArray(obj)) return {items: obj, map: obj}
  const map = []
  let {indentation = 2, labelling = false} = cfg
  const items = Object.keys(obj).reduce((items, key) => {
    const {label, value, options = {}} = obj[key]
    const {expanded, terminate, prefix: itemPrefix = ''} = options

    if ('labelling' in options) { labelling = options.labelling }

    const valueIsObject = Object(value) === value
    const prefix = valueIsObject && !terminate
      ? expanded ? '▾ ' : '▸ '
      : (depth ? '' : '  ')

    const item = pad(depth, indentation) + itemPrefix + (terminate ? ' ' : '') +
      prefix + key + (labelling ? ': ' + (label || value) : '')

    items.push(item)
    map.push(obj[key])

    if (expanded && valueIsObject) {
      const {items: subItems, map: subMap} = traverse(value, cfg, depth + 1)
      items.push(...subItems)
      map.push(...subMap)
    }

    return items
  }, [])

  return {items, map}
}
