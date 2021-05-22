import { combineReducers } from 'redux'
import authReducer from './auth'
import plantReducer from './plant'
import settingUsersReducer from './settingUsers'

const reducers = {
  auth: authReducer,
  plant: plantReducer,
  settingUsers: settingUsersReducer
}

export default combineReducers(reducers)
