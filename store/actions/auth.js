import { jsonHeaderHandler, refreshHeader, signature_exp } from 'lib/axios'

import nookies from 'nookies'
import axios from 'lib/axios'
import * as actionType from './actionTypes'


/* LOGOUT */
const authLogout = () => {
  return {
    type: actionType.AUTH_LOGOUT,
  };
};


/* GET USER ACTIONS */
const getUserStart = () => {
  return {
    type: actionType.GET_USER_START,
  }
}
const getUserSuccess = (user) => {
  return {
    type: actionType.GET_USER_SUCCESS,
    payload: user,
  }
}
const getUserFail = (error) => {
  return {
    type: actionType.GET_USER_FAIL,
    error: error,
  }
}


/* GET IOT TOKEN ACTIONS */
const getIotTokenStart = () => {
  return {
    type: actionType.GET_IOT_TOKEN_START,
  }
}
const getIotTokenSuccess = (token) => {
  return {
    type: actionType.GET_IOT_TOKEN_SUCCESS,
    payload: token,
  }
}
const getIotTokenFail = (error) => {
  return {
    type: actionType.GET_IOT_TOKEN_FAIL,
    error: error,
  }
}


export const getIotToken = () => {
  return (dispatch) => {
    dispatch(getIotTokenStart())
    const cookies = nookies.get()
    if(cookies.iot_token_cookies && cookies.iot_token_cookies !== "null" && cookies.iot_token_cookies !== "undefined") {
      dispatch(getIotTokenSuccess(cookies.iot_token_cookies))
    }
    else {
      dispatch(getIotTokenFail("No token found"))
    }
  }
}


/* GET USER FUNCTION */
export const getUser = () => {
  return (dispatch) => {
    dispatch(getUserStart());
    axios.get("/users/my-user")
      .then(res => {
        if(res.data){
          dispatch(getIotToken())
          dispatch(getUserSuccess(res.data))
        }
        else {
          dispatch(logout())
          dispatch(getUserFail())
          axios.delete("/users/delete-cookies")
        }
      })
      .catch(err => {
        if(err && err.response && err.response.data.detail === signature_exp){
          axios.get("/users/my-user")
            .then(res => {
              if(res.data){
                dispatch(getIotToken())
                dispatch(getUserSuccess(res.data))
              }
              else {
                dispatch(logout())
                dispatch(getUserFail())
                axios.delete("/users/delete-cookies")
              }
            })
            .catch(() => {
              dispatch(logout())
              dispatch(getUserFail())
              axios.delete("/users/delete-cookies")
            })
        }
        else {
          axios.delete("/users/delete-cookies")
          dispatch(getUserFail(err.response))
        }
      })
  };
};



/* LOGOUT FUNCTION */
export const logout = () => {
  return (dispatch) => {
    const cookies = nookies.get();
    const { csrf_access_token, csrf_refresh_token } = cookies;

    const access_revoke = "/users/access-revoke";
    const refresh_revoke = "/users/refresh-revoke";

    dispatch(getUserSuccess({}))

    if (csrf_access_token && csrf_refresh_token) {

      let headerAccessConfig = { headers: { "X-CSRF-TOKEN": csrf_access_token, } };
      let headerRefreshConfig = { headers: { "X-CSRF-TOKEN": csrf_refresh_token, } };

      const req_access_revoke = axios.delete(access_revoke, headerAccessConfig);
      const req_refresh_revoke = axios.delete(refresh_revoke, headerRefreshConfig);

      return Promise.all([req_access_revoke, req_refresh_revoke])
        .then(() => {
          axios.delete("/users/delete-cookies")
        })
        .catch(() => {
          axios.delete("/users/delete-cookies")
          Promise.reject([req_access_revoke, req_refresh_revoke])
        })
        .then(() => {
          axios.delete("/users/delete-cookies")
          dispatch(authLogout())
          // process.browser && Router.reload()
        })
    } 
    else {
      if(csrf_access_token){
        axios.delete(access_revoke, jsonHeaderHandler())
      }
      else if(csrf_refresh_token){
        axios.delete(refresh_revoke, refreshHeader())
      }
      axios.delete("/users/delete-cookies")
      dispatch(authLogout())
      // process.browser && Router.reload()
    }
  };
};
