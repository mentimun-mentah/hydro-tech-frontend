import { combineReducers } from 'redux'
import authReducer from './auth'
import plantReducer from './plant'
import reportsReducer from './reports' 
import settingUsersReducer from './settingUsers'

const reducers = {
  auth: authReducer,
  plant: plantReducer,
  reports: reportsReducer,
  settingUsers: settingUsersReducer
}

export default combineReducers(reducers)
