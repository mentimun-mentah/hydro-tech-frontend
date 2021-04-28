import { withAuth } from "lib/withAuth";
import { Joystick } from "react-joystick-component";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { Layout, Card, Row, Col, Tag, Modal, Grid, Image as AntImage } from "antd";

import { optionsPH } from "components/Dashboard/apexOption";
import { WebSocketContext } from 'components/Layout/dashboard';
import { seriesDayGrowth, optionsDayGrowthData, seriesWeekGrowth, optionsWeekGrowthData, } from "components/Dashboard/apexOption";

import moment from "moment";
import nookies from "nookies";
import Image from "next/image";
import dynamic from "next/dynamic";
import pageStyle from "components/Dashboard/pageStyle.js";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Camera = "/static/images/camera.svg";
const Sun = "/static/images/sun-outline.gif";
const Moon = "/static/images/moon.gif";
const Loader1 = "/static/images/loader-1.gif";
const Plant = "/static/images/leaf-outline.gif";
const WaterTank = "/static/images/water-tank.svg";
const Lecttuce = "/static/images/plant/lecttuce.png";
const Temperature = "/static/images/temperature.gif";

const max_width_height = 90;
const DAY = "DAY", WEEK = "WEEK";
const useBreakpoint = Grid.useBreakpoint;
const initDataSeries = [{ name: "pH", data: [] }];
const initStatistic = { kind: "", sh: "0", tds: "0", ldr: "0", ta: "0", ph: "0", };
const initialStatistic = { temp: "0", tank: "0", tds: "0", ldr: "bright", ph: "0", };

