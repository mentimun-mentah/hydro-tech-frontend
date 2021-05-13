import { withAuth } from "lib/withAuth";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { Layout, Card, Row, Col, Tag, Modal, Grid, Steps, Divider, Space } from "antd";

import { optionsPH } from "components/Dashboard/apexOption";
import { WebSocketContext } from 'components/Layout/dashboard';

import _ from 'lodash'
import moment from "moment";
import nookies from 'nookies'
import axios from 'lib/axios'
import Image from "next/image";
import dynamic from "next/dynamic";
import * as actions from 'store/actions'
import pageStyle from "components/Dashboard/pageStyle.js";
import ModalLiveCam from 'components/Dashboard/ModalLiveCam'
import ModalConfigCam from 'components/Dashboard/ModalConfigCam'
import SetupProfileModal from 'components/Dashboard/SetupProfileModal'

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Camera = "/static/images/camera2.svg";
const Play = "/static/images/play.svg";
const Sun = "/static/images/sun-outline.gif";
const Moon = "/static/images/moon.gif";
const Plant = "/static/images/leaf-outline.gif";
const WaterTank = "/static/images/water-tank.svg";
const Sawi = "/static/images/plant/sawi.png";
const Temperature = "/static/images/temperature.gif";

const max_width_height = 90;
const useBreakpoint = Grid.useBreakpoint;
const initDataSeries = [{ name: "pH", data: [] }];
const initialStatistic = { temp: "0", tank: "0", tds: "0", ldr: "bright", ph: "0", };

const steps = [ { title: 'Plant', }, { title: 'Camera', }, { title: 'Token', }, { title: 'Control', }, { title: 'Finish', } ];

const MIN = 0, MAX = 180, DELAY = 200, COUNT = 3

