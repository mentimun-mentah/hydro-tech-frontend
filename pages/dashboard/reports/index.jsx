import { CSVLink } from "react-csv"
import { withAuth } from "lib/withAuth";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { optionsGrowth } from 'components/Dashboard/apexOption'
import { Layout, Card, Row, Col, Radio, Tabs, Table, Button, Grid, Select, Space, Dropdown, Menu, Empty } from 'antd'

import { columnsAllReports } from 'columns/sensorReport'
import { seriesPHDay } from 'components/Dashboard/apexOption'
import { optionsPHWeekData, optionsPPMWeekData } from 'components/Dashboard/apexOption'
import { optionsDayGrowthData, seriesWeekGrowth, optionsWeekGrowthData } from 'components/Dashboard/apexOption'

import moment from 'moment'
import axios from 'lib/axios'
import dynamic from 'next/dynamic'
import * as actions from 'store/actions'
import generatePDF from 'lib/reportGenerator'
import pageStyle from 'components/Dashboard/pageStyle.js'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const PH = "PH", PPM = "PPM"
const ANALYSIS = "ANALYSIS", GROWTH = "GROWTH", ALERT = "ALERT"
const TODAY = "today", DAY3 = "3day", DAY7 = "7day", DAY30 = "30day", DAY90 = "90day"
const useBreakpoint = Grid.useBreakpoint

const headersTableExport = [
  { label: "PH", key: "ph" }, //ph
  { label: "Nutrition", key: "tds" }, //tds
  { label: "Light Status", key: "ldr" }, //ldr
  { label: "Water Temp.", key: "temp" }, //tmp
  { label: "Water Level", key: "tank" }, //tank
  { label: "Time", key: "time" }
];

