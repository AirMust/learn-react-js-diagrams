import { combineReducers } from 'redux'
import { langReducers } from './lang.reducers'
import { modelReducer } from './model.reducers'

export const rootReducer = combineReducers({
  lang: langReducers,
  model: modelReducer,
})
