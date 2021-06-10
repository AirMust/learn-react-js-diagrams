import { ActionProps, LANG } from '../actions/actions.types'

export const initialStateTheme: 'ru' | 'en' = 'ru'

export const langReducers = (
  state = initialStateTheme,
  action: ActionProps
) => {
  switch (action.type) {
    case LANG.RU: {
      return 'ru'
    }
    case LANG.EN: {
      return 'en'
    }
    default:
      return state
  }
}
