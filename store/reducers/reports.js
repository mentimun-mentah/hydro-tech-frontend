import * as actionType from 'store/actions/actionTypes'
import { updateObject } from 'lib/utility'

const initialState = {
  all_reports: [],
  ph_chart: [],
  tds_chart: [],
  growth_plant_chart: [],
  alert_report: [],
  loading: false,
  error: null,
}

/* GET ALL REPORTS ACTIONS */
const getAllReportsStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const getAllReportsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    all_reports: action.payload,
  })
}

const getAllReportsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}
/* GET ALL REPORTS ACTIONS */

/* GET PH CHART REPORT */
const getPhChartReportStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const getPhChartReportSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    ph_chart: action.payload,
  })
}

const getPhChartReportFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}
/* GET PH CHART REPORT */


/* GET TDS CHART REPORT */
const getTdsChartReportStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const getTdsChartReportSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    tds_chart: action.payload,
  })
}

const getTdsChartReportFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}
/* GET TDS CHART REPORT */


/* GET GROWTH PLANT CHART REPORT */
const getGrowthPlantChartReportStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const getGrowthPlantChartReportSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    growth_plant_chart: action.payload,
  })
}

const getGrowthPlantChartReportFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}
/* GET GROWTH PLANT CHART REPORT */


/* GET ALERT REPORTS ACTIONS */
const getAlertReportsStart = (state, _) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const getAlertReportsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    alert_report: action.payload,
  })
}

const getAlertReportsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}
/* GET ALERT REPORTS ACTIONS */


const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* GET ALL REPORTS */
    case actionType.GET_ALL_REPORTS_START:
      return getAllReportsStart(state, action)
    case actionType.GET_ALL_REPORTS_SUCCESS:
      return getAllReportsSuccess(state, action)
    case actionType.GET_ALL_REPORTS_FAIL:
      return getAllReportsFail(state, action)

    /* GET PH CHART */
    case actionType.GET_PH_CHART_REPORT_START:
      return getPhChartReportStart(state, action)
    case actionType.GET_PH_CHART_REPORT_SUCCESS:
      return getPhChartReportSuccess(state, action)
    case actionType.GET_PH_CHART_REPORT_FAIL:
      return getPhChartReportFail(state, action)

    /* GET TDS CHART */
    case actionType.GET_TDS_CHART_REPORT_START:
      return getTdsChartReportStart(state, action)
    case actionType.GET_TDS_CHART_REPORT_SUCCESS:
      return getTdsChartReportSuccess(state, action)
    case actionType.GET_TDS_CHART_REPORT_FAIL:
      return getTdsChartReportFail(state, action)

    /* GET GROWTH PLANT CHART */
    case actionType.GET_GROWTH_PLANT_CHART_REPORT_START:
      return getGrowthPlantChartReportStart(state, action)
    case actionType.GET_GROWTH_PLANT_CHART_REPORT_SUCCESS:
      return getGrowthPlantChartReportSuccess(state, action)
    case actionType.GET_GROWTH_PLANT_CHART_REPORT_FAIL:
      return getGrowthPlantChartReportFail(state, action)

    /* GET ALERT PLANT CHART */
    case actionType.GET_ALERT_REPORT_START:
      return getAlertReportsStart(state, action)
    case actionType.GET_ALERT_REPORT_SUCCESS:
      return getAlertReportsSuccess(state, action)
    case actionType.GET_ALERT_REPORT_FAIL:
      return getAlertReportsFail(state, action)


    default:
      return state
    }
};

export default reducer
