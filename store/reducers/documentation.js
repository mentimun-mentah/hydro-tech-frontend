import _ from 'lodash'
import * as actionType from 'store/actions/actionTypes'
import { updateObject } from 'lib/utility'

const initialState = {
  allDocumentations: [],
  documentation: [],
  docsByName: [],
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
  const copyPayload = [...action.payload]
  let allDocs = copyPayload.map(x => {
    return {
      category_docs_id: x.category_docs_id,
      category_docs_name: x.category_docs_name,
      childs: []
    }
  })

  allDocs = _.uniqBy(allDocs, 'category_docs_id')

  for(let val of copyPayload) {
    for(let doc of allDocs) {
      if(val.category_docs_id === doc.category_docs_id) {
        doc.childs.push(val)
      }
    }
  }

  return updateObject(state, {
    loading: false,
    documentation: action.payload,
    allDocumentations: allDocs
  })
}

const getAllDocumentationFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}


/* GET DOCUMENTATION BY NAME */
const getDocumentationByNameStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}
export const getDocumentationByNameSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    docsByName: action.payload,
  })
}
const getDocumentationByNameFail = (state, action) => {
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

    case actionType.GET_DOCUMENTATION_BY_NAME_START:
      return getDocumentationByNameStart(state, action)
    case actionType.GET_DOCUMENTATION_BY_NAME_SUCCESS:
      return getDocumentationByNameSuccess(state, action)
    case actionType.GET_DOCUMENTATION_BY_NAME_FAIL:
      return getDocumentationByNameFail(state, action)

    default:
      return state
    }
};

export default reducer
