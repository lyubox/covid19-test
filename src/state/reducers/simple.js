import { editState } from '../common'

const reducer = entity => (state, action) => {
  const { type, payload } = action

  const edit = editState(state)

  const actions = {
    request: () => edit({ fetching: true }),
    'success': () => edit({
      [entity]: payload,
      fetching: false,
      error: ''
    }),
    failure: () => edit({
      error: payload,
      fetching: false
    })
  }

  const defaultFn = () => state
  const actionFn = actions[type] || defaultFn

  return actionFn()
}

export default reducer