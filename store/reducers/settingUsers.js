import * as actionType from 'store/actions/actionTypes'
import { updateObject } from 'lib/utility'

const initialState = {
  progressPlant: 0,
  mySetting: {},
  error: null,
}


/* GET SETTING USERS MY SETTING */
const getSettingUsersMySettingStart = (state, _) => {
  return updateObject(state, {
    error: null,
  })
}

const getSettingUsersMySettingSuccess = (state, action) => {
   return updateObject(state, {
    mySetting: action.payload,
  })
}

const getSettingUsersMySettingFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  })
}


/* GET SETTING USERS PROGRESS PLANT */
const getSettingUsersProgressPlantStart = (state, _) => {
  return updateObject(state, {
    error: null,
  })
}

const getSettingUsersProgressPlantSuccess = (state, action) => {
   return updateObject(state, {
    progressPlant: action.payload,
  })
}

const getSettingUsersProgressPlantFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* GET SETTING USERS MY SETTING */
    case actionType.GET_SETTING_USER_MY_SETTING_START:
      return getSettingUsersMySettingStart(state, action)
    case actionType.GET_SETTING_USER_MY_SETTING_SUCCESS:
      return getSettingUsersMySettingSuccess(state, action)
    case actionType.GET_SETTING_USER_MY_SETTING_FAIL:
      return getSettingUsersMySettingFail(state, action)

    /* GET SETTING USERS PROGRESS PLANT */
    case actionType.GET_SETTING_USER_PROGRESS_PLANT_START:
      return getSettingUsersProgressPlantStart(state, action)
    case actionType.GET_SETTING_USER_PROGRESS_PLANT_SUCCESS:
      return getSettingUsersProgressPlantSuccess(state, action)
    case actionType.GET_SETTING_USER_PROGRESS_PLANT_FAIL:
      return getSettingUsersProgressPlantFail(state, action)

    default:
      return state
    }
};

export default reducer
