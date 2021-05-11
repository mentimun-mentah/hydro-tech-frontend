import { useState } from 'react'
import { Space, Row, Col, Switch } from 'antd'

import Image from 'next/image'

const IoTCamera = "/static/images/iot-camera-1.png";

const CameraContainer = () => {
  const [camera, setCamera] = useState(true)

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
                      onChange={val => setCamera(val)} 
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
