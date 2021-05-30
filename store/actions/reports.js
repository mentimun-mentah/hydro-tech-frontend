import { signature_exp } from 'lib/axios'

import axios from 'lib/axios'
import * as actionType from './actionTypes'


/* GET ALL REPORTS */
const getAllReportsStart = () => {
  return {
    type: actionType.GET_ALL_REPORTS_START
  }
}

export const getAllReportsSuccess = payload => {
  return {
    type: actionType.GET_ALL_REPORTS_SUCCESS,
    payload: payload
  }
}

const getAllReportsFail = error => {
  return {
    type: actionType.GET_ALL_REPORTS_FAIL,
    error: error
  }
}
/* GET ALL REPORTS */

/* GET PH CHART REPORT */
const getPhChartReportStart = () => {
  return {
    type: actionType.GET_PH_CHART_REPORT_START
  }
}

export const getPhChartReportSuccess = payload => {
  return {
    type: actionType.GET_PH_CHART_REPORT_SUCCESS,
    payload: payload
  }
}

const getPhChartReportFail = error => {
  return {
    type: actionType.GET_PH_CHART_REPORT_FAIL,
    error: error
  }
}
/* GET PH CHART REPORT */

/* GET TDS CHART REPORT */
const getTdsChartReportStart = () => {
  return {
    type: actionType.GET_TDS_CHART_REPORT_START
  }
}

export const getTdsChartReportSuccess = payload => {
  return {
    type: actionType.GET_TDS_CHART_REPORT_SUCCESS,
    payload: payload
  }
}

const getTdsChartReportFail = error => {
  return {
    type: actionType.GET_TDS_CHART_REPORT_FAIL,
    error: error
  }
}
/* GET PH CHART REPORT */

/* GET GROWTH PLANT CHART REPORT */
const getGrowthPlantChartReportStart = () => {
  return {
    type: actionType.GET_GROWTH_PLANT_CHART_REPORT_START
  }
}

export const getGrowthPlantChartReportSuccess = payload => {
  return {
    type: actionType.GET_GROWTH_PLANT_CHART_REPORT_SUCCESS,
    payload: payload
  }
}

const getGrowthPlantChartReportFail = error => {
  return {
    type: actionType.GET_GROWTH_PLANT_CHART_REPORT_FAIL,
    error: error
  }
}
/* GET GROWTH PLANT CHART REPORT */

/* GET ALERT REPORT */
const getAlertReportStart = () => {
  return {
    type: actionType.GET_ALERT_REPORT_START
  }
}

export const getAlertReportSuccess = payload => {
  return {
    type: actionType.GET_ALERT_REPORT_SUCCESS,
    payload: payload
  }
}

const getAlertReportFail = error => {
  return {
    type: actionType.GET_ALERT_REPORT_FAIL,
    error: error
  }
}
/* GET ALERT REPORT */



/* GET ALL REPORTS FUNCTION */
export const getAllReports = ({ order_by = "today" }) => {
  let queryString = {}
  if(order_by) queryString["order_by"] = order_by
  return dispatch => {
    dispatch(getAllReportsStart())
    axios.get('/reports/all-reports', { params: queryString })
      .then(res => {
        dispatch(getAllReportsSuccess(res.data))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp) {
          axios.get('/reports/all-reports', { params: queryString })
            .then(res => {
              dispatch(getAllReportsSuccess(res.data))
            })
            .catch(err => {
              dispatch(getAllReportsFail(err.response))
            })
        }
        else {
          dispatch(getAllReportsFail(err.response))
        }
      })
  }
}
/* GET ALL REPORTS FUNCTION */

/* GET PH CHART REPORT FUNCTION */
export const getPhChartReport = ({ order_by = "7day" }) => {
  let queryString = {}
  if(order_by) queryString["order_by"] = order_by
  return dispatch => {
    dispatch(getPhChartReportStart())
    axios.get('/reports/ph-chart-report', { params: queryString })
      .then(res => {
        dispatch(getPhChartReportSuccess(res.data))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp) {
          axios.get('/reports/ph-chart-report', { params: queryString })
            .then(res => {
              dispatch(getPhChartReportSuccess(res.data))
            })
            .catch(err => {
              dispatch(getPhChartReportFail(err.response))
            })
        }
        else {
          dispatch(getPhChartReportFail(err.response))
        }
      })
  }
}
/* GET PH CHART REPORT FUNCTION */

/* GET TDS CHART REPORT FUNCTION */
export const getTdsChartReport = ({ order_by = "7day" }) => {
  let queryString = {}
  if(order_by) queryString["order_by"] = order_by
  return dispatch => {
    dispatch(getTdsChartReportStart())
    axios.get('/reports/tds-chart-report', { params: queryString })
      .then(res => {
        dispatch(getTdsChartReportSuccess(res.data))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp) {
          axios.get('/reports/tds-chart-report', { params: queryString })
            .then(res => {
              dispatch(getTdsChartReportSuccess(res.data))
            })
            .catch(err => {
              dispatch(getTdsChartReportFail(err.response))
            })
        }
        else {
          dispatch(getTdsChartReportFail(err.response))
        }
      })
  }
}
/* GET TDS CHART REPORT FUNCTION */

/* GET GROWTH PLANT CHART REPORT FUNCTION */
export const getGrowthPlantChartReport = ({ order_by = "7day" }) => {
  let queryString = {}
  if(order_by) queryString["order_by"] = order_by
  return dispatch => {
    dispatch(getGrowthPlantChartReportStart())
    axios.get('/reports/growth-plant-chart-report', { params: queryString })
      .then(res => {
        dispatch(getGrowthPlantChartReportSuccess(res.data))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp) {
          axios.get('/reports/growth-plant-chart-report', { params: queryString })
            .then(res => {
              dispatch(getGrowthPlantChartReportSuccess(res.data))
            })
            .catch(err => {
              dispatch(getGrowthPlantChartReportFail(err.response))
            })
        }
        else {
          dispatch(getGrowthPlantChartReportFail(err.response))
        }
      })
  }
}
/* GET GROWTH PLANT CHART REPORT FUNCTION */

/* GET ALERT REPORT FUNCTION */
export const getAlertReport = ({ order_by = "today" }) => {
  let queryString = {}
  if(order_by) queryString["order_by"] = order_by
  return dispatch => {
    dispatch(getAlertReportStart())
    axios.get('/reports/alert-report', { params: queryString })
      .then(res => {
        dispatch(getAlertReportSuccess(res.data))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp) {
          axios.get('/reports/alert-report', { params: queryString })
            .then(res => {
              dispatch(getAlertReportSuccess(res.data))
            })
            .catch(err => {
              dispatch(getAlertReportFail(err.response))
            })
        }
        else {
          dispatch(getAlertReportFail(err.response))
        }
      })
  }
}
/* GET ALERT REPORT FUNCTION */
