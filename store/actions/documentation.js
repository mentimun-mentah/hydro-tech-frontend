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

/* GET DOCUMENTATION BY NAME ACTIONS */
const getDocumentationByNameStart = () => {
  return {
    type: actionType.GET_DOCUMENTATION_BY_NAME_START,
  }
}
export const getDocumentationByNameSuccess = (payload) => {
  return {
    type: actionType.GET_DOCUMENTATION_BY_NAME_SUCCESS,
    payload: payload
  }
}
const getDocumentationByNameFail = (error) => {
  return {
    type: actionType.GET_DOCUMENTATION_BY_NAME_FAIL,
    error: error
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

export const getDocumentationByName = ({ q = "", limit = 20 }) => {
  let queryString = {}
  queryString["q"] = q
  queryString["limit"] = limit

  return dispatch => {
    dispatch(getDocumentationByNameStart())

    axios.get('/documentations/search-by-name', { params: queryString })
      .then(res => {
        const copyPayload = [...res.data]

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

        dispatch(getDocumentationByNameSuccess(allDocs))
      })
      .catch(err => {
        dispatch(getDocumentationByNameFail(err.response))
      })
  }
}
