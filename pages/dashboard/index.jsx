import { useState, useEffect } from 'react'
import { Layout, Card, Row, Col, Image, Tag, Radio, Tabs, Badge, Timeline } from 'antd'
import { optionsPH, series, optionsGrowth } from 'components/Dashboard/apexOption'
import { seriesDayGrowth, optionsDayGrowthData, seriesWeekGrowth, optionsWeekGrowthData } from 'components/Dashboard/apexOption'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

import moment from 'moment'
import dynamic from 'next/dynamic'
import pageStyle from 'components/Dashboard/pageStyle.js'

const Camera = '/static/images/camera.svg'
const Sun = '/static/images/sun-outline.gif'
const Plant = '/static/images/leaf-outline.gif'
const WaterTank = '/static/images/water-tank.svg'
const Lecttuce = '/static/images/plant/lecttuce.png'
const Temperature = '/static/images/temperature.gif'

const DAY = "DAY", WEEK = "WEEK"
const initStatistic = { sh: "0", tds: "0", ldr: "0", ta: "0", ph: "0" }
const initDataSeries = [ { data: [] } ]
const initPhSeries = [ { name: "PH", data: [2, 4, 3, 6, 4, 9] } ]

const progressData = [
  {date: 11, sub: "Planted - Location updated"},
  {date: 14, sub: "Growing - Early phase"},
  {date: 17, sub: "Growing - Leaves blooming"},
  {date: 19, sub: "Growing - Leaves bloom - Expected"},
  {date: 21, sub: "Growing - Early phase ii - Expected"},
]

const Dashboard = () => {
  /*PH*/
  const [statistic, setStatistic] = useState([initStatistic])
  const [seriesPh, setSeriesPh] = useState(initPhSeries)
  /*PH*/
  
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

  useEffect(() => {
    return false
    setInterval(() => {
      //ldr = cahaya, ta = tinggi air, ph = power of hydrogen, tds = nutrisi, sh = suhu
      const ph = ((Math.random() * (15 - 7) + 1) + 7).toFixed(2)
      const ta = Math.floor((Math.random() * (98- 70) + 1) + 70).toString()
      const sh = Math.floor((Math.random() * (30 - 26) + 1) + 26).toString()
      const ldr = Math.floor((Math.random() * (600 - 500) + 1) + 500).toString()
      const tds = Math.floor((Math.random() * (1000 - 800) + 1) + 800).toString()

      const dataFromArduino = { key: Math.random(), report: {sh: sh, tds: tds, ldr: ldr, ta: ta, ph: ph }}
      setStatistic(oldState => [...oldState, dataFromArduino])

      if(dataFromArduino.hasOwnProperty("kind") && dataFromArduino.kind.toLowerCase() === "iot"){
        delete dataFromArduino.kind
        setStatistic(oldState => [...oldState, dataFromArduino])

        const x = Math.floor(new Date().getTime() / 1000)
        const y = +dataFromArduino['ph']


        // let { data } = seriesPh[0]
        // data.push(y)
        // setSeriesPh([{...seriesPh[0], data}])

        // ApexCharts && ApexCharts.exec("realtime", "updateSeries", seriesPh)

        // if(ApexCharts && ApexCharts.exec){
        //   ApexCharts.exec("realtime", "updateSeries", seriesPh)
        // }

        // let { data } = seriesPh[0]
        // data.push({x, y})

      }
      // for(let [key, val] of Object.entries(data)){
      //   console.log(key, val)
      // }

    }, 500)

  }, [])

  console.log(JSON.stringify(statistic))


  return(
    <>
      <div className="header-dashboard">
        <h1 className="h1 bold mb0">Monitoring Status</h1>
        <span className="header-date">{moment().format("dddd, DD MMMM YYYY")}</span>
      </div>

      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col lg={16} md={24} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">0 pH</h2>
                <span className="header-date">Power of Hydrogen</span>
                <div className="chart">
                  <Chart type="area" series={seriesPh} options={optionsPH} height={465} />
                </div>
              </Card>
            </Col>

            <Col lg={8} md={24} sm={24} xs={24}>
              <Row gutter={[20, 20]}>
                <Col lg={24} md={12} sm={24} xs={24}>
                  <Card className="radius1rem shadow1 card-dashboard h-100" bordered={false}>
                    <h2 className="h2 bold mb1 line-height-1">
                      Water Temp
                      <Tag className="right tag-condition good">Good</Tag>
                    </h2>
                    <div className="text-center items-center mt2">
                      <Image width={120} src={Temperature} preview={false} alt="temperature" className="ml5" />
                      <h3 className="h2 bold mb0 mt2">26&#176;<span className="regular header-date">C</span></h3>
                    </div>
                  </Card>
                </Col>

                <Col lg={24} md={12} sm={24} xs={24}>
                  <Card className="radius1rem shadow1 card-dashboard h-100" bordered={false} >
                    <h2 className="h2 bold mb1 line-height-1">
                      Water Tank
                      <Tag className="right tag-condition medium">Medium</Tag>
                    </h2>
                    <div className="text-center items-center mt1">
                      <Image width={140} src={WaterTank} preview={false} alt="water-tank" className="mln1" />
                      <h3 className="h2 bold mb0">80%</h3>
                      <h4 className="h3 header-date mb0">Remaining</h4>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={[20, 20]} style={{marginTop: "20px"}}>
            <Col xl={8} lg={8} md={12} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  Plant
                  <span className="right">
                    <Image width={25} src={Camera} preview={false} alt="camera" className="hover-pointer" />
                  </span>
                </h2>
                <div className="text-center items-center mt2">
                  <Image width={100} src={Lecttuce} preview={false} alt="plant" />
                  <h4 className="h3 header-date mb0 mt1">Lecttuce</h4>
                </div>
              </Card>
            </Col>

            <Col xl={8} lg={8} md={12} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  Nutrition
                  <Tag className="right tag-condition bad">Bad</Tag>
                </h2>
                <div className="text-center items-center mt2">
                  <Image width={100} src={Plant} preview={false} alt="plant" />
                  <h3 className="h2 bold mb0">6<span className="regular header-date"> ppm</span></h3>
                </div>
              </Card>
            </Col>

            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  Light Intensity
                </h2>
                <div className="text-center items-center mt2">
                  <Image width={100} src={Sun} preview={false} alt="temperature" />
                  <h3 className="h2 bold mb0">6<span className="regular header-date"> lux</span></h3>
                </div>
              </Card>
            </Col>
          </Row>

        </Layout.Content>
      </Layout>

      <style jsx>{pageStyle}</style>
    </>
  )
}

export default Dashboard
