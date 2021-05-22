import axios from 'lib/axios'
import * as actionType from './actionTypes'


/* GET SETTING USERS MY SETTING ACTIONS */
const getSettingUsersMySettingStart = () => {
  return {
    type: actionType.GET_SETTING_USER_MY_SETTING_START,
  }
}
export const getSettingUsersMySettingSuccess = (payload) => {
  return {
    type: actionType.GET_SETTING_USER_MY_SETTING_SUCCESS,
    payload: payload,
  }
}
const getSettingUsersMySettingFail = (error) => {
  return {
    type: actionType.GET_SETTING_USER_MY_SETTING_FAIL,
    error: error,
  }
}


/* GET SETTING USERS PROGRESS PLANT ACTIONS */
const getSettingUsersProgressPlantStart = () => {
  return {
    type: actionType.GET_SETTING_USER_PROGRESS_PLANT_START,
  }
}
export const getSettingUsersProgressPlantSuccess = (payload) => {
  return {
    type: actionType.GET_SETTING_USER_PROGRESS_PLANT_SUCCESS,
    payload: payload,
  }
}
const getSettingUsersProgressPlantFail = (error) => {
  return {
    type: actionType.GET_SETTING_USER_PROGRESS_PLANT_FAIL,
    error: error,
  }
}


export const getSettingUsersMySetting = () => {
  return dispatch => {
    dispatch(getSettingUsersMySettingStart())
    axios.get("/setting-users/my-setting")
      .then(res => {
        dispatch(getSettingUsersMySettingSuccess(res.data))
      })
      .catch(err => {
        dispatch(getSettingUsersMySettingFail(err.response))
      })
  }
}


export const getSettingUsersProgressPlant = () => {
  return dispatch => {
    dispatch(getSettingUsersProgressPlantStart())
    axios.get("/setting-users/progress-plant")
      .then(res => {
        dispatch(getSettingUsersProgressPlantSuccess(res.data))
      })
      .catch(err => {
        dispatch(getSettingUsersProgressPlantFail(err.response))
      })
  }
}
