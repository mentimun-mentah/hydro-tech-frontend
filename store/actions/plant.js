import axios from 'lib/axios'
import * as actionType from './actionTypes'


/* GET PLANT ACTIONS */
const getPlantStart = () => {
  return {
    type: actionType.GET_PLANT_START,
  }
}
export const getPlantSuccess = (payload) => {
  return {
    type: actionType.GET_PLANT_SUCCESS,
    payload: payload,
  }
}
const getPlantFail = (error) => {
  return {
    type: actionType.GET_PLANT_FAIL,
    error: error,
  }
}

export const getPlant = ({ page = 1, per_page = 12, q, difficulty }) => {
  let queryString = {}
  if(page) queryString["page"] = page
  if(per_page) queryString["per_page"] = per_page

  if(q !== "" && q !== undefined) queryString["q"] = q
  else delete queryString["q"]

  if(difficulty !== "" && difficulty !== undefined) queryString["difficulty"] = difficulty
  else delete queryString["difficulty"]

  return dispatch => {
    dispatch(getPlantStart())

    axios.get("/plants/all-plants", { params: queryString })
      .then(res => {
        dispatch(getPlantSuccess(res.data))
      })
      .catch(err => {
        dispatch(getPlantFail(err.response))
      })

  }
}
