import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { store } from '../store'
import { StoreModelProps, StoreNodeProps, StoreProps } from '../store.types'
import { MODEL } from './actions.types'
import { v4 as uuid } from 'uuid'

export const setModelThunk = (model: StoreModelProps) => ({
  type: MODEL.SET,
  payload: model
})

export const upNodeThunk = (
  node: StoreNodeProps
): ThunkAction<void, StoreProps, unknown, Action<string>> => async dispatch => {
  const { model } = store.getState()
  console.log(node.id, model)
  model[node.id] = { ...node }
  model[node.id].key = uuid()
  dispatch(setModelThunk({ ...model }))
}

export const cpNodeThunk = (): ThunkAction<
  void,
  StoreProps,
  unknown,
  Action<string>
> => async dispatch => {
  const model = store.getState().model as StoreModelProps
  const nodes = Object.values(model);

  nodes.forEach((node) => {
    node.key = uuid();
  })
  dispatch(setModelThunk({ ...model }))
}
