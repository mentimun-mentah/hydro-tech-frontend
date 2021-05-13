import { withAuth } from "lib/withAuth";
import { useState, useContext } from 'react'
import { Layout, Card, Row, Col, Switch, Form, Button, InputNumber, Tag } from 'antd'

import { enterPressHandler } from 'lib/utility'
import { formSetting } from 'formdata/controlSetting'
import { WebSocketContext } from 'components/Layout/dashboard'

import moment from 'moment'
import Image from 'next/image'
import pageStyle from 'components/Dashboard/pageStyle.js'

const PumpOn = '/static/images/pump-on.svg'
const LampOn = '/static/images/lamp-on.svg'
const PumpOff = '/static/images/pump-off.svg'
const LampOff = '/static/images/lamp-off.svg'
const WaterPumpOn = '/static/images/water-pump-on.svg'
const WaterPumpOff = '/static/images/water-pump-off.svg'

const inputNumberProps = {
  step: "0.01",
  min: 0,
  max: 10000,
  size: "large",
  className: "w-100"
}

const switchInitialProps = {
  checkedChildren: "ON",
  unCheckedChildren: "OFF"
}

const delay = 5000

const Controls = () => {
  const ws = useContext(WebSocketContext)

  const [isSending, setIsSending] = useState(false)
  const [setting, setSetting] = useState(formSetting)
  const [isSystemSetting, setIsSystemSetting] = useState(true)

  const [lamp, setLamp] = useState(false)
  const [forceLamp, setForceLamp] = useState(false)

  const [solenoid, setSolenoid] = useState(false)
  const [forceSolenoid, setForceSolenoid] = useState(false)

  const [phup, setPhup] = useState(false)
  const [forcePhup, setForcePhup] = useState(false)

  const [phdown, setPhdown] = useState(false)
  const [forcePhdown, setForcePhdown] = useState(false)

  const [nutrition, setNutrition] = useState(false)
  const [forceNutrition, setForceNutrition] = useState(false)

  const { phmax, phmin, tdsmin, phcal, tdscal, tankheight, tankmin } = setting

  /* INPUT CHANGE FUNCTION */
  const onChangeHandler = (e, item) => {
    const data = {
      ...setting,
      [item]: { ...setting[item], value: e, isValid: true, message: null, },
    };
    setSetting(data)
  }
  /* INPUT CHANGE FUNCTION */

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.preventDefault()
    let data = ""
    if(phmax.value !== "" && phmax.value !== null) data += "phmax:" + parseFloat(phmax.value).toFixed(2) + ","
    if(phmin.value !== "" && phmin.value !== null) data += "phmin:" + parseFloat(phmin.value).toFixed(2) + ","
    if(tdsmin.value !== "" && tdsmin.value !== null) data += "tdsmin:" + parseFloat(tdsmin.value).toFixed(2) + ","
    if(phcal.value !== "" && phcal.value !== null) data += "phcal:" + parseFloat(phcal.value).toFixed(2) + ","
    if(tdscal.value !== "" && tdscal.value !== null) data += "tdscal:" + parseFloat(tdscal.value).toFixed(2) + ","
    if(tankheight.value !== "" && tankheight.value !== null) data += "tankheight:" + tankheight.value + ","
    if(tankmin.value !== "" && tankmin.value !== null) data += "tankmin:" + tankmin.value + ","

    let checkData = data.slice(-1)
    // check if there is "," in the last of the string and will deleted
    if(checkData === ",") checkData = data.slice(0, -1)
    else checkData = data

    if (ws && ws.send && ws.readyState == 1) {
      setIsSending(true)
      ws.send(`${checkData},kind:set_hydro`)
    }

  }
  /* SUBMIT FORM FUNCTION */

  /*WEBSOCKET MESSAGE*/
  let count = 0
  if(ws && ws.readyState == 1) {
    // kind:Hydro,ph:7.62,temp:24.56,tank:100,tds:421.93,ldr:bright,lamp:off,phup:off,phdown:on,nutrition:on,solenoid:off
    ws.onmessage = (msg) => {
      let obj = {}
      let msgSplit = msg.data.split(",")

      for(let val of msgSplit){
        let newVal = val.split(":")
        obj[newVal[0]] = newVal[1]
      }

      if(obj && obj.hasOwnProperty("kind") && obj.kind.toLowerCase() === "hydro") {
        if(isSending) count = count + 1
        
        if(obj.phup) setPhup(obj.phup == "on" ? true : false)

        if(obj.lamp) setLamp(obj.lamp == "on" ? true : false)

        if(obj.phdown) setPhdown(obj.phdown == "on" ? true : false)

        if(obj.solenoid) setSolenoid(obj.solenoid == "on" ? true : false)

        if(obj.nutrition) setNutrition(obj.nutrition == "on" ? true : false)

        if(count == 2) {
          count = 0
          setIsSending(false)
        }

      }
    }
  }
  /*WEBSOCKET MESSAGE*/

  const sendWsHandler = (data) => { ws.send(data) }

  const onLampChange = val => {
    if(ws && ws.send && ws.readyState == 1) {
      setLamp(val)
      setIsSending(true)

      setTimeout(() => {
        setIsSending(true)
      }, delay)

      const data = `lamp:${val?"on":"off"},phup:${phup?"on":"off"},phdown:${phdown?"on":"off"},nutrition:${nutrition?"on":"off"},solenoid:${solenoid?"on":"off"},kind:set_hydro`
      sendWsHandler(data)

      if(!lamp) setForceLamp(val)
      else setForceLamp(val)
    }
  }

  const onSolenoidChange = val => {
    if(ws && ws.send && ws.readyState == 1) {
      setSolenoid(val)
      setIsSending(true)

      setTimeout(() => {
        setIsSending(true)
      }, delay)

      const data = `lamp:${lamp?"on":"off"},phup:${phup?"on":"off"},phdown:${phdown?"on":"off"},nutrition:${nutrition?"on":"off"},solenoid:${val?"on":"off"},kind:set_hydro`
      sendWsHandler(data)

      if(!solenoid) setForceSolenoid(val)
      else setForceSolenoid(val)
    }
  }

  const onPhupChange = val => {
    if(ws && ws.send && ws.readyState == 1) {
      setPhup(val)
      setIsSending(true)

      setTimeout(() => {
        setIsSending(true)
      }, delay)

      const data = `lamp:${lamp?"on":"off"},phup:${val?"on":"off"},phdown:${phdown?"on":"off"},nutrition:${nutrition?"on":"off"},solenoid:${solenoid?"on":"off"},kind:set_hydro`
      sendWsHandler(data)

      if(!phup) setForcePhup(val)
      else setForcePhup(val)
    }
  }

  const onPhdownChange = val => {
    if(ws && ws.send && ws.readyState == 1) {
      setPhdown(val)
      setIsSending(true)

      setTimeout(() => {
        setIsSending(true)
      }, delay)

      const data = `lamp:${lamp?"on":"off"},phup:${phup?"on":"off"},phdown:${val?"on":"off"},nutrition:${nutrition?"on":"off"},solenoid:${solenoid?"on":"off"},kind:set_hydro`
      sendWsHandler(data)

      if(!phdown) setForcePhdown(val)
      else setForcePhdown(val)
    }
  }

  const onNutritionChange = val => {
    if(ws && ws.send && ws.readyState == 1) {
      setNutrition(val)
      setIsSending(true)

      setTimeout(() => {
        setIsSending(true)
      }, delay)

      const data = `lamp:${lamp?"on":"off"},phup:${phup?"on":"off"},phdown:${phdown?"on":"off"},nutrition:${val?"on":"off"},solenoid:${solenoid?"on":"off"},kind:set_hydro`
      sendWsHandler(data)

      if(!nutrition) setForceNutrition(val)
      else setForceNutrition(val)
    }
  }

  return(
    <>
      <div className="header-dashboard">
        <h1 className="h1 bold mb0">Control Status</h1>
        <span className="header-date">{moment().format("dddd, DD MMMM YYYY")}</span>
      </div>

      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col xl={7} lg={7} md={{ span: 12, order: 2 }} sm={{ span: 12, order: 2 }} xs={{ span: 24, order: 2 }}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  Lamp
                </h2>
                <div className="text-center items-center mt2">
                  <Image className="p-t-5 p-b-5 p-l-5 p-r-5" width={100} height={100} src={lamp ? LampOn : LampOff} alt="lamp" />
                  <Row justify="space-around">
                    <Col span={24}>
                      <Switch 
                        checked={lamp} 
                        onChange={onLampChange} 
                        disabled={isSending}
                      />
                      <p className="mb0 mt1">
                        {lamp ? "On" : "Off"}
                      </p>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>

            <Col xl={10} lg={{ span: 10, order: 2 }} md={{ span: 24, order: 1 }} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold line-height-1">Nutrition Pump</h2>
                <div className="text-center items-center">
                  <Image width={100} height={100} src={(phup || phdown || nutrition) ? PumpOn : PumpOff} alt="plant" />
                  <Row justify="space-around">
                    <Col span={8}>
                      <Switch 
                        checked={phup} 
                        disabled={isSending}
                        onChange={onPhupChange}
                        {...switchInitialProps}
                      />
                      <p className="mb0 mt1">
                        pH Up
                      </p>
                    </Col>
                    <Col span={8}>
                      <Switch
                        checked={phdown}
                        disabled={isSending}
                        onChange={onPhdownChange}
                        {...switchInitialProps}
                      />
                      <p className="mb0 mt1">
                        pH Down
                      </p>
                    </Col>
                    <Col span={8}>
                      <Switch
                        checked={nutrition}
                        disabled={isSending}
                        onChange={onNutritionChange}
                        {...switchInitialProps}
                      />
                      <p className="mb0 mt1">
                        Nutrition
                      </p>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>

            <Col xl={7} lg={7} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 24, order: 3 }}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  Solenoid valve
                </h2>
                <div className="text-center items-center mt2">
                  <Image 
                    alt="WaterPump" 
                    width={100}
                    height={100}
                    className="p-t-5 p-b-5 p-l-5 p-r-5"
                    src={solenoid ? WaterPumpOn : WaterPumpOff}
                  />
                  <Row justify="space-around">
                    <Col span={24}>
                      <Switch 
                        checked={solenoid} 
                        onChange={onSolenoidChange} 
                        disabled={isSending} 
                      />
                      <p className="mb0 mt1">
                        {solenoid ? "On" : "Off"}
                      </p>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[20, 20]} className="m-t-20">
            <Col span={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <div className="header-dashboard">
                  <Row align="middle" justify="space-between">
                    <Col>
                      <h2 className="h2 bold mb0">
                        Control Settings {isSystemSetting && <Tag className="vertical-align-middle" color="orange">by System</Tag>}
                      </h2>
                    </Col>
                    <Col>
                      <Switch checked={isSystemSetting} onChange={val => setIsSystemSetting(val)} />
                    </Col>
                  </Row>
                  <span className="header-date">Change value of component to get the best settings for your hydroponics</span>
                </div>
                <Form name="settings" layout="vertical" onKeyUp={e => enterPressHandler(e, onSubmitHandler)}>
                  <Row gutter={[20, 20]}>
                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Form.Item 
                        label="PH Maximum" 
                        className="m-b-0"
                      >
                        <InputNumber
                          {...inputNumberProps}
                          disabled={isSystemSetting}
                          placeholder="PH Maximum"
                          value={phmax.value}
                          onChange={e => onChangeHandler(e, "phmax")}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Form.Item
                        label="PH Minimum"
                        className="m-b-0"
                      >
                        <InputNumber
                          {...inputNumberProps}
                          disabled={isSystemSetting}
                          placeholder="PH Minimum"
                          value={phmin.value}
                          onChange={e => onChangeHandler(e, "phmin")}
                        />
                      </Form.Item>
                    </Col>

                    <Col xl={24} lg={24} md={24} sm={24}>
                      <Form.Item
                        label="TDS Minimum"
                        className="m-b-0"
                      >
                        <InputNumber
                          {...inputNumberProps}
                          disabled={isSystemSetting}
                          placeholder="TDS Minimum"
                          value={tdsmin.value}
                          onChange={e => onChangeHandler(e, "tdsmin")}
                        />
                      </Form.Item>
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Form.Item
                        label="PH Calibration"
                        className="m-b-0"
                      >
                        <InputNumber
                          {...inputNumberProps}
                          placeholder="PH Calibration"
                          value={phcal.value}
                          onChange={e => onChangeHandler(e, "phcal")}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Form.Item
                        label="TDS Calibration"
                        className="m-b-0"
                      >
                        <InputNumber
                          {...inputNumberProps}
                          placeholder="TDS Calibration"
                          value={tdscal.value}
                          onChange={e => onChangeHandler(e, "tdscal")}
                        />
                      </Form.Item>
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Water Tank Height"
                        className="m-b-0"
                      >
                        <div className="ant-input-group-wrapper">
                          <div className="ant-input-wrapper ant-input-group input-group-variant" style={{ zIndex: 1 }}>
                            <InputNumber
                              {...inputNumberProps}
                              step={1}
                              placeholder="Water Tank Height"
                              className="w-100 bor-right-rad-0"
                              value={tankheight.value}
                              onChange={e => onChangeHandler(e, "tankheight")}
                            />
                            <span className="ant-input-group-addon bor-right-rad-05rem">cm</span>
                          </div>
                        </div>
                      </Form.Item>
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Water Tank Minimum"
                        className="m-b-0"
                      >
                        <div className="ant-input-group-wrapper">
                          <div className="ant-input-wrapper ant-input-group input-group-variant" style={{ zIndex: 1 }}>
                            <InputNumber
                              {...inputNumberProps}
                              step={1}
                              placeholder="Water Tank Min"
                              className="w-100 bor-right-rad-0"
                              value={tankmin.value}
                              onChange={e => onChangeHandler(e, "tankmin")}
                            />
                            <span className="ant-input-group-addon bor-right-rad-05rem">cm</span>
                          </div>
                        </div>
                      </Form.Item>
                    </Col>

                    <Col xl={24} lg={24} md={24} sm={24}>
                      <Form.Item className="m-b-0">
                        <Button 
                          type="primary"
                          size="large"
                          className="p-l-30 p-r-30"
                          disabled={isSending || ws.readyState !== 1}
                          onClick={onSubmitHandler}
                        >
                          <b>Save</b>
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
          
        </Layout.Content>
      </Layout>


      <style jsx>{pageStyle}</style>
      <style jsx>{`
        :global(.bor-right-rad-0) {
          border-top-right-radius: 0!important;
          border-bottom-right-radius: 0!important;
        }
        :global(.bor-right-rad-05rem) {
          border-top-right-radius: .5rem!important;
          border-bottom-right-radius: .5rem!important;
        }
      `}</style>
    </>
  )
}

export default withAuth(Controls)
