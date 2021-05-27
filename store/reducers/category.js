import * as actionType from 'store/actions/actionTypes'
import { updateObject } from 'lib/utility'

const initialState = {
  categories: [],
  loading: false,
  error: null,
}

/* GET CATEGORY ACTIONS */
const getCategoryStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const getCategorySuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    categories: action.payload,
  })
}

const getCategoryFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* GET CATEGORY */
    case actionType.GET_CATEGORY_START:
      return getCategoryStart(state, action)
    case actionType.GET_CATEGORY_SUCCESS:
      return getCategorySuccess(state, action)
    case actionType.GET_CATEGORY_FAIL:
      return getCategoryFail(state, action)

    default:
      return state
    }
};

export default reducer
