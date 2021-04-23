import { useState } from 'react'
import { Layout, Card, Row, Col, Image, Switch, Form, Button, InputNumber } from 'antd'

import { enterPressHandler } from 'lib/utility'
import { formSetting } from 'formdata/controlSetting'

import moment from 'moment'
import pageStyle from 'components/Dashboard/pageStyle.js'

const PumpOn = '/static/images/pump-on.svg'
const LampOn = '/static/images/lamp-on.svg'
const PumpOff = '/static/images/pump-off.svg'
const LampOff = '/static/images/lamp-off.svg'
const WaterPumpOn = '/static/images/water-pump-on.svg'
const WaterPumpOff = '/static/images/water-pump-off.svg'

const inputNumberProps = {
  min: 0,
  max: 10000,
  size: "large",
  className: "w-100"
}

const switchInitialProps = {
  checkedChildren: "ON",
  unCheckedChildren: "OFF"
}

const Controls = () => {
  const [lampState, setLampState] = useState(false)
  const [setting, setSetting] = useState(formSetting)
  const [waterPumpState, setWaterPumpState] = useState(false)
  const [nutritionPump, setNutritionPump] = useState({ phUp: false, phDown: false, tds: false })

  const { pu, pd, kp, kt, st } = setting
  const { phUp, phDown, tds } = nutritionPump

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
    if(pu.value !== "" && pu.value !== null) data += "pu:" + pu.value + ","
    if(pd.value !== "" && pd.value !== null) data += "pd:" + pd.value + ","
    if(kp.value !== "" && kp.value !== null) data += "kp:" + kp.value + ","
    if(kt.value !== "" && kt.value !== null) data += "kt:" + kt.value + ","
    if(st.value !== "" && st.value !== null) data += "st:" + st.value + ","

    let checkData = data.slice(-1)
    // check if there is "," in the last of the string and will deleted
    if(checkData === ",") checkData = data.slice(0, -1)
    else checkData = data

    console.log(`kind:set_value,${checkData}`)
  }
  /* SUBMIT FORM FUNCTION */

  /*NUTRITION PUMP HANDLER*/
  const onNutritionPumpHandler = (e, item) => {
    setNutritionPump({ ...nutritionPump, [item]: e })
  }
  /*NUTRITION PUMP HANDLER*/

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
                  <Image width={100} src={lampState ? LampOn : LampOff} preview={false} alt="lamp" style={{padding:'5px'}} />
                  <Row justify="space-around">
                    <Col span={24}>
                      <Switch checked={lampState} onChange={val => setLampState(val)} />
                      <p className="mb0 mt1">
                        {lampState ? "On" : "Off"}
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
                  <Image width={100} src={(phUp || phDown || tds) ? PumpOn : PumpOff} preview={false} alt="plant" />
                  <Row justify="space-around">
                    <Col span={8}>
                      <Switch 
                        checked={phUp} 
                        onChange={e => onNutritionPumpHandler(e, "phUp")}
                        {...switchInitialProps}
                      />
                      <p className="mb0 mt1">
                        pH Up
                      </p>
                    </Col>
                    <Col span={8}>
                      <Switch
                        checked={phDown}
                        onChange={e => onNutritionPumpHandler(e, "phDown")}
                        {...switchInitialProps}
                      />
                      <p className="mb0 mt1">
                        pH Down
                      </p>
                    </Col>
                    <Col span={8}>
                      <Switch
                        checked={tds}
                        onChange={e => onNutritionPumpHandler(e, "tds")}
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
                  <Image width={100} src={waterPumpState ? WaterPumpOn : WaterPumpOff} preview={false} alt="lamp" style={{padding:'5px'}} />
                  <Row justify="space-around">
                    <Col span={24}>
                      <Switch checked={waterPumpState} onChange={val => setWaterPumpState(val)} />
                      <p className="mb0 mt1">
                        {waterPumpState ? "On" : "Off"}
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
                  <h2 className="h2 bold mb0">Control Settings</h2>
                  <span className="header-date">Change value of component to get the best settings for your hydroponics</span>
                </div>
                <Form name="settings" layout="vertical" onKeyUp={e => enterPressHandler(e, onSubmitHandler)}>
                  <Row gutter={[20, 20]}>
                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Form.Item 
                        label="PH Up" 
                        className="m-b-0"
                      >
                        <InputNumber
                          {...inputNumberProps}
                          placeholder="PH up"
                          step={0.1}
                          value={pu.value}
                          onChange={e => onChangeHandler(e, "pu")}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24}>
                      <Form.Item
                        label="PH Down"
                        className="m-b-0"
                      >
                        <InputNumber
                          {...inputNumberProps}
                          placeholder="PH Down"
                          step={0.1}
                          value={pd.value}
                          onChange={e => onChangeHandler(e, "pd")}
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
                          value={kp.value}
                          onChange={e => onChangeHandler(e, "kp")}
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
                          value={kt.value}
                          onChange={e => onChangeHandler(e, "kt")}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24}>
                      <Form.Item
                        label="TDS Value"
                        className="m-b-0"
                      >
                        <InputNumber
                          {...inputNumberProps}
                          placeholder="TDS Value"
                          value={st.value}
                          onChange={e => onChangeHandler(e, "st")}
                        />
                      </Form.Item>
                    </Col>

                    <Col xl={24} lg={24} md={24} sm={24}>
                      <Form.Item className="m-b-0">
                        <Button type="primary" size="large" className="p-l-30 p-r-30" onClick={onSubmitHandler}>
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
    </>
  )
}

export default Controls
