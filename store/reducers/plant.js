import * as actionType from 'store/actions/actionTypes'
import { updateObject } from 'lib/utility'

const initialState = {
  plant: [],
  loading: false,
  error: null,
}

/* GET PLANT ACTIONS */
const getPlantStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const getPlantSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    plant: action.payload,
  })
}

const getPlantFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* GET PLANT */
    case actionType.GET_PLANT_START:
      return getPlantStart(state, action)
    case actionType.GET_PLANT_SUCCESS:
      return getPlantSuccess(state, action)
    case actionType.GET_PLANT_FAIL:
      return getPlantFail(state, action)

    default:
      return state
    }
};

export default reducer
