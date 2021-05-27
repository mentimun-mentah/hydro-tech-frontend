import axios from 'lib/axios'
import * as actionType from './actionTypes'


/* GET BLOG ACTIONS */
const getBlogStart = () => {
  return {
    type: actionType.GET_BLOG_START,
  }
}
export const getBlogSuccess = (payload) => {
  return {
    type: actionType.GET_BLOG_SUCCESS,
    payload: payload,
  }
}
const getBlogFail = (error) => {
  return {
    type: actionType.GET_BLOG_FAIL,
    error: error,
  }
}

export const getBlog = ({ page = 1, per_page = 12, q, order_by = "newest" }) => {
  let queryString = {}
  if(page) queryString["page"] = page
  if(per_page) queryString["per_page"] = per_page
  if(order_by) queryString["order_by"] = order_by

  if(q !== "" && q !== undefined) queryString["q"] = q
  else delete queryString["q"]

  return dispatch => {
    dispatch(getBlogStart())

    axios.get("/blogs/all-blogs", { params: queryString })
      .then(res => {
        dispatch(getBlogSuccess(res.data))
      })
      .catch(err => {
        dispatch(getBlogFail(err.response))
      })
  }
}
