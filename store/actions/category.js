import axios from 'lib/axios'
import * as actionType from './actionTypes'


/* GET CATEGORY ACTIONS */
const getCategoryStart = () => {
  return {
    type: actionType.GET_CATEGORY_START,
  }
}
export const getCategorySuccess = (payload) => {
  return {
    type: actionType.GET_CATEGORY_SUCCESS,
    payload: payload,
  }
}
const getCategoryFail = (error) => {
  return {
    type: actionType.GET_CATEGORY_FAIL,
    error: error,
  }
}

export const getCategory = ({ q = "" }) => {
  let queryString = {}
  if(q !== "" && q !== undefined) queryString["q"] = q
  else delete queryString["q"]

  return dispatch => {
    dispatch(getCategoryStart())

    axios.get("/category-docs/all-category-docs", { params: queryString })
      .then(res => {
        console.log(res.data)
        dispatch(getCategorySuccess(res.data))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(getCategoryFail(err.response))
      })
  }
}
