import { withAuth } from 'lib/withAuth'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { Layout, Card, Row, Col, Image, Tag, Modal } from 'antd'
import { Joystick } from 'react-joystick-component'

import { optionsPH } from 'components/Dashboard/apexOption'
import { seriesDayGrowth, optionsDayGrowthData, seriesWeekGrowth, optionsWeekGrowthData } from 'components/Dashboard/apexOption'

import moment from 'moment'
import dynamic from 'next/dynamic'
import pageStyle from 'components/Dashboard/pageStyle.js'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Camera = '/static/images/camera.svg'
const Sun = '/static/images/sun-outline.gif'
const Loader1 = '/static/images/loader-1.gif'
const Plant = '/static/images/leaf-outline.gif'
const WaterTank = '/static/images/water-tank.svg'
const Lecttuce = '/static/images/plant/lecttuce.png'
const Temperature = '/static/images/temperature.gif'

const DAY = "DAY", WEEK = "WEEK"
const initStatistic = { kind: "", sh: "0", tds: "0", ldr: "0", ta: "0", ph: "0" }
const initDataSeries = [ { name: "pH", data: [] } ]
const max_width_height = 90

let ws = {}

const Dashboard = () => {
  const constraintsRef = useRef(null)

  const [pos, setPos] = useState({})
  const [image, setImage] = useState("")
  const [position, setPosition] = useState({})
  const [showModalCam, setShowModalCam] = useState(false)
  const [seriesPh, setSeriesPh] = useState(initDataSeries)
  const [statistic, setStatistic] = useState([initStatistic])

  const statisticLength = statistic.length
  const { vertical, horizontal } = position

  useEffect(() => {
    return false
    const interval = setInterval(() => {
      //ldr = cahaya, ta = tinggi air, ph = power of hydrogen, tds = nutrisi, sh = suhu
      const ph = ((Math.random() * (15 - 7) + 1) + 7).toFixed(2)
      const ta = Math.floor((Math.random() * (98- 70) + 1) + 70).toString()
      const sh = Math.floor((Math.random() * (30 - 26) + 1) + 26).toString()
      const ldr = Math.floor((Math.random() * (600 - 500) + 1) + 500).toString()
      const tds = Math.floor((Math.random() * (1000 - 800) + 1) + 800).toString()

      const dataFromArduino = { kind: "IoT", sh: sh, tds: tds, ldr: ldr, ta: ta, ph: ph }

      if(dataFromArduino.hasOwnProperty("kind") && dataFromArduino.kind.toLowerCase() === "iot"){
        setStatistic(oldState => [...oldState, dataFromArduino])

        const x = Math.floor(new Date().getTime() / 1000)
        const y = +dataFromArduino['ph']

        let { data } = seriesPh[0]
        data.push({x,y})
        setSeriesPh([{...seriesPh[0], data}])

        // if(ApexCharts && ApexCharts.exec){
        //   ApexCharts && ApexCharts.exec("realtime", "updateSeries", seriesPh)
        // }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const onShowModalCamHandler = () => {
    setShowModalCam(true)
    if(ws && ws.send && ws.readyState !== 0) {
      ws.send(`kind:live_cam_true`)
    }
  }

  const onCloseModalCamHandler = () => {
    if(ws && ws.send && ws.readyState !== 0) {
      ws.send(`kind:live_cam_false`)
      setShowModalCam(false)
      setImage("")
    }
  }

  const wsConnect = () => {
    ws = new W3CWebSocket(`ws://192.168.18.83:8000/dashboard/ws`)

    ws.onopen = () => { 
      ws.send("Connected"); console.log("WS Connected") 
      if(showModalCam) ws.send(`kind:live_cam_true`)
      else ws.send(`kind:live_cam_false`)
    }

    let urlObject;
    ws.onmessage = msg => {
      console.log("message", msg.data)

      if(urlObject) URL.revokeObjectURL(urlObject)
      urlObject = URL.createObjectURL(new Blob([msg.data]))
      setImage(urlObject)
    }

    ws.onclose = e => {
      console.log('Disconected.\nReconnect will be attempted in 1 second.', e.reason);
      // setTimeout(() => {
      //   wsConnect();
      // }, 1000);
    };
  }

  const onJoyStickMoved = ({ x, y }) => {
    setPosition({ vertical: y*4, horizontal: x*4 })
  }

  useEffect(() => {
    if(ws.readyState == 3 || ws.readyState == 2 || ws.readyState == 0) {
      wsConnect()
    }
  }, [ws])

  useEffect(() => {
    if(ws && ws.send && ws.readyState == 1) {
      if(showModalCam) ws.send(`kind:live_cam_true`)
      else ws.send(`kind:live_cam_false`)
    }
  // }, [showModalCam])
  }, [])

  useEffect(() => {
    let v = vertical
    let h = horizontal
    if(vertical < 0) v = Math.abs(v)
    if(vertical > 0) v = 0
    if(horizontal < 0) h = 0
    const data = `kind:set_value_servo,sh:${h ? h : 0},sv:${v ? v : 0}`
    if(ws && ws.send && ws.readyState !== 0 && ws.readyState !== 3 && ws.readyState !== 2 && showModalCam) {
      ws.send(data)
    }
  }, [position])

  useEffect(() => {
    wsConnect()
    return () => {
      if(ws && ws.send && showModalCam) {
        console.log()
        ws.send(`kind:live_cam_false`)
      }
    }
  }, [])

  const onPositionChangeHandler = (e) => {
    console.log(e)
    // console.log("x:", e.layerX, "y:", e.layerY)
    let x = e.layerX * 2
    let y = e.layerY * 2
    // if(x >= (max_width_height * 2)) x = max_width_height * 2
    if(x <= 0) x = 0
    // if(y >= (max_width_height * 2)) y = max_width_height * 2
    if(y <= 0) y = 0

    setPos({x: x, y: y})
  }

  useEffect(() => {
    if(showModalCam) document.body.classList.add("overflow-hidden")
    else document.body.classList.remove("overflow-hidden")
  }, [showModalCam])
  
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
                <h2 className="h2 bold mb1 line-height-1">{statistic[statisticLength-1].ph} pH</h2>
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
                      <h3 className="h2 bold mb0 mt2">{statistic[statisticLength-1].sh}&#176;<span className="regular header-date">C</span></h3>
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
                      <h3 className="h2 bold mb0">{statistic[statisticLength-1].ta}%</h3>
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
                  <span className="float-right" onClick={onShowModalCamHandler}>
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
                  <h3 className="h2 bold mb0">{statistic[statisticLength-1].tds}<span className="regular header-date"> ppm</span></h3>
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
                  <h3 className="h2 bold mb0">{statistic[statisticLength-1].ldr}<span className="regular header-date"> lux</span></h3>
                </div>
              </Card>
            </Col>
          </Row>

        </Layout.Content>
      </Layout>

      <Modal
        centered
        title={<b>Plant</b>}
        zIndex="1030"
        width={700}
        footer={null}
        maskClosable={false}
        visible={showModalCam}
        onOk={onCloseModalCamHandler}
        bodyStyle={{paddingTop: "0px"}}
        className="modal-modif noselect"
        onCancel={onCloseModalCamHandler}
        closeIcon={<i className="fas fa-times" />}
        maskStyle={{backgroundColor: "rgba(0, 0, 0, 0.45)"}}
      >
        {image == "" ? (
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Image width={100} src={Loader1} preview={false} alt="loader" />
            <div className="fs-14 m-b-10">
              Connecting to camera...
            </div> 
          </motion.div>
        ) : (
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center live-img">
              <Image width={640} heigth={480} src={image} preview={false} />
            </div>
            <div className="joystick-container">
              <Joystick size={90} throttle={100} baseColor="#00000057" stickColor="#0000008a" move={onJoyStickMoved} />
            </div>
          </motion.div>
        )}
      </Modal>

      <AnimatePresence>
        {showModalCam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ".2" }}
            className="overlay-blur"
          />
        )}
      </AnimatePresence>

      <style jsx>{pageStyle}</style>
      <style jsx>{`
        :global(.joystick-container > div) {
          margin-left: auto;
          margin-right: auto;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        :global(.live-img > .ant-image > .ant-image-img) {
          border-radius: .8rem;
        }
        @media only screen and (max-width: 725px) {
          :global(.live-img > .ant-image) {
            width: 100%!important;
          }
        }
      `}</style>

      <style jsx>{`
        :global(.drag-container) {
          display: flex;
          margin-left: auto;
          margin-right: auto;
          width: ${max_width_height}px;
          height: ${max_width_height}px;
          position: relative;
        }

        :global(.drag-container div#drag-btn) {
          top: calc(50% - 50px / 2);
          left: calc(50% - 50px / 2);
        }

        :global(.drag-container div) {
          background: #0000008a;
          border-radius: 30px;
          width: 50px;
          height: 50px;
          position: absolute;
        }

        :global(.drag-container .drag-area) {
          opacity: 0.2;
          background: #0000008a;
          position: absolute;
          width: ${max_width_height}px;
          height: ${max_width_height}px;
          border-radius: 10px;
        }
      `}</style>
    </>
  )
}

// export default withAuth(Dashboard)
export default Dashboard
