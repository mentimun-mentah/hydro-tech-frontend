import { combineReducers } from 'redux'
import authReducer from './auth'
import plantReducer from './plant'
import reportsReducer from './reports' 
import settingUsersReducer from './settingUsers'
import blogReducer from './blog'

const reducers = {
  auth: authReducer,
  plant: plantReducer,
  reports: reportsReducer,
  settingUsers: settingUsersReducer,
  blog: blogReducer,
}

export default combineReducers(reducers)
