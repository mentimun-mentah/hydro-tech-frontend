import { combineReducers } from 'redux'
import authReducer from './auth'
import plantReducer from './plant'

const reducers = {
  auth: authReducer,
  plant: plantReducer,
}

export default combineReducers(reducers)
