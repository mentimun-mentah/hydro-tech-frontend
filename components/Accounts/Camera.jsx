import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Space, Row, Col, Switch, message } from 'antd'

import { jsonHeaderHandler, signature_exp, formErrorMessage } from 'lib/axios'

import axios from 'lib/axios'
import Image from 'next/image'

const IoTCamera = "/static/images/iot-camera-1.png";

message.config({ maxCount: 1 });

const CameraContainer = () => {
  const settingUsers = useSelector(state => state.settingUsers)

  const [camera, setCamera] = useState(false)

  /* CHANGE CAMERA FUNCTION */
  const onChangeCamera = val => {
    setCamera(val)
    axios.put('/setting-users/change-camera', null, jsonHeaderHandler())
      .then(res => {
        formErrorMessage("success", res.data.detail)
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail == signature_exp) {
          formErrorMessage("success", `Successfully change the camera to ${val}.`)
        }
        else if(typeof(errDetail) === "string" && errDetail !== signature_exp) {
          formErrorMessage("error", errDetail)
        }
        else {
          formErrorMessage("error", "Something was wrong!")
        }
      })
  }
  /* CHANGE CAMERA FUNCTION */

  useEffect(() => {
    if(settingUsers && settingUsers.mySetting) {
      setCamera(settingUsers.mySetting.setting_users_camera)
    }
  }, [settingUsers])


  return (
    <>
      <h1 className="fs-16 bold">IoT Camera</h1>

      <div className="flex justify-center">
        <Space align="center">
          <Row justify="center">
            <Col span={24}>
              <div className="text-center items-center mt2">
                <Image width={150} height={150} src={IoTCamera} alt="loader" />
                <Row justify="space-around">
                  <Col span={24}>
                    <Switch 
                      checked={camera}
                      checkedChildren="ON"
                      unCheckedChildren="OFF"
                      onChange={onChangeCamera} 
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Space>
      </div>
    </>
  )
}

export default CameraContainer
