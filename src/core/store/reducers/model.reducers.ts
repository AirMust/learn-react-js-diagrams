import { ActionProps, MODEL } from '../actions/actions.types'

export const initialStateTheme: any = null

export const modelReducer = (
  state = initialStateTheme,
  action: ActionProps
) => {
  switch (action.type) {
    case MODEL.SET: {
      return { ...state, ...action.payload }
    }
    default:
      return state
  }
}
