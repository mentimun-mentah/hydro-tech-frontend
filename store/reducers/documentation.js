import * as actionType from 'store/actions/actionTypes'
import { updateObject } from 'lib/utility'

const initialState = {
  documentation: [],
  loading: false,
  error: null,
}

/* GET DOCUMENTATION ACTIONS */
const getAllDocumentationStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const getAllDocumentationSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    documentation: action.payload,
  })
}

const getAllDocumentationFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* GET DOCUMENTATION */
    case actionType.GET_ALL_DOCUMENTATION_START:
      return getAllDocumentationStart(state, action)
    case actionType.GET_ALL_DOCUMENTATION_SUCCESS:
      return getAllDocumentationSuccess(state, action)
    case actionType.GET_ALL_DOCUMENTATION_FAIL:
      return getAllDocumentationFail(state, action)

    default:
      return state
    }
};

export default reducer