const Dashboard = () => {
  const screens = useBreakpoint();
  const ws = useContext(WebSocketContext)

  const [image, setImage] = useState("");
  const [heightPh, setHeightPh] = useState(465);
  const [showModalCam, setShowModalCam] = useState(false);
  const [seriesPh, setSeriesPh] = useState(initDataSeries);
  // const [statistic, setStatistic] = useState([initStatistic]);
  const [statistic, setStatistic] = useState([initialStatistic]);
  const [size, setSize] = useState({ imgWidth1: 100, imgWidth2: 120, imgWidth3: 140, });

  const statisticLength = statistic.length;
  const { imgWidth1, imgWidth2, imgWidth3 } = size;

  useEffect(() => {
    let mounted = true;
    if (mounted && !screens.lg) setHeightPh(265);
    else setHeightPh(465);

    if (mounted && screens.xs) setSize({ ...size, imgWidth1: 80, imgWidth2: 100, imgWidth3: 120 });
    else setSize({ ...size, imgWidth1: 100, imgWidth2: 120, imgWidth3: 140 });

    return () => mounted = false
  }, [screens]);

  // useEffect(() => {
  //   return false
  //   const interval = setInterval(() => {
  //     const ph = (Math.random() * (15 - 7) + 1 + 7).toFixed(2); //power of hydrogen
  //     const ta = Math.floor(Math.random() * (98 - 70) + 1 + 70).toString(); //tinggi air
  //     const sh = Math.floor(Math.random() * (30 - 26) + 1 + 26).toString(); //suhu
  //     const ldr = Math.floor(Math.random() * (600 - 500) + 1 + 500).toString(); //cahaya
  //     const tds = Math.floor(Math.random() * (1000 - 800) + 1 + 800).toString(); //nutrisi

  //     const dataFromArduino = { kind: "IoT", sh: sh, tds: tds, ldr: ldr, ta: ta, ph: ph, };

  //     if (dataFromArduino.hasOwnProperty("kind") && dataFromArduino.kind.toLowerCase() === "iot") {
  //       setStatistic((oldState) => [...oldState, dataFromArduino]);

  //       const x = Math.floor(new Date().getTime() / 1000);
  //       const y = +dataFromArduino["ph"];

  //       let { data } = seriesPh[0];
  //       data.push({ x, y });
  //       setSeriesPh([{ ...seriesPh[0], data }]);

  //       if (ApexCharts && ApexCharts.exec) {
  //         ApexCharts && ApexCharts.exec && ApexCharts.exec("realtime", "updateSeries", seriesPh);
  //       }
  //     }
  //   }, 7000);

  //   return () => clearInterval(interval);
  // }, []);


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
          console.log("message from Hydro", JSON.stringify(dataHydro, null, 2))
          
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
        console.log("image =>", msg.data)
        if(urlObject) URL.revokeObjectURL(urlObject);
        urlObject = URL.createObjectURL(new Blob([msg.data]));
        setImage(urlObject);
      }
    }
  }


  /*MODAL CAMERA*/
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

  const onJoyStickMoved = ({ x, y }) => {
    const center = 90;
    let horizontal = x * 2;
    let vertical = y * 2;

    if (horizontal == 0) horizontal = center;
    if (horizontal > 0) horizontal = center - x * 2;
    if (horizontal < 0) horizontal = center + Math.abs(x * 2);

    if (vertical == 0) vertical = center;
    if (vertical > 0) vertical = center - y * 2;
    if (vertical < 0) vertical = center + Math.abs(y * 2);

    console.log(`horizontal: ${horizontal}, vertical: ${vertical}`);

    if (ws && ws.send && ws.readyState == 1 && showModalCam) {
      ws.send(`kind:set_value_servo,sh:${horizontal},sv:${vertical}`);
    }
  };
  /*MODAL CAMERA*/

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
                  <Card
                    className="radius1rem shadow1 card-dashboard h-100"
                    bordered={false}
                  >
                    <h2 className="h2 bold mb1 line-height-1">
                      Water Temp
                    </h2>
                    <div className="text-center items-center mt2">
                      <Image
                        width={imgWidth2}
                        height={imgWidth2}
                        src={Temperature}
                        className="ml5"
                        alt="temperature"
                      />
                      <h3 className="h2 bold mb0 mt2">
                        {statistic[statisticLength - 1].temp}&#176;
                        <span className="regular header-date">C</span>
                      </h3>
                    </div>
                  </Card>
                </Col>

                <Col lg={24} md={12} sm={24} xs={24}>
                  <Card
                    className="radius1rem shadow1 card-dashboard h-100"
                    bordered={false}
                  >
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
                      <Image
                        width={imgWidth3}
                        height={imgWidth3}
                        src={WaterTank}
                        alt="water-tank"
                        className="mln1"
                      />
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
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb0 line-height-1 flex justify-between">
                  Plant
                  <span onClick={onShowModalCamHandler}>
                    <Image
                      width={32}
                      height={32}
                      src={Camera}
                      alt="camera"
                      className="hover-pointer"
                    />
                  </span>
                </h2>
                <div className="text-center items-center mt1">
                  <Image
                    width={imgWidth1}
                    height={imgWidth1}
                    src={Lecttuce}
                    alt="plant"
                  />
                  <h4 className="h3 header-date mb0 mt1">Lecttuce</h4>
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
                  <Image
                    width={imgWidth1}
                    height={imgWidth1}
                    src={Plant}
                    alt="plant"
                  />
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
                        <Image
                          width={imgWidth1}
                          height={imgWidth1}
                          src={Sun}
                          alt="temperature"
                        />
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
                        <Image
                          width={imgWidth1}
                          height={imgWidth1}
                          src={Moon}
                          alt="temperature"
                        />
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

      <Modal
        centered
        title={<b>Plant Camera</b>}
        zIndex="1030"
        width={700}
        footer={null}
        maskClosable={false}
        visible={showModalCam}
        onOk={onCloseModalCamHandler}
        bodyStyle={{ paddingTop: "0px" }}
        className="modal-modif noselect"
        onCancel={onCloseModalCamHandler}
        closeIcon={<i className="fas fa-times" />}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        {image == "" ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image width={100} height={100} src={Loader1} alt="loader" />
            <div className="fs-14 m-b-10">Connecting to camera...</div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center live-img">
              <AntImage src={image} width={640} height={480} preview={false} />
            </div>
            <div className="joystick-container">
              <Joystick
                size={90}
                throttle={100}
                baseColor="#00000057"
                stickColor="#0000008a"
                move={onJoyStickMoved}
              />
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
      `}</style>
    </>
  );
};

// export default withAuth(Dashboard)
export default Dashboard;
