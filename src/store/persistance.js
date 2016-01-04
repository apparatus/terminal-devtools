import fs from 'fs'

export default function persistance (to) {
  const exists = fs.existsSync(to)
  if (!exists) { fs.writeFileSync(to, '{}') }
  let data

  try {
    data = !exists ? {} : JSON.parse(fs.readFileSync(to))
  } catch (e) {
    data = {}
  }

  return cfg => {
    const actionTypes = Object.keys(cfg)
    const namespaces = Object.values(cfg)

    return ({dispatch, getState}) => next => action => {
      const result = next(action)
      const index = actionTypes.indexOf(action.type)

      if (~index) {
        const state = getState()
        let ns = namespaces[index]

        if (Object(ns) === ns) {
          data[ns.namespace] = ns.transform(state[ns.namespace])
          return save(data, to)
        }

        data[ns] = state[ns]
        save(data, to)
      }

      return result
    }
  }
}

function save (data, to) {
  // if necessary, make this function batch and throttle
  return fs.writeFileSync(to, JSON.stringify(data))
}
