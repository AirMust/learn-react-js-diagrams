import { ActionProps, MODEL } from '../actions/actions.types'
import { StoreModelProps } from '../store.types'

export const initialStateTheme: StoreModelProps = {}

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
