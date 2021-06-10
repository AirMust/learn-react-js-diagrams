import { MODEL } from './actions.types'

export const setModelThunk = (model: any) => ({
  type: MODEL.SET,
  payload: model
})
