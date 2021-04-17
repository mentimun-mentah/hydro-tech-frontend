import { useState, useEffect } from 'react'
import { Layout, Card, Row, Col, Radio, Tabs, Badge, Timeline, Table } from 'antd'
import { optionsGrowth } from 'components/Dashboard/apexOption'
import { seriesDayGrowth, optionsDayGrowthData, seriesWeekGrowth, optionsWeekGrowthData } from 'components/Dashboard/apexOption'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

import moment from 'moment'
import dynamic from 'next/dynamic'
import pageStyle from 'components/Dashboard/pageStyle.js'

const DAY = "DAY", WEEK = "WEEK"

const dataSource = [ { key: 0.19777277608656285, report: { sh: "29", tds: "958", ldr: "570", ta: "81", ph: "9.30" }, }, { key: 0.8150942087462312, report: { sh: "30", tds: "881", ldr: "548", ta: "91", ph: "8.72" }, }, { key: 0.5210355778665618, report: { sh: "27", tds: "870", ldr: "592", ta: "86", ph: "11.50" }, }, { key: 0.8165505380731397, report: { sh: "28", tds: "949", ldr: "506", ta: "76", ph: "8.38" }, }, { key: 0.07374130493711961, report: { sh: "28", tds: "870", ldr: "568", ta: "96", ph: "9.52" }, }, { key: 0.4687208647341543, report: { sh: "28", tds: "913", ldr: "538", ta: "93", ph: "13.13" }, }, { key: 0.5665714778124649, report: { sh: "29", tds: "835", ldr: "571", ta: "71", ph: "11.11" }, }, { key: 0.30834060088598214, report: { sh: "28", tds: "834", ldr: "505", ta: "85", ph: "12.59" }, }, { key: 0.7151410357998422, report: { sh: "29", tds: "900", ldr: "510", ta: "91", ph: "10.93" }, }, { key: 0.13392430164420221, report: { sh: "27", tds: "878", ldr: "522", ta: "80", ph: "9.74" }, }, { key: 0.04448957640096296, report: { sh: "29", tds: "808", ldr: "562", ta: "77", ph: "15.79" }, }, { key: 0.46947968474652146, report: { sh: "27", tds: "983", ldr: "561", ta: "74", ph: "13.89" }, }, { key: 0.8939867673632909, report: { sh: "29", tds: "886", ldr: "503", ta: "98", ph: "11.72" }, }, { key: 0.9273474416398337, report: { sh: "30", tds: "941", ldr: "546", ta: "92", ph: "11.64" }, }, { key: 0.6173171154653958, report: { sh: "29", tds: "960", ldr: "510", ta: "76", ph: "12.09" }, }, ];

const columns = [
  {
    key: 'ph',
    align: 'center',
    title: 'PH',
    dataIndex: 'report',
    render: item => <span>{item.ph}</span>
  },
  {
    key: 'tds',
    align: 'center',
    title: 'Nutrition',
    dataIndex: 'report',
    render: item => <span>{item.tds} ppm</span>
  },
  {
    key: 'ldr',
    align: 'center',
    title: 'Light Intensity',
    dataIndex: 'report',
    render: item => <span>{item.ldr} lux</span>
  },
  {
    key: 'sh',
    align: 'center',
    title: 'Water Temp.',
    dataIndex: 'report',
    render: item => <span>{item.sh}°C</span>
  },
  {
    key: 'ta',
    align: 'center',
    title: 'Water Level',
    dataIndex: 'report',
    render: item => <span>{item.ta}%</span>
  }
];


const progressData = [
  {date: 11, sub: "Planted - Location updated"},
  {date: 14, sub: "Growing - Early phase"},
  {date: 17, sub: "Growing - Leaves blooming"},
  {date: 19, sub: "Growing - Leaves bloom - Expected"},
  {date: 21, sub: "Growing - Early phase ii - Expected"},
]

const Reports = () => {
  
  const [selectedGrowth, setSelectedGrowth] = useState(WEEK)
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
                <Tabs defaultActiveKey="1" onChange={val => console.log(val)}>
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
                      <Chart type="area" series={selectedGrowthSeries} options={selectedGrowthOption} height={400} />
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
                <h3 className="h3 bold mb1 line-height-1">
                  Table Reports
                </h3>
                <div className="m-t-20">
                  <Table scroll={{ y: 500, x: 700 }} dataSource={dataSource} columns={columns} pagination={false} />
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