const Dashboard = () => {
  const router = useRouter();
  const screens = useBreakpoint();
  const ws = useContext(WebSocketContext)

  const user = useSelector(state => state.auth.user)

  const [current, setCurrent] = useState(0)
  const [plantSelected, setPlantSelected] = useState("")
  const [showModalSetup, setShowModalSetup] = useState(false)

  const [x, setX] = useState(90)
  const [y, setY] = useState(90)
  const [image, setImage] = useState("");
  const [heightPh, setHeightPh] = useState(465);
  const [joyStatus, setJoyStatus] = useState("stop")
  const [joyDirection, setJoyDirection] = useState("")
  const [showModalCam, setShowModalCam] = useState(false);
  const [showModalCamConfig, setShowModalCamConfig] = useState(false);
  const [seriesPh, setSeriesPh] = useState(initDataSeries);
  const [statistic, setStatistic] = useState([initialStatistic]);
  const [size, setSize] = useState({ imgWidth1: 100, imgWidth2: 120, imgWidth3: 140, });

  const statisticLength = statistic.length;

  const { imgWidth1, imgWidth2, imgWidth3 } = size;

  const onStepChange = val => {
    setCurrent(val)
    if(val == 4) {
      setTimeout(() => {
        setShowModalSetup(false)
        router.push('/dashboard/controls')
      }, 1500)
    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted && !screens.lg) setHeightPh(265);
    else setHeightPh(465);

    if (mounted && screens.xs) setSize({ ...size, imgWidth1: 80, imgWidth2: 100, imgWidth3: 120 });
    else setSize({ ...size, imgWidth1: 100, imgWidth2: 120, imgWidth3: 140 });

    return () => mounted = false
  }, [screens]);

  if(ws && ws.readyState == 1) {
    let urlObject;
    ws.onmessage = (msg) => {
      if(typeof msg.data == "string") {
        let obj = {}
        let msgSplit = msg.data.split(",")

        for(let val of msgSplit){
          let newVal = val.split(":")
          obj[newVal[0]] = newVal[1]
        }

        if(obj && obj.hasOwnProperty("kind") && obj.kind.toLowerCase() === "hydro") {
          const { ph, temp, tank, tds, ldr } = obj
          const dataHydro = { ph: ph, temp: temp, tank: tank, tds: tds, ldr: ldr };
          setStatistic((oldState) => [...oldState, dataHydro]);
          
          const x = Math.floor(new Date().getTime() / 1000);
          const y = +dataHydro["ph"];

          let { data } = seriesPh[0];
          data.push({ x, y });
          setSeriesPh([{ ...seriesPh[0], data }]);

          if (ApexCharts && ApexCharts.exec) {
            ApexCharts && ApexCharts.exec && ApexCharts.exec("realtime", "updateSeries", seriesPh);
          }
        }
      } else {
        if(urlObject) URL.revokeObjectURL(urlObject);
        urlObject = URL.createObjectURL(new Blob([msg.data]));
        setImage(urlObject);
      }
    }
  }

  const sendServoData = (horizontal, vertical) => {
    if (ws && ws.send && ws.readyState == 1 && showModalCam) {
      ws.send(`kind:set_value_servo,sh:${vertical},sv:${horizontal}`);
    }
  }

  /*JOYSTICK HANDLER*/
  let stateX = x
  const onUp = () => {
    if(stateX < MAX) {
      setX(s => {
        stateX = stateX + COUNT
        return s + COUNT
      })
    }
  }
  const onDown = () => {
    if(stateX > MIN) {
      setX(s => {
        stateX = stateX - COUNT
        return s - COUNT
      })
    }
  }
  let stateY = y
  const onLeft = () => {
    if(stateY > MIN) {
      setY(s => {
        stateY = stateY - COUNT
        return s - COUNT
      })
    }
  }
  const onRight = () => {
    if(stateY < MAX) {
      setY(s => {
        stateY = stateY + COUNT
        return s + COUNT
      })
    }
  }
  /*JOYSTICK HANDLER*/

  /*MODAL CAMERA*/
  const onShowModalCamConfigHandler = () => {
    setShowModalCamConfig(true);
  };

  const onCloseModalCamConfigHandler = () => {
    setShowModalCamConfig(false);
  };

  const onShowModalCamHandler = () => {
    setShowModalCam(true);
    if (ws && ws.send && ws.readyState == 1) {
      ws.send(`kind:live_cam_true`);
    }
  };

  const onCloseModalCamHandler = () => {
    setShowModalCam(false);
    if (ws && ws.send && ws.readyState == 1) {
      ws.send(`kind:live_cam_false`);
      setImage("");
    }
  };

  useEffect(() => {
    if (ws && ws.send && ws.readyState == 1) {
      if (showModalCam) ws.send(`kind:live_cam_true`);
      else ws.send(`kind:live_cam_false`);
    }

    if (showModalCam) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [showModalCam]);

  useEffect(() => {
    if((x >= MIN && x <= MAX) && (y >= MIN && y <= MAX)) {
      sendServoData(x, y)
    }
  }, [x, y])

  const onJoyStickMoved = ({ direction }) => {
    if(direction) setJoyDirection(direction)
  };
  /*MODAL CAMERA*/

  useEffect(() => {
    const cookies = nookies.get()
    if(user && user.role !== "admin" && !Boolean(cookies.final_setup)){
      setShowModalSetup(true)
    }
  }, [user])

  useEffect(() => {
    if(user && user.role === "admin") {
      setShowModalSetup(false)
    }
  }, [user])

  useEffect(() => {
    let interval

    if(joyStatus === "start") {
      interval = setInterval(() => {
        switch (joyDirection) {
          case "BACKWARD": return onUp()
          case "FORWARD": return onDown()
          case "RIGHT": return onLeft()
          case "LEFT": return onRight()
          default: return sendServoData(x, y)
        }
      }, DELAY)
    }

    if(joyStatus === "stop") {
      setJoyDirection("")
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [joyStatus, joyDirection])

  return (
    <>
      <div className="header-dashboard">
        <h1 className="h1 bold mb0">Monitoring Status</h1>
        <span className="header-date">
          {moment().format("dddd, DD MMMM YYYY")}
        </span>
      </div>

      <Layout>
        <Layout.Content>
          <Row gutter={[20, 20]}>
            <Col lg={16} md={24} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  {statistic[statisticLength - 1].ph} pH
                </h2>
                <span className="header-date">Power of Hydrogen</span>
                <div className="chart">
                  <Chart type="area" series={seriesPh} options={optionsPH} height={heightPh} />
                </div>
              </Card>
            </Col>

            <Col lg={8} md={24} sm={24} xs={24}>
              <Row gutter={[20, 20]}>
                <Col lg={24} md={12} sm={24} xs={24}>
                  <Card className="radius1rem shadow1 card-dashboard h-100" bordered={false}>
                    <h2 className="h2 bold mb1 line-height-1">
                      Water Temp
                    </h2>
                    <div className="text-center items-center mt2">
                      <Image width={imgWidth2} height={imgWidth2} src={Temperature} className="ml5" alt="temperature" />
                      <h3 className="h2 bold mb0 mt2">
                        {statistic[statisticLength - 1].temp}&#176;
                        <span className="regular header-date">C</span>
                      </h3>
                    </div>
                  </Card>
                </Col>

                <Col lg={24} md={12} sm={24} xs={24}>
                  <Card className="radius1rem shadow1 card-dashboard h-100" bordered={false}>
                    <h2 className="h2 bold mb1 line-height-1">
                      Water Tank
                      {statistic[statisticLength - 1].tank < 50 && (
                        <Tag className="right tag-condition bad">Bad</Tag>
                      )}
                      {statistic[statisticLength - 1].tank > 50 && statistic[statisticLength - 1].tank < 70 && (
                        <Tag className="right tag-condition medium">Medium</Tag>
                      )}
                      {statistic[statisticLength - 1].tank > 70 && (
                        <Tag className="right tag-condition good">Good</Tag>
                      )}
                      {/*Bad / Medium / Good*/}
                    </h2>
                    <div className="text-center items-center mt1">
                      <Image width={imgWidth3} height={imgWidth3} src={WaterTank} alt="water-tank" className="mln1" />
                      <h3 className="h2 bold mb0">
                        {statistic[statisticLength - 1].tank}%
                      </h3>
                      <h4 className="h3 header-date mb0">Remaining</h4>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={[20, 20]} style={{ marginTop: "20px" }}>
            <Col xl={8} lg={8} md={12} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100 card-plant-dashboard" bordered={false}>
                <h2 className="h2 bold mb0 line-height-1 flex justify-between">
                  Plant
                  <Space>
                    <span onClick={onShowModalCamConfigHandler}>
                      <Image width={25} height={25} src={Camera} alt="camera" className="hover-pointer" />
                    </span>
                    <Divider type="vertical" className="divider-cam" />
                    <span onClick={onShowModalCamHandler}>
                      <Image width={24} height={24} src={Play} alt="camera" className="hover-pointer" />
                    </span>
                  </Space>
                </h2>
                <div className="text-center items-center m-t-17">
                  <Image width={imgWidth1} height={imgWidth1} src={Sawi} alt="plant" />
                  <h3 className="h2 bold mb0">
                    <span className="regular header-date">Sawi Manis</span>
                  </h3>
                </div>
              </Card>
            </Col>

            <Col xl={8} lg={8} md={12} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100 monitor-card" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  Nutrition
                  <Tag className="right tag-condition bad">Bad</Tag>
                  {/*Bad / Good*/}
                </h2>
                <div className="text-center items-center mt2">
                  <Image width={imgWidth1} height={imgWidth1} src={Plant} alt="plant" />
                  <h3 className="h2 bold mb0">
                    {statistic[statisticLength - 1].tds}
                    <span className="regular header-date"> ppm</span>
                  </h3>
                </div>
              </Card>
            </Col>

            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100 monitor-card" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">Light Status</h2>
                <AnimatePresence>
                  <div>
                    {statistic[statisticLength - 1].ldr == "bright" && (
                      <motion.div 
                        className="text-center items-center mt2"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                      >
                        <Image width={imgWidth1} height={imgWidth1} src={Sun} alt="temperature" />
                        <h3 className="h2 bold mb0">
                          <span className="regular header-date">Bright</span>
                        </h3>
                      </motion.div>
                    )}
                  </div>
                </AnimatePresence>
                <AnimatePresence>
                  <div>
                    {statistic[statisticLength - 1].ldr == "dark" && (
                      <motion.div 
                        className="text-center items-center mt2"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                      >
                        <Image width={imgWidth1} height={imgWidth1} src={Moon} alt="temperature" />
                        <h3 className="h2 bold mb0">
                          <span className="regular header-date">Dark</span>
                        </h3>
                      </motion.div>
                    )}
                  </div>
                </AnimatePresence>
              </Card>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>

      <ModalLiveCam
        image={image}
        visible={showModalCam}
        onMove={onJoyStickMoved}
        onClose={onCloseModalCamHandler}
        onStart={e => setJoyStatus(e.type)}
        onStart={e => setJoyStatus(e.type)}
      />

      <ModalConfigCam
        image={image}
        visible={showModalCamConfig}
        onClose={onCloseModalCamConfigHandler}
      />

      <Modal
        centered
        title={" "}
        zIndex="1030"
        footer={null}
        maskClosable={false}
        closable={false}
        visible={showModalSetup}
        className="modal-setting-profile noselect"
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        <Row justify="center">
          <Col xl={18} lg={18} md={20} sm={24} xs={24}>
            <Steps current={current} size="small" className="mb2">
              {steps.map(item => (
                <Steps.Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Col>
        </Row>
        <SetupProfileModal
          current={current}
          onStepChange={onStepChange}
          plantSelected={plantSelected}
          setPlantSelected={setPlantSelected}
        />
      </Modal>

      <AnimatePresence>
        {(showModalCam || showModalCamConfig) && (
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
          border-radius: 0.8rem;
        }
        @media only screen and (max-width: 725px) {
          :global(.live-img > .ant-image) {
            width: 100% !important;
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

        :global(.monitor-card .ant-card-body) {
          display: flex;
          flex-direction: column;
          height: 100%;
        }


        :global(.modal-setting-profile.ant-modal) {
          height: 100vh!important;
          width: 100vw!important;
          max-width: 100vw!important;
          padding-bottom: 0px;
          margin: 0px auto;
        }
        :global(.modal-setting-profile.ant-modal .ant-modal-content) {
          height: 100vh!important;
        }
        :global(.modal-setting-profile.ant-modal .ant-modal-content .ant-modal-header) {
          padding: 0px;
          border-bottom: 0px solid transparent;
        }
        :global(.modal-setting-profile.ant-modal .ant-modal-content .ant-modal-body) {
          height: 100vh;
          max-height: 100vh;
        }

        :global(.divider-cam) {
          height: 1.5em;
          margin: 0;
          margin-left: 1px;
          border-left: 1px solid rgb(0 0 0 / 24%);
        }

      `}</style>
    </>
  );
};

Dashboard.getInitialProps = async ctx => {
  let res = await axios.get(`/plants/all-plants?page=1&per_page=100`)
  ctx.store.dispatch(actions.getPlantSuccess(res.data))
}

export default withAuth(Dashboard)
