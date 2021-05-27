import axios from 'lib/axios'
import * as actionType from './actionTypes'

/* GET DOCUMENTATION ACTIONS */
const getAllDocumentationStart = () => {
  return {
    type: actionType.GET_ALL_DOCUMENTATION_START,
  }
}
export const getAllDocumentationSuccess = (payload) => {
  return {
    type: actionType.GET_ALL_DOCUMENTATION_SUCCESS,
    payload: payload,
  }
}
const getAllDocumentationFail = (error) => {
  return {
    type: actionType.GET_ALL_DOCUMENTATION_FAIL,
    error: error,
  }
}

export const getAllDocumentation = ({ q = "" }) => {
  let queryString = {}
  if(q !== "" && q !== undefined) queryString["q"] = q
  else delete queryString["q"]

  return dispatch => {
    dispatch(getAllDocumentationStart())

    axios.get("/documentations/all-documentations", { params: queryString })
      .then(res => {
        dispatch(getAllDocumentationSuccess(res.data))
      })
      .catch(err => {
        dispatch(getAllDocumentationFail(err.response))
      })
  }
}
