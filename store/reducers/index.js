import { combineReducers } from 'redux'
import authReducer from './auth'
import plantReducer from './plant'
import reportsReducer from './reports' 
import settingUsersReducer from './settingUsers'
import blogReducer from './blog'
import categoryReducer from './category'

const reducers = {
  auth: authReducer,
  plant: plantReducer,
  reports: reportsReducer,
  settingUsers: settingUsersReducer,
  blog: blogReducer,
  categories: categoryReducer,
}

export default combineReducers(reducers)
