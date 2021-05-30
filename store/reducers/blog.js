import * as actionType from 'store/actions/actionTypes'
import { updateObject } from 'lib/utility'

const initialState = {
  blog: [],
  loading: false,
  error: null,
}

/* GET BLOG ACTIONS */
const getBlogStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const getBlogSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    blog: action.payload,
  })
}

const getBlogFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* GET BLOG */
    case actionType.GET_BLOG_START:
      return getBlogStart(state, action)
    case actionType.GET_BLOG_SUCCESS:
      return getBlogSuccess(state, action)
    case actionType.GET_BLOG_FAIL:
      return getBlogFail(state, action)

    default:
      return state
    }
};

export default reducer
