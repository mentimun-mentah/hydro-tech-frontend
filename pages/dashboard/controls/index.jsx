import { withAuth } from "lib/withAuth";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { useState, useContext, useEffect } from 'react'
import { Layout, Card, Row, Col, Switch, Form, Button, InputNumber, Tag, message } from 'antd'

import { enterPressHandler, deepCopy } from 'lib/utility'
import { WebSocketContext } from 'components/Layout/dashboard'
import { jsonHeaderHandler, signature_exp, resNotification, formErrorMessage } from 'lib/axios'
import { formSetting, formServo, formServoIsValid, formSettingIsValid } from 'formdata/controlSetting'

import moment from 'moment'
import axios from 'lib/axios'
import Image from 'next/image'
import * as actions from 'store/actions'
import RcInputNumber from 'rc-input-number'
import ErrorMessage from 'components/ErrorMessage'
import pageStyle from 'components/Dashboard/pageStyle.js'

const PumpOn = '/static/images/pump-on.svg'
const LampOn = '/static/images/lamp-on.svg'
const PumpOff = '/static/images/pump-off.svg'
const LampOff = '/static/images/lamp-off.svg'
const WaterPumpOn = '/static/images/water-pump-on.svg'
const WaterPumpOff = '/static/images/water-pump-off.svg'

message.config({ maxCount: 1 });

const inputNumberProps = {
  step: "0.01",
  size: "large",
  className: "w-100"
}

const switchInitialProps = {
  checkedChildren: "ON",
  unCheckedChildren: "OFF"
}

const delay = 5000

