import { useState, useEffect } from 'react'
import { optionsGrowth } from 'components/Dashboard/apexOption'
import { Layout, Card, Row, Col, Radio, Tabs, Badge, Timeline, Table, Button, Grid } from 'antd'
import { seriesDayGrowth, optionsDayGrowthData, seriesWeekGrowth, optionsWeekGrowthData } from 'components/Dashboard/apexOption'

import { columns, dataSource, progressData } from 'columns/sensorReport'

import moment from 'moment'
import dynamic from 'next/dynamic'
import generatePDF from 'lib/reportGenerator'
import pageStyle from 'components/Dashboard/pageStyle.js'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const DAY = "DAY", WEEK = "WEEK"
const useBreakpoint = Grid.useBreakpoint

const Reports = () => {
  const screens = useBreakpoint()
  
  const [selectedGrowth, setSelectedGrowth] = useState(DAY)
  const [selectedGrowthOption, setSelectedGrowthOption] = useState(optionsGrowth)
  const [selectedGrowthSeries, setSelectedGrowthSeries] = useState(seriesWeekGrowth)

  /*FUNCTION FOR CHANGING GROWTH SELECTION*/
  const onChangeSelectedGrowthHanlder = e => {
    setSelectedGrowth(e.target.value)
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
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="Progress" key="1">
                    <div className="header-dashboard">
                      <h4 className="h4 bold mb0">{moment().format("MMMM YYYY")}</h4>
                    </div>
                    <Timeline className="m-l-14">
                      {progressData.map((data, i) => (
                        <Timeline.Item 
                          key={i}
                          dot={data.date}
                          className={
                            `${data.date >= 17 ? "ant-timeline-item-head-current" : "ant-timeline-item-head-past"} 
                             ${data.date == 17 ? "scale-item" : "not-scale-item"}`
                          }
                        >
                          {data.sub}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Stats" key="2">
                    <div className="flex justify-between">
                      <p></p>
                      <Radio.Group 
                        value={selectedGrowth} 
                        className="btn-radio-pill" 
                        onChange={onChangeSelectedGrowthHanlder}
                      >
                        <Radio.Button value={DAY}>
                          <span className="h6">Day</span>
                        </Radio.Button>
                        <Radio.Button value={WEEK}>
                          <span className="h6">Week</span>
                        </Radio.Button>
                      </Radio.Group>
                    </div>
                    <div className="chart">
                      <Chart type="area" series={selectedGrowthSeries} options={selectedGrowthOption} height={300} />
                    </div>
                  </Tabs.TabPane>

                  <Tabs.TabPane tab={<span>Alerts<Badge dot /></span>} key="3">
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
                    <Button 
                      onClick={() => generatePDF(dataSource)}
                      className={`${!screens.xs && "float-right"}`}
                    >
                      Export
                    </Button>
                  </Col>
                </Row>
                <div className="m-t-20">
                  <Table 
                    exportable
                    columns={columns} 
                    pagination={false} 
                    dataSource={dataSource} 
                    scroll={{ y: 500, x: 700 }} 
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
      `}</style>
    </>
  )
}

export default Reports