const Reports = () => {
  const dispatch = useDispatch()
  const screens = useBreakpoint()

  const reports = useSelector(state => state.reports)
  const settingUsers = useSelector(state => state.settingUsers)

  const [activeTab, setActiveTab] = useState(ANALYSIS)
  
  const [camera, setCamera] = useState(false)
  const [selectedGrowth, setSelectedGrowth] = useState(DAY7)
  const [selectedGrowthOption, setSelectedGrowthOption] = useState(optionsGrowth)
  const [selectedGrowthSeries, setSelectedGrowthSeries] = useState(seriesWeekGrowth)

  const [selectedAnalysis, setSelectedAnalysis] = useState(PH)
  const [selectedAnalysisSeries, setSelectedAnalysisSeries] = useState(seriesPHDay)

  const [selectedPHOption, setSelectedPHOption] = useState(optionsPHWeekData)
  const [selectedPPMOption, setSelectedPPMOption] = useState(optionsPPMWeekData)

  const [selectedAnalysisTime, setSelectedAnalysisTime] = useState(DAY7)
  const [selectedAllReports, setSelectedAllReports] = useState(TODAY)

  const [selectedAlert, setSelectedAlert] = useState(TODAY)
  

  const getCsvData = () => {
    const newDataSource = JSON.parse(JSON.stringify(reports.all_reports))
    newDataSource.map(data => {
      data.tds = data.tds + " ppm"
      data.temp = data.temp + "°C"
      data.tank = data.tank + "%"
      return data
    })
    return newDataSource
  }

  const getGraphicData = (id, className) => {
    const v = document.getElementById(id)
    v.querySelector("."+className).click()
    return
  }

  const exportMenuTable = (
    <Menu>
      <Menu.Item onClick={() => generatePDF(reports.all_reports)} className="fs-12 fw-600">
        Download PDF
      </Menu.Item>
      <Menu.Item className="fs-12 fw-600">
        <CSVLink data={getCsvData()} headers={headersTableExport} filename={`Sensor Report ${moment().format('LLL')}.csv`}>
          Download CSV
        </CSVLink>
      </Menu.Item>
    </Menu>
  )

  const exportMenuAnalysis = (
    <Menu>
      <Menu.Item onClick={() => getGraphicData("chart-analysis", "exportSVG")} className="fs-12 fw-600">
        Download SVG
      </Menu.Item>
      <Menu.Item onClick={() => getGraphicData("chart-analysis", "exportPNG")} className="fs-12 fw-600">
        Download PNG
      </Menu.Item>
      <Menu.Item onClick={() => getGraphicData("chart-analysis", "exportCSV")} className="fs-12 fw-600">
        Download CSV
      </Menu.Item>
    </Menu>
  )

  const exportMenuGrowth = (
    <Menu>
      <Menu.Item onClick={() => getGraphicData("chart-growth", "exportSVG")} className="fs-12 fw-600">
        Download SVG
      </Menu.Item>
      <Menu.Item onClick={() => getGraphicData("chart-growth", "exportPNG")} className="fs-12 fw-600">
        Download PNG
      </Menu.Item>
      <Menu.Item onClick={() => getGraphicData("chart-growth", "exportCSV")} className="fs-12 fw-600">
        Download CSV
      </Menu.Item>
    </Menu>
  )

  const onTabChange = val => {
    setActiveTab(val)
    window.dispatchEvent(new Event('resize'))
  }


  /*FUNCTION FOR CHANGING ANALYSIS SELECTION*/
  const onChangeSelectedAnalysisHanlder = e => {
    setSelectedAnalysis(e.target.value)
  }

  const onChangeSelectedAnalysisTimeHanlder = val => {
    setSelectedAnalysisTime(val)
  }
  /*FUNCTION FOR CHANGING ANALYSIS SELECTION*/

  const onChangeAllReports = val => {
    setSelectedAllReports(val)
    dispatch(actions.getAllReports({ order_by: val }))
  }

  /* get all report on mounted */
  useEffect(() => {
    dispatch(actions.getAllReports({ order_by: selectedAllReports }))
  }, [])

  /* report analysis function */
  useEffect(() => {
    if(selectedAnalysisTime === DAY30) {
      if(selectedAnalysis === PH) {
        dispatch(actions.getPhChartReport({ order_by: DAY30 }))

        axios.get('/reports/ph-chart-report', { params: { order_by: DAY30 }})
          .then(res => {
            const phCategories = res.data.map(x => x.date)
            const phSeries = res.data.map(x => parseFloat(x.avg).toFixed(2))

            const dataPpmOption = {
              ...optionsPPMWeekData,
              xaxis: { max: 4, categories: phCategories.reverse() }
            }
            const dataOption = { ...optionsGrowth, ...dataPpmOption }

            const seriesPPM30Day = [{
              name: "PPM",
              data: phSeries.reverse()
            }]

            setSelectedPHOption(dataOption)
            setSelectedAnalysisSeries(seriesPPM30Day)
          })
      }

      if(selectedAnalysis === PPM) {
        dispatch(actions.getTdsChartReport({ order_by: DAY30 }))

        axios.get('/reports/tds-chart-report', { params: { order_by: DAY30 } })
          .then(res => {
            const ppmCategories = res.data.map(x => x.date)
            const ppmSeries = res.data.map(x => parseFloat(x.avg).toFixed(2))

            const dataPpmOption = {
              ...optionsPPMWeekData,
              xaxis: { max: 4, categories: ppmCategories.reverse() }
            }
            const dataOption = { ...optionsGrowth, ...dataPpmOption }

            const seriesPPM30Day = [{
              name: "PPM",
              data: ppmSeries.reverse()
            }]

            setSelectedPPMOption(dataOption)
            setSelectedAnalysisSeries(seriesPPM30Day)
          })
      }
    }

    if(selectedAnalysisTime === DAY7) {
      const dataOption = { ...optionsGrowth, ...optionsDayGrowthData }
      setSelectedGrowthOption(dataOption)

      if(selectedAnalysis === PH) {
        dispatch(actions.getPhChartReport({ order_by: DAY7 }))

        axios.get('/reports/ph-chart-report', { params: { order_by: DAY7 }})
          .then(res => {
            const phCategories = res.data.map(x => x.date)
            const phSeries = res.data.map(x => parseFloat(x.avg).toFixed(2))

            const dataPpmOption = {
              ...optionsPPMWeekData,
              xaxis: { max: 7, categories: phCategories.reverse() }
            }
            const dataOption = { ...optionsGrowth, ...dataPpmOption }

            const seriesPPM7Day = [{
              name: "PPM",
              data: phSeries.reverse()
            }]

            setSelectedPHOption(dataOption)
            setSelectedAnalysisSeries(seriesPPM7Day)
          })
      }

      if(selectedAnalysis === PPM) {
        dispatch(actions.getTdsChartReport({ order_by: DAY7 }))

        axios.get('/reports/tds-chart-report', { params: { order_by: DAY7 } })
          .then(res => {
            const ppmCategories = res.data.map(x => x.date)
            const ppmSeries = res.data.map(x => parseFloat(x.avg).toFixed(2))

            const dataPpmOption = {
              ...optionsPPMWeekData,
              xaxis: { max: 7, categories: ppmCategories.reverse() }
            }
            const dataOption = { ...optionsGrowth, ...dataPpmOption }

            const seriesPPM7Day = [{
              name: "PPM",
              data: ppmSeries.reverse()
            }]

            setSelectedPPMOption(dataOption)
            setSelectedAnalysisSeries(seriesPPM7Day)
          })
      }
    }
  }, [selectedAnalysisTime, selectedAnalysis])
  /* report analysis function */




  /* report growth plant function */
  /*FUNCTION FOR CHANGING GROWTH SELECTION*/
  const onChangeSelectedGrowthHanlder = val => {
    setSelectedGrowth(val)
  }
  /*FUNCTION FOR CHANGING GROWTH SELECTION*/

  useEffect(() => {
    if(selectedGrowth === DAY30) {
      dispatch(actions.getGrowthPlantChartReport({ order_by: DAY30 }))

      axios.get('/reports/growth-plant-chart-report', { params: { order_by: DAY30 } })
        .then(res => {
          const growthCategories = res.data.map(x => x.date)
          const growthSeries = res.data.map(x => parseFloat(x.avg).toFixed(2))

          const dataGrowthOption = {
            ...optionsGrowth,
            ...optionsWeekGrowthData,
            xaxis: { max: 4, categories: growthCategories.reverse() }
          }

          const seriesGrowthPlant30Day = [{
            name: "GROWTH",
            data: growthSeries.reverse()
          }]

          setSelectedGrowthOption(dataGrowthOption)
          setSelectedGrowthSeries(seriesGrowthPlant30Day)
        })
    }

    if(selectedGrowth === DAY7) {
      dispatch(actions.getGrowthPlantChartReport({ order_by: DAY7 }))

      axios.get('/reports/growth-plant-chart-report', { params: { order_by: DAY7 } })
        .then(res => {
          const growthCategories = res.data.map(x => x.date)
          const growthSeries = res.data.map(x => parseFloat(x.avg).toFixed(2))

          const dataGrowthOption = {
            ...optionsGrowth,
            ...optionsWeekGrowthData,
            xaxis: { max: 7, categories: growthCategories.reverse() }
          }

          const seriesGrowthPlant7Day = [{
            name: "GROWTH",
            data: growthSeries.reverse()
          }]

          setSelectedGrowthOption(dataGrowthOption)
          setSelectedGrowthSeries(seriesGrowthPlant7Day)
        })
    }

  }, [selectedGrowth])
  /* report growth plant function */


  /* report alert function */
  useEffect(() => {
    dispatch(actions.getAlertReport({ order_by: selectedAlert }))
  }, [selectedAlert])
  /* report alert function */

  useEffect(() => {
    dispatch(actions.getSettingUsersMySetting())
    const timeout = setTimeout(() => {
      dispatch(actions.getSettingUsersMySetting())
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if(settingUsers && settingUsers.mySetting) {
      const { setting_users_camera } = settingUsers.mySetting
      setCamera(setting_users_camera)
    }
  }, [settingUsers])

  return(
    <>
      <div className="header-dashboard">
        <h1 className="h1 bold mb0">Reports Status</h1>
        <span className="header-date">{moment().format("dddd, DD MMMM YYYY")}</span>
      </div>

      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <Tabs activeKey={activeTab} onChange={onTabChange}>


                  <Tabs.TabPane tab="Analysis" key={ANALYSIS}>
                    <Row gutter={[0, 0]} align="middle" justify="space-between">
                      <Col lg={12} md={12} sm={12} xs={24}>

                        <Radio.Group value={selectedAnalysis} onChange={onChangeSelectedAnalysisHanlder}>
                          <Radio.Button value={PH}>
                            <span className="h6">PH</span>
                          </Radio.Button>
                          <Radio.Button value={PPM}>
                            <span className="h6">PPM</span>
                          </Radio.Button>
                        </Radio.Group>

                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Space className={`${!screens.xs && "float-right"}`}>
                          <Select 
                            value={selectedAnalysisTime}
                            onChange={onChangeSelectedAnalysisTimeHanlder} 
                            className="select-no-rounded"
                          >
                            <Select.Option value={DAY7}>Last 7 days</Select.Option>
                            <Select.Option value={DAY30}>Last 30 days</Select.Option>
                          </Select>
                          <Dropdown overlay={exportMenuAnalysis} trigger={['click']} placement="bottomRight" className="border-radius-2px">
                            <Button className="btn-white">Export</Button>
                          </Dropdown>
                        </Space>
                      </Col>
                    </Row>
                    <div className="chart chart-analysis" id="chart-analysis">
                      <Chart 
                        type="area"
                        series={selectedAnalysisSeries}
                        options={selectedAnalysis === PH ? selectedPHOption : selectedPPMOption}
                        height={300} 
                      />
                    </div>
                  </Tabs.TabPane>



                  {camera && (
                    <Tabs.TabPane tab="Growth Plant" key={GROWTH}>
                      <Row gutter={[0, 0]} align="middle" justify="space-between">
                        <Col lg={12} md={12} sm={12} xs={24}>
                          <p></p>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={24}>
                          <Space className={`${!screens.xs && "float-right"}`}>
                            <Select 
                              value={selectedGrowth} 
                              onChange={onChangeSelectedGrowthHanlder} 
                              className="select-no-rounded"
                            >
                              <Select.Option value={DAY7}>Last 7 days</Select.Option>
                              <Select.Option value={DAY30}>Last 30 days</Select.Option>
                            </Select>
                            <Dropdown overlay={exportMenuGrowth} trigger={['click']} placement="bottomRight" className="border-radius-2px">
                              <Button className="btn-white">Export</Button>
                            </Dropdown>
                          </Space>
                        </Col>
                      </Row>
                      <div className="chart chart-analysis" id="chart-growth">
                        <Chart type="area" series={selectedGrowthSeries} options={selectedGrowthOption} height={300} />
                      </div>
                    </Tabs.TabPane>
                  )}




                  <Tabs.TabPane tab="Alerts" key={ALERT}>
                    <Row gutter={[0, 0]} align="middle" justify="space-between" className="m-b-10">
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <p className="header-date m-b-0">Recent alert</p>
                      </Col>
                      <Col lg={12} md={12} sm={12} xs={24}>
                        <Space className={`${!screens.xs && "float-right"}`}>
                          <Select 
                            value={selectedAlert}
                            onChange={val => setSelectedAlert(val)} 
                            className="select-no-rounded"
                          >
                            <Select.Option value={TODAY}>Today</Select.Option>
                            <Select.Option value={DAY3}>Last 3 days</Select.Option>
                            <Select.Option value={DAY7}>Last 7 days</Select.Option>
                          </Select>
                        </Space>
                      </Col>
                    </Row>
                    <div className="alert-container">
                      {reports && reports.alert_report && reports.alert_report.length > 0 ? (
                        <>
                          {reports.alert_report.map(data => (
                            <Card 
                              key={data.id}
                              title={
                                <h3 className="bold title-alert line-height-1 m-b-0 text-capitalize">{data.type.replace("_", " ")}</h3>
                              }
                              className={`radius1rem card-alert card-body-p-1 card-warning ${data.type}`}
                              extra={<span className="text-grey fs-12">{moment(data.created_at).format("LLL")}</span>}
                            >
                              <p className="m-b-0 sub">{data.message}</p>
                            </Card>
                          ))}
                        </>
                      ) : (
                        <Empty className="m-t-50 m-b-50" description={<span className="text-grey">No recent alert</span>} />
                      )}
                      
                    </div>
                  </Tabs.TabPane>


                </Tabs>
              </Card>
            </Col>
          </Row>


          <Row gutter={[20, 20]} className="m-t-20">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <Row gutter={[0, 0]} align="middle" justify="space-between">
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <h3 className="h3 bold mb1 line-height-1">
                      Table Reports
                    </h3>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Space className={`${!screens.xs && "float-right"}`}>
                      <Select value={selectedAllReports} onChange={onChangeAllReports}>
                        <Select.Option value={TODAY}>Today</Select.Option>
                        <Select.Option value={DAY7}>Last 7 days</Select.Option>
                        <Select.Option value={DAY30}>Last 30 days</Select.Option>
                        <Select.Option value={DAY90}>Last 90 days</Select.Option>
                      </Select>
                      <Dropdown overlay={exportMenuTable} trigger={['click']} placement="bottomRight">
                        <Button className="btn-white">Export</Button>
                      </Dropdown>
                    </Space>
                  </Col>
                </Row>
                <div className="m-t-20">
                  <Table 
                    exportable
                    pagination={false} 
                    columns={columnsAllReports}
                    dataSource={reports.all_reports} 
                    scroll={{ y: 500, x: 1180 }} 
                  />
                </div>
              </Card>
            </Col>
          </Row>

        </Layout.Content>
      </Layout>

      <style jsx>{pageStyle}</style>
      <style jsx>{`
        :global(.ant-timeline-item-head-purple-1){
          color: var(--purple);
        }
        :global(.ant-timeline-item-head-custom){
          top: 5px;
          left: 5px;
          width: 30px;
          height: 30px;
          line-height: 1.3;
          padding: 7px;
          transform: translate(-50%, -50%) scale(.75);
        }
        :global(.ant-timeline-item-head-past .ant-timeline-item-head-custom){
          border-color: #aab5dc;
          background-color: #aab5dc;
          border-radius: 50%;
          color: white;
        }
        :global(.ant-timeline-item-head-current .ant-timeline-item-head-custom){
          border: 2px solid;
          border-radius: 50%;
          border-color: var(--purple);
          background-color: var(--white);
          color: var(--purple);
          opacity: 1;
          padding: 5px;
        }
        :global(.ant-timeline-item-head-current.scale-item .ant-timeline-item-head-custom){
          transform: translate(-50%, -50%) scale(1.1);
        }
        :global(.ant-timeline-item-head-current .ant-timeline-item-content){
          font-size: 17px;
        }
        :global(.ant-timeline-item-head-past .ant-timeline-item-content, 
                .ant-timeline-item-head-current.not-scale-item .ant-timeline-item-content
        ){
          opacity: .5;
          font-size: 14px;
        }
        :global(.ant-timeline-item-head-current.not-scale-item .ant-timeline-item-head-custom){
          border-color: #aab5dc;
          color: #aab5dc;
        }
        :global(.ant-timeline-item-last > .ant-timeline-item-content){
          min-height: 0px;
        }
        :global(.ant-timeline-item){
          padding-bottom: 20px;
        }
        :global(.ant-card.card-body-p-1 .ant-card-body){
          padding: 15px!important;
          padding-top: 0px!important;
          border-radius: 1rem;
        }
        :global(.card-alert:not(:last-of-type)){
          margin-bottom: 10px;
        }
        :global(.ant-card.card-alert){
          border-left-width: 5px;
        }

        :global(.ant-card.card-warning){
          border-color: #f39c12;
        }
        :global(.ant-card.card-warning .ant-card-head){
          padding: 0 15px;
          border: unset;
        }
        :global(.ant-card.card-warning .ant-card-head .ant-card-head-title, .ant-card.card-warning .ant-card-head .ant-card-extra){
          padding-top: 15px;
          padding-bottom: 0.5em;
        }
        :global(.ant-card.card-warning .ant-card-head .ant-card-head-title .title-alert){
          color: #e67e22;
        }
        :global(.ant-card.card-warning .ant-card-body > .title){
          color: #e67e22;
        }
        :global(.ant-card.card-warning .ant-card-body > .sub){
          color: var(--grey);
        }

        :global(.ant-card.card-warning.water_tank, .ant-card.card-warning.water_temp){
          border-color: #f39c12;
        }
        :global(
          .ant-card.card-warning.water_tank .ant-card-head .ant-card-head-title .title-alert,
          .ant-card.card-warning.water_tank .ant-card-body > .title,
          .ant-card.card-warning.water_temp .ant-card-head .ant-card-head-title .title-alert,
          .ant-card.card-warning.water_temp .ant-card-body > .title
        ){
          color: #f39c12;
        }

        :global(.ant-card.card-warning.already_planted, .ant-card.card-warning.already_planted){
          border-color: var(--green);
        }
        :global(
          .ant-card.card-warning.already_planted .ant-card-head .ant-card-head-title .title-alert,
          .ant-card.card-warning.already_planted .ant-card-body > .title,
          .ant-card.card-warning.ready_harvest .ant-card-head .ant-card-head-title .title-alert,
          .ant-card.card-warning.ready_harvest .ant-card-body > .title
        ){
          color: var(--green);
        }


        :global(.ant-tabs-tab){
          padding-top: 0;
        }
        :global(.ant-tabs-tab:hover){
          color: var(--purple-1);
        }
        :global(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn){
          color: var(--purple);
        }
        :global(.ant-tabs-ink-bar){
          background: var(--purple);
        }

        :global(.select-no-rounded .ant-select-selector){
          border-radius: 2px!important;
        }

        :global(.apexcharts-menu-icon){
          transform: scale(1)!important;
        }

        :global(.chart-analysis .apexcharts-menu.apexcharts-menu-open, .chart-analysis .btn-export-graphic){
          display: none;
        }

        :global(.alert-container) {
          overflow: scroll;
          max-height: 300px;
        }


      `}</style>
    </>
  )
}

Reports.getInitialProps = async ctx => {
  if(ctx.req) axios.defaults.headers.get.Cookie = ctx.req.headers.cookie;
  try {
    // let queryString = { order_by: 'today' }
    // // let res = await axios.get('/reports/all-reports', { params: queryString })
    // // ctx.store.dispatch(actions.getAllReportsSuccess(res.data))
    const resSetting = await axios.get("/setting-users/my-setting")
    ctx.store.dispatch(actions.getSettingUsersMySettingSuccess(resSetting.data))
  }
  catch(err) {}
}

export default withAuth(Reports)
