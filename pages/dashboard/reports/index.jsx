import { CSVLink } from "react-csv"
import { withAuth } from "lib/withAuth";
import { useState, useEffect } from 'react'
import { optionsGrowth } from 'components/Dashboard/apexOption'
import { Layout, Card, Row, Col, Radio, Tabs, Badge, Table, Button, Grid, Select, Space, Dropdown, Menu } from 'antd'

import { columns, dataSource } from 'columns/sensorReport'
import { seriesPHWeek, seriesPHDay, seriesPPMWeek, seriesPPMDay } from 'components/Dashboard/apexOption'
import { seriesDayGrowth, optionsDayGrowthData, seriesWeekGrowth, optionsWeekGrowthData } from 'components/Dashboard/apexOption'
import { optionsPHWeekData, optionsPHDayData, optionsPPMWeekData, optionsPPMDayData } from 'components/Dashboard/apexOption'

import moment from 'moment'
import dynamic from 'next/dynamic'
import generatePDF from 'lib/reportGenerator'
import pageStyle from 'components/Dashboard/pageStyle.js'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const PH = "PH", PPM = "PPM"
const DAY = "DAY", WEEK = "WEEK", MONTH = "MONTH"
const ANALYSIS = "ANALYSIS", GROWTH = "GROWTH", ALERT = "ALERT"
const useBreakpoint = Grid.useBreakpoint

const headersTableExport = [
  { label: "PH", key: "report.ph" }, //ph
  { label: "Nutrition", key: "report.tds" }, //tds
  { label: "Light Status", key: "report.ldr" }, //ldr
  { label: "Water Temp.", key: "report.sh" }, //tmp
  { label: "Water Level", key: "report.ta" }, //tank
  { label: "Time", key: "report.time" }
];

const Reports = () => {
  const screens = useBreakpoint()

  const [activeTab, setActiveTab] = useState(ANALYSIS)
  
  const [selectedGrowth, setSelectedGrowth] = useState(DAY)
  const [selectedGrowthOption, setSelectedGrowthOption] = useState(optionsGrowth)
  const [selectedGrowthSeries, setSelectedGrowthSeries] = useState(seriesWeekGrowth)

  const [selectedAnalysis, setSelectedAnalysis] = useState(PH)
  const [selectedAnalysisTime, setSelectedAnalysisTime] = useState(DAY)
  const [selectedAnalysisSeries, setSelectedAnalysisSeries] = useState(seriesPHDay)

  const [selectedPHOption, setSelectedPHOption] = useState(optionsPHWeekData)
  const [selectedPPMOption, setSelectedPPMOption] = useState(optionsPPMWeekData)
  

  /*FUNCTION FOR CHANGING ANALYSIS SELECTION*/
  const onChangeSelectedAnalysisHanlder = e => {
    setSelectedAnalysis(e.target.value)
  }

  const onChangeSelectedAnalysisTimeHanlder = val => {
    setSelectedAnalysisTime(val)
  }
  /*FUNCTION FOR CHANGING ANALYSIS SELECTION*/

  /*FUNCTION FOR CHANGING GROWTH SELECTION*/
  const onChangeSelectedGrowthHanlder = val => {
    setSelectedGrowth(val)
  }
  /*FUNCTION FOR CHANGING GROWTH SELECTION*/

  useEffect(() => {
    if(selectedGrowth === WEEK) {
      const dataOption = { ...optionsGrowth, ...optionsWeekGrowthData }
      setSelectedGrowthOption(dataOption)
      setSelectedGrowthSeries(seriesWeekGrowth)
    }
    if(selectedGrowth === DAY) {
      const dataOption = { ...optionsGrowth, ...optionsDayGrowthData }
      setSelectedGrowthOption(dataOption)
      setSelectedGrowthSeries(seriesDayGrowth)
    }
  }, [selectedGrowth])

  useEffect(() => {
    if(selectedAnalysisTime === WEEK) {
      if(selectedAnalysis === PH) {
        const dataOption = { ...optionsGrowth, ...optionsPHWeekData }
        setSelectedPHOption(dataOption)
        setSelectedAnalysisSeries(seriesPHWeek)
      }
      if(selectedAnalysis === PPM) {
        const dataOption = { ...optionsGrowth, ...optionsPPMWeekData }
        setSelectedPPMOption(dataOption)
        setSelectedAnalysisSeries(seriesPPMWeek)
      }
    }
    if(selectedAnalysisTime === DAY) {
      const dataOption = { ...optionsGrowth, ...optionsDayGrowthData }
      setSelectedGrowthOption(dataOption)

      if(selectedAnalysis === PH) {
        const dataOption = { ...optionsGrowth, ...optionsPHDayData }
        setSelectedPHOption(dataOption)
        setSelectedAnalysisSeries(seriesPHDay)
      }
      if(selectedAnalysis === PPM) {
        const dataOption = { ...optionsGrowth, ...optionsPPMDayData }
        setSelectedPPMOption(dataOption)
        setSelectedAnalysisSeries(seriesPPMDay)
      }
    }
  }, [selectedAnalysisTime, selectedAnalysis])

  const getCsvData = () => {
    const newDataSource = JSON.parse(JSON.stringify(dataSource))
    newDataSource.map(data => {
      data.report.tds = data.report.tds + " ppm"
      data.report.sh = data.report.sh + "°C"
      data.report.ta = data.report.ta + "%"
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
      <Menu.Item onClick={() => generatePDF(dataSource)} className="fs-12 fw-600">
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
                            <Select.Option value={DAY}>Last 7 days</Select.Option>
                            <Select.Option value={WEEK}>Last 30 days</Select.Option>
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
                            <Select.Option value={DAY}>Last 7 days</Select.Option>
                            <Select.Option value={WEEK}>Last 30 days</Select.Option>
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

                  <Tabs.TabPane tab={<span>Alerts<Badge dot /></span>} key={ALERT}>
                    <p className="header-date">Recent alert</p>
                    <div className="alert-container">
                      <Card className="radius1rem card-alert card-body-p-1 card-warning">
                        <h3 className="bold line-height-1 title">Water Tank</h3>
                        <p className="m-b-0 sub">Water remaining 20%</p>
                      </Card>

                      <Card className="radius1rem card-alert card-body-p-1 card-warning">
                        <h3 className="bold line-height-1 title">Water Tank</h3>
                        <p className="m-b-0 sub">Water remaining 20%</p>
                      </Card>
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
                      <Select defaultValue="today">
                        <Select.Option value="today">Today</Select.Option>
                        <Select.Option value="week">Last 7 days</Select.Option>
                        <Select.Option value="month">Last 30 days</Select.Option>
                        <Select.Option value="month2">Last 90 days</Select.Option>
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
                    columns={columns} 
                    pagination={false} 
                    dataSource={dataSource} 
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
        :global(.ant-card.card-warning .ant-card-body > .title){
          color: #e67e22;
        }
        :global(.ant-card.card-warning .ant-card-body > .sub){
          color: var(--grey);
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

      `}</style>
    </>
  )
}

export default withAuth(Reports)
