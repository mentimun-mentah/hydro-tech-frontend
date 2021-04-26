import * as actionType from 'store/actions/actionTypes'
import { updateObject } from 'lib/utility'

const initialState = {
  user: null,
  error: null,
  iot_token: null
}

/*
 * GET USER
 */
const getUserStart = (state, _) => {
  return updateObject(state, {
    error: null,
  })
}

const getUserSuccess = (state, action) => {
  return updateObject(state, {
    user: action.payload,
  })
}

const getUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  })
}


/*
 * GET IOT TOKEN
 */
const getIotTokenStart = (state, _) => {
  return updateObject(state, { error: null })
}
const getIotTokenSuccess = (state, action) => {
  return updateObject(state, {
    iot_token: action.payload
  })
}
const getIotTokenFail = (state, action) => {
  return updateObject(state, {
    error: action.error

  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* GET USER */
    case actionType.GET_USER_START:
      return getUserStart(state, action)
    case actionType.GET_USER_SUCCESS:
      return getUserSuccess(state, action)
    case actionType.GET_USER_FAIL:
      return getUserFail(state, action)

    /* GET IOT TOKEN */
    case actionType.GET_IOT_TOKEN_START:
      return getIotTokenStart(state, action)
    case actionType.GET_IOT_TOKEN_SUCCESS:
      return getIotTokenSuccess(state, action)
    case actionType.GET_IOT_TOKEN_FAIL:
      return getIotTokenFail(state, action)

    default:
      return state
    }
};

export default reducer
