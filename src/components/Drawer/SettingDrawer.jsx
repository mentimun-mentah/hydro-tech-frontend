import { useState } from 'react'
import { formSetting } from 'formdata/formSetting'
import { Row, Col, Form, Button, InputNumber } from 'antd'

const SettingDrawer = ({ wsClient }) => {
  const [setting, setSetting] = useState(formSetting)
  const { ph_up, ph_down, kalibrasi_ph, kalibrasi_tds, tds } = setting

  const initialProps = {
    min: 0,
    className: "w-100"
  }

  const onSettingChange = (e, item) => {
    const data = {
      ...setting,
      [item]: {
        ...setting[item], value: e, isValid: true, message: null
      }
    }
    setSetting(data)
  }

  const onSubmitSetting = e => {
    e.preventDefault()

    let dataString = ""
    if(ph_up.value !== "" && ph_up.value !== null) {
      dataString += "pu:" + ph_up.value + ","
    }
    if(ph_down.value !== "" && ph_down.value !== null) {
      dataString += "pd:" + ph_down.value + ","
    }
    if(kalibrasi_ph.value !== "" && kalibrasi_ph.value !== null) {
      dataString += "kp:" + kalibrasi_ph.value + ","
    }
    if(kalibrasi_tds.value !== "" && kalibrasi_tds.value !== null) {
      dataString += "kt:" + kalibrasi_tds.value + ","
    }
    if(tds.value !== "" && tds.value !== null) {
      dataString += "st:" + tds.value + ","
    }

    let checkString = dataString.slice(-1)
    // check if there is "," in the last of the string and will deleted
    if(checkString === ",") checkString = dataString.slice(0, -1)
    else checkString = dataString

    wsClient.send("kind:set_value,"+ checkString)
  }

  return(
    <>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col md={12} xs={24}>
            <Form.Item name="ph_up" label="PH UP" className="mb0">
              <InputNumber 
                {...initialProps}
                max={10} 
                step={0.1}
                placeholder="PH UP" 
                value={ph_up.value}
                onChange={e => onSettingChange(e, "ph_up")}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="ph_down" label="PH DOWN" className="mb0">
              <InputNumber 
                {...initialProps}
                max={10} 
                step={0.1}
                placeholder="PH DOWN" 
                value={ph_down.value}
                onChange={e => onSettingChange(e, "ph_down")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col md={12} xs={24}>
            <Form.Item name="kalibrasi_ph" label="PH CALIBRATION SENSOR" className="mb0">
              <InputNumber 
                {...initialProps}
                max={1000}
                placeholder="Calibrate PH sensor" 
                value={kalibrasi_ph.value}
                onChange={e => onSettingChange(e, "kalibrasi_ph")}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item name="kalibrasi_tds" label="TDS SENSOR CALIBRATION" className="mb0">
              <InputNumber 
                {...initialProps}
                max={1000}
                placeholder="Calibrate TDS sensor" 
                value={kalibrasi_tds.value}
                onChange={e => onSettingChange(e, "kalibrasi_tds")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item name="tds" label="SET TDS" className="mb0">
              <InputNumber 
                {...initialProps}
                max={1000}
                placeholder="Set TDS" 
                value={tds.value}
                onChange={e => onSettingChange(e, "tds")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col sm={24}>
            <Form.Item>
              <Button 
                block 
                type="primary"
                onClick={onSubmitSetting}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </>
  )
}

export default SettingDrawer