const Controls = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { ws } = useContext(WebSocketContext)

  const settingUsers = useSelector(state => state.settingUsers)

  const [camera, setCamera] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [setting, setSetting] = useState(formSetting)
  const [isSystemSetting, setIsSystemSetting] = useState(true)

  const [lamp, setLamp] = useState(false)
  const [phup, setPhup] = useState(false)
  const [phdown, setPhdown] = useState(false)
  const [solenoid, setSolenoid] = useState(false)
  const [nutrition, setNutrition] = useState(false)

  const [servo, setServo] = useState(formServo)

  const { servo_horizontal, servo_vertical } = servo
  const { ph_max, ph_min, tds_min, ph_cal, tds_cal, tank_height, tank_min } = setting

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e && e.preventDefault()
    let data = ""
    if(ph_max.value !== "" && ph_max.value !== null) data += "phmax:" + parseFloat(ph_max.value).toFixed(2) + ","
    if(ph_min.value !== "" && ph_min.value !== null) data += "phmin:" + parseFloat(ph_min.value).toFixed(2) + ","
    if(tds_min.value !== "" && tds_min.value !== null) data += "tdsmin:" + parseFloat(tds_min.value).toFixed(2) + ","
    if(ph_cal.value !== "" && ph_cal.value !== null) data += "phcal:" + parseFloat(ph_cal.value).toFixed(2) + ","
    if(tds_cal.value !== "" && tds_cal.value !== null) data += "tdscal:" + parseFloat(tds_cal.value).toFixed(2) + ","
    if(tank_height.value !== "" && tank_height.value !== null) data += "tankheight:" + tank_height.value + ","
    if(tank_min.value !== "" && tank_min.value !== null) data += "tankmin:" + tank_min.value + ","

    let checkData = data.slice(-1)
    // check if there is "," in the last of the string and will deleted
    if(checkData === ",") checkData = data.slice(0, -1)
    else checkData = data

    console.log(`${checkData},kind:set_hydro`)

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
    if(router.pathname === "/dashboard/controls") {
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
  }
  /*WEBSOCKET MESSAGE*/

  const sendWsHandler = (data) => { 
    ws.send(data) 
  }

  const onLampChange = val => {
    if(ws && ws.send && ws.readyState == 1) {
      setLamp(val)
      setIsSending(true)

      setTimeout(() => {
        setIsSending(true)
      }, delay)

      const data = `lamp:${val?"on":"off"},phup:${phup?"on":"off"},phdown:${phdown?"on":"off"},nutrition:${nutrition?"on":"off"},solenoid:${solenoid?"on":"off"},kind:set_hydro`
      sendWsHandler(data)
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
    }
  }


  /* CONTROL SETTING FUNCTION */
  const onChangeControlType = val => {
    setIsSystemSetting(val)
    axios.put("/setting-users/change-control-type", null, jsonHeaderHandler())
      .then(res => {
        formErrorMessage("success", res.data.detail)
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail == signature_exp) {
          formErrorMessage("success", `Successfully change the control type to ${val}.`)
        }
        else if(typeof(errDetail) === "string" && errDetail !== signature_exp){
          formErrorMessage("error", errDetail)
        }
        else {
          formErrorMessage("error", "Something was wrong!")
        }
      })

    let data = ""

    // from false to true
    if(val) {
      if(settingUsers && settingUsers.mySetting) {
        const { plants_ph_max, plants_ph_min, plants_tds_min } = settingUsers.mySetting
        const copySetting = deepCopy(setting)
        const dataSetting = {
          ...copySetting, 
          ph_max: { value: plants_ph_max, isValid: true, message: null },
          ph_min: { value: plants_ph_min, isValid: true, message: null },
          tds_min: { value: plants_tds_min, isValid: true, message: null },
        }
        setSetting(dataSetting)

        if(settingUsers.mySetting.plants_ph_max) {
          data += "phmax:" + parseFloat(plants_ph_max).toFixed(2) + ","
        }
        if(settingUsers.mySetting.plants_ph_min) {
          data += "phmin:" + parseFloat(plants_ph_min).toFixed(2) + ","
        }
        if(settingUsers.mySetting.plants_tds_min) {
          data += "tdsmin:" + parseFloat(plants_tds_min).toFixed(2) + ","
        }

        let checkData = data.slice(-1)
        // check if there is "," in the last of the string and will deleted
        if(checkData === ",") checkData = data.slice(0, -1)
        else checkData = data

        if (ws && ws.send && ws.readyState == 1) {
          setIsSending(true)
          console.log(`${checkData},kind:set_hydro`)
          ws.send(`${checkData},kind:set_hydro`)
        }

      }
    } else {

      // from true to false
      if(settingUsers && settingUsers.mySetting) {
        const { setting_users_ph_max, setting_users_ph_min, setting_users_tds_min } = settingUsers.mySetting
        const copySetting = deepCopy(setting)
        const dataSetting = {
          ...copySetting, 
          ph_max: { value: setting_users_ph_max, isValid: true, message: null },
          ph_min: { value: setting_users_ph_min, isValid: true, message: null },
          tds_min: { value: setting_users_tds_min, isValid: true, message: null },
        }
        setSetting(dataSetting)
      }
    }
  }

  const onChangeHandler = (e, item) => {
    const data = {
      ...setting,
      [item]: { ...setting[item], value: e, isValid: true, message: null, },
    };
    setSetting(data)
  }

  const onSubmitControlSetting = e => {
    e && e.preventDefault()
    if(formSettingIsValid(setting, setSetting)) {
      setLoading(true)
      const data = {
        ph_max: parseFloat(ph_max.value).toFixed(2),
        ph_min: parseFloat(ph_min.value).toFixed(2), 
        tds_min: parseFloat(tds_min.value).toFixed(2),
        ph_cal: parseFloat(ph_cal.value).toFixed(2),
        tds_cal: parseFloat(tds_cal.value).toFixed(2),
        tank_height: tank_height.value,
        tank_min: tank_min.value
      }

      axios.put("/setting-users/change-settings", data, jsonHeaderHandler())
        .then(res => {
          setLoading(false)
          resNotification("success", "Success", res.data.detail)
          onSubmitHandler()
          dispatch(actions.getSettingUsersMySetting())
        })
        .catch(err => {
          setLoading(false)
          const state = deepCopy(setting)
          console.log(err)
          const errDetail = err.response.data.detail;
          if(errDetail == signature_exp) {
            resNotification("success", "Success", "Successfully update the control setting.")
            onSubmitHandler()
            dispatch(actions.getSettingUsersMySetting())
          }
          else if(typeof(errDetail) === "string" && errDetail !== signature_exp){
            formErrorMessage("error", errDetail)
          }
          else {
            errDetail.map((data) => {
              const key = data.loc[data.loc.length - 1];
              if(state[key]){
                state[key].isValid = false
                state[key].message = data.msg
              }
            });
          }
          setSetting(state)
        })
    }
  }
  /* CONTROL SETTING FUNCTION */


  /* SERVO SETTING FUNCTION */
  const onChangeServoSettingHandler = (e, item) => {
    const data = {
      ...servo,
      [item]: { ...servo[item], value: e, isValid: true, message: null, },
    };
    setServo(data)
  }

  const onSubmitServo = e => {
    e.preventDefault()
    if(formServoIsValid(servo, setServo)) {
      setLoading(true)
      const data = {
        servo_horizontal: servo_horizontal.value,
        servo_vertical: servo_vertical.value
      }

      axios.put("/setting-users/change-servo", data, jsonHeaderHandler())
        .then(res => {
          setLoading(false)
          resNotification("success", "Success", res.data.detail)
        })
        .catch(err => {
          setLoading(false)
          const state = deepCopy(servo)
          const errDetail = err.response.data.detail;
          if(errDetail == signature_exp) {
            resNotification("success", "Success", "Successfully update the servo setting.")
          }
          else if(typeof(errDetail) === "string" && errDetail !== signature_exp){
            formErrorMessage("error", errDetail)
          }
          else {
            errDetail.map((data) => {
              const key = data.loc[data.loc.length - 1];
              if(state[key]){
                state[key].isValid = false
                state[key].message = data.msg
              }
            });
          }
          setServo(state)
        })
    }
  }
  /* SERVO SETTING FUNCTION */


  useEffect(() => {
    dispatch(actions.getSettingUsersMySetting())
    const timeout = setTimeout(() => {
      dispatch(actions.getSettingUsersMySetting())
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if(settingUsers && settingUsers.mySetting) {
      // for servo
      const { setting_users_servo_horizontal: servo_horizontal, setting_users_servo_vertical: servo_vertical, setting_users_camera } = settingUsers.mySetting
      // for control setting
      const { setting_users_control_type: control_type, plants_ph_max, plants_ph_min, plants_tds_min } = settingUsers.mySetting
      const { setting_users_tds_cal: tds_cal, setting_users_tank_height: tank_height, setting_users_tank_min: tank_min } = settingUsers.mySetting
      const { setting_users_ph_max: ph_max, setting_users_ph_min: ph_min, setting_users_tds_min: tds_min, setting_users_ph_cal: ph_cal } = settingUsers.mySetting

      setCamera(setting_users_camera)
      setIsSystemSetting(control_type)

      const dataServo = {
        ...servo,
        servo_horizontal: { value: servo_horizontal, isValid: true, message: null },
        servo_vertical: { value: servo_vertical, isValid: true, message: null },
      };
      setServo(dataServo)

      const dataSetting = {
        ...setting, 
        ph_max: { value: control_type ? plants_ph_max : ph_max, isValid: true, message: null },
        ph_min: { value: control_type ? plants_ph_min : ph_min, isValid: true, message: null },
        tds_min: { value: control_type ? plants_tds_min : tds_min, isValid: true, message: null },
        ph_cal: { value: ph_cal, isValid: true, message: null },
        tds_cal: { value: tds_cal, isValid: true, message: null },
        tank_height: { value: tank_height, isValid: true, message: null },
        tank_min: { value: tank_min, isValid: true, message: null },
      }
      setSetting(dataSetting)

    }
  }, [settingUsers])

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
                      <Switch checked={isSystemSetting} onChange={onChangeControlType} />
                    </Col>
                  </Row>
                  <span className="header-date">Change value of component to get the best settings for your hydroponics</span>
                </div>
                <Form name="control-settings" layout="vertical" onKeyUp={e => enterPressHandler(e, onSubmitHandler)}>
                  <Row gutter={[20, 20]}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item 
                        label={`PH Maximum`}
                        className="m-b-0"
                      >
                        <RcInputNumber
                          step="0.01"
                          min={0} max={20}
                          value={ph_max.value}
                          className="w-100 rc-number-lg"
                          prefixCls="ant-input-number"
                          placeholder="PH Maximum"
                          disabled={isSystemSetting}
                          onChange={e => onChangeHandler(e, "ph_max")}
                        />
                        <ErrorMessage item={ph_max} />
                      </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={`PH Minimum`}
                        className="m-b-0"
                      >
                        <InputNumber
                          step="0.01"
                          size="large"
                          min={0} max={20}
                          className="w-100"
                          value={ph_min.value}
                          placeholder="PH Minimum"
                          disabled={isSystemSetting}
                          onChange={e => onChangeHandler(e, "ph_min")}
                        />
                        <ErrorMessage item={ph_min} />
                      </Form.Item>
                    </Col>

                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Form.Item
                        label={`TDS Minimum`}
                        className="m-b-0"
                      >
                        <InputNumber
                          step="0.01"
                          size="large"
                          className="w-100"
                          min={0} max={3000}
                          value={tds_min.value}
                          placeholder="TDS Minimum"
                          disabled={isSystemSetting}
                          onChange={e => onChangeHandler(e, "tds_min")}
                        />
                        <ErrorMessage item={tds_min} />
                      </Form.Item>
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={`PH Calibration`}
                        className="m-b-0"
                      >
                        <InputNumber
                          {...inputNumberProps}
                          min={0} max={10000}
                          placeholder="PH Calibration"
                          value={ph_cal.value}
                          onChange={e => onChangeHandler(e, "ph_cal")}
                        />
                        <ErrorMessage item={ph_cal} />
                      </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label={`TDS Calibration`}
                        className="m-b-0"
                      >
                        <InputNumber
                          {...inputNumberProps}
                          min={0} max={10000}
                          placeholder="TDS Calibration"
                          value={tds_cal.value}
                          onChange={e => onChangeHandler(e, "tds_cal")}
                        />
                        <ErrorMessage item={tds_cal} />
                      </Form.Item>
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label="Water Tank Height"
                        className="m-b-0"
                      >
                        <div className="ant-input-group-wrapper">
                          <div className="ant-input-wrapper ant-input-group input-group-variant" style={{ zIndex: 1 }}>
                            <InputNumber
                              {...inputNumberProps}
                              step={1} min={0} max={1000000}
                              placeholder="Water Tank Height"
                              className="w-100 bor-right-rad-0"
                              value={tank_height.value}
                              onChange={e => onChangeHandler(e, "tank_height")}
                            />
                            <span className="ant-input-group-addon bor-right-rad-05rem">cm</span>
                          </div>
                        </div>
                        <ErrorMessage item={tank_height} />
                      </Form.Item>
                    </Col>

                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        label="Water Tank Minimum"
                        className="m-b-0"
                      >
                        <div className="ant-input-group-wrapper">
                          <div className="ant-input-wrapper ant-input-group input-group-variant" style={{ zIndex: 1 }}>
                            <InputNumber
                              {...inputNumberProps}
                              step={1} min={0} max={1000000}
                              placeholder="Water Tank Min"
                              className="w-100 bor-right-rad-0"
                              value={tank_min.value}
                              onChange={e => onChangeHandler(e, "tank_min")}
                            />
                            <span className="ant-input-group-addon bor-right-rad-05rem">cm</span>
                          </div>
                        </div>
                        <ErrorMessage item={tank_min} />
                      </Form.Item>
                    </Col>

                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Form.Item className="m-b-0">
                        <Button 
                          type="primary"
                          size="large"
                          className="p-l-30 p-r-30"
                          // disabled={isSending || ws.readyState !== 1}
                          // onClick={onSubmitHandler}
                          onClick={onSubmitControlSetting}
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


          {camera && (
            <Row gutter={[20, 20]} className="m-t-20">
              <Col span={24}>
                <Card className="radius1rem shadow1 h-100" bordered={false}>
                  <div className="header-dashboard">
                    <h2 className="h2 bold mb0">Servo Settings</h2>
                    <span className="header-date">
                      This setting is to return the servo to its original position
                    </span>
                  </div>
                  <Form name="settings" layout="vertical">
                    <Row gutter={[20, 20]}>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item 
                          label="Servo Horizontal" 
                          className="m-b-0"
                        >
                          <InputNumber
                            {...inputNumberProps}
                            step={1} min={0} max={180}
                            value={servo_horizontal.value}
                            placeholder="Servo Horizontal (0-180)"
                            onChange={e => onChangeServoSettingHandler(e, "servo_horizontal")}
                          />
                          <ErrorMessage item={servo_horizontal} />
                        </Form.Item>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item
                          label="Servo Vertical"
                          className="m-b-0"
                        >
                          <InputNumber
                            {...inputNumberProps}
                            step={1} min={0} max={180}
                            value={servo_vertical.value}
                            placeholder="Servo Vertical (0-180)"
                            onChange={e => onChangeServoSettingHandler(e, "servo_vertical")}
                          />
                          <ErrorMessage item={servo_vertical} />
                        </Form.Item>
                      </Col>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item className="m-b-0">
                          <Button 
                            size="large"
                            type="primary"
                            className="p-l-30 p-r-30"
                            onClick={onSubmitServo}
                            disabled={loading}
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
          )}
          
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

Controls.getInitialProps = async ctx => {
  if(ctx.req) axios.defaults.headers.get.Cookie = ctx.req.headers.cookie;
  try {
    const res = await axios.get("/setting-users/my-setting")
    ctx.store.dispatch(actions.getSettingUsersMySettingSuccess(res.data))
  }
  catch (err) {}
}

export default withAuth(Controls)
