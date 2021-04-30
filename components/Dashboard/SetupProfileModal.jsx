import { useState } from 'react'
import { motion } from 'framer-motion'
import { jsonHeaderHandler } from 'lib/axios'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col, Image as AntImage, Form, Button, Space, Typography } from "antd"

import Image from 'next/image'
import SplitText from 'components/Layout/dashboard/SplitText'

import axios from 'lib/axios'
import nookies from 'nookies'
import * as actions from 'store/actions'

const Loader1 = "/static/images/loader-1.gif";
const Lecttuce = "/static/images/plant/lecttuce.png";
const IoTCamera = "/static/images/iot-camera.png";
const plantList = ["Bayam", "Brokoli", "Kangkung", "Kubis", "Pakcoy", "Seledri", "Selada"]


const SetupProfileModal = ({ current, setPlantSelected, onStepChange, plantSelected }) => {
  const dispatch = useDispatch()

  const plants = useSelector(state => state.plant.plant)
  const iot_token = useSelector(state => state.auth.iot_token)

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState("")

  /* SUBMIT FORM FUNCTION */
  const onCreateTokenHanlder = e => {
    e.persist()
    setLoading(true)
    axios.post("/users/create-iot-token", null, jsonHeaderHandler())
      .then(res => {
        setLoading(false)
        setToken(res.data.token)
        nookies.set(null, 'iot_token_cookies', res.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        dispatch(actions.getIotToken())
      })
      .catch(err => {
        setLoading(false)
        const errDetail = err.response.data.detail;
        const freshRequired = "Fresh token required";
        if(typeof errDetail === "string" && errDetail === freshRequired) {
          dispatch(actions.logout())
        }
      })
  }
  /* SUBMIT FORM FUNCTION */

  const onFinishSetup = () => {
    onStepChange(4)
    nookies.set(null, 'final_setup', 'true', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }

  return(
    <>
      <Row justify="center" style={{ height: 'calc(100% - 40px)' }} align="middle">
        <Col xl={8} lg={10} md={16} sm={24} xs={24}>
          <div className="step-container ">
            {current == 0 && (
              <>
                <h1 className="bold h2"> Hi, Ackerman, Choose what plants you will plant </h1>

                <Form>
                  <Form.Item>
                    <div className="plantlist-container">
                      {plants && plants.data && plants.data.length > 0 && plants.data.map(plant => (
                        <motion.div
                          key={plant.plants_id} 
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98, y: 0 }}
                          className="card-plantlist"
                        >
                          <Card 
                            className={`radius1rem card-body-p-1 ${plantSelected === plant.plants_id && "card-plantlist-selected"}`}
                            onClick={() => setPlantSelected(plant.plants_id)}
                          >
                            <Row gutter={[10,10]}>
                              <Col className="col-image-plantlist noselect">
                                <AntImage 
                                  width={60}
                                  height={60} 
                                  src={`${process.env.NEXT_PUBLIC_API_URL}/static/plants/${plant.plants_image}`}
                                  alt="plant" className="align-sub noselect" 
                                />
                              </Col>
                              <Col className="col-detail-plantlist">
                                <h2 className="mb0 h4 bold title-plantlist">{plant.plants_name}</h2>
                                <p className="mb0 subtitle-plantlist h6 noselect">
                                  <span className="bold text-orange">{plant.plants_growth_value} </span>{plant.plants_growth_type} to grow
                                </p>
                                <p className="mb0 subtitle-plantlist h6 noselect">
                                  Difficulty level
                                  <span className="bold text-orange"> {plant.plants_difficulty_level}</span>
                                </p>
                              </Col>
                            </Row>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </Form.Item>

                  <Form.Item className="mb0">
                    <Button block 
                      size="large" 
                      type="primary" 
                      onClick={() => onStepChange(1)}
                      disabled={plantSelected === ""}
                    >
                      <b>Next</b>
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}

            {current == 1 && (
              <>
                <div className="flex h-100">
                  <Space align="center">
                    <Row justify="center">
                      <Col span={24}>
                        <div className="text-center">
                          <Image width={200} height={200} src={IoTCamera} alt="loader" />
                        </div>
                        <h1 className="bold h2 text-center"> Ackerman, would you like to use camera for monitoring your plants?</h1>
                      </Col>
                      <Col span={24}>
                        <Space align="center" className="w-100 justify-center">
                          <Button 
                            size="large" 
                            type="primary"
                            className="p-l-15 p-r-15" 
                            onClick={() => onStepChange(2)}
                          >
                            Yes
                          </Button>
                          <Button 
                            size="large" 
                            className="btn-white p-l-15 p-r-15" 
                            onClick={() => onStepChange(2)}
                          >
                            No
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Space>
                </div>
              </>
            )}

            {current == 2 && (
              <>
                <div className="flex h-100">
                  <Space align="center">
                    <Row>
                      <Col span={24}>
                        {token ? (
                          <>
                            <h1 className="bold h2 text-center">
                              Your IoT Token
                            </h1>
                            <Card className="card-token m-b-10">
                              <Typography.Paragraph className="m-b-0 text-danger force-select overflow-wrap-anywhere">
                                {token}
                              </Typography.Paragraph>
                            </Card>
                            <p className="fs-18 text-center line-height-3">
                              You can input this token to your code and upload the sketch to your IoT for example you can check in this{" "}
                              <a target="_blank" href="https://github.com/mentimun-mentah/hydro-tech-backend/tree/main/arduino">
                                link
                              </a>
                            </p>
                          </>
                        ) : (
                          <>
                            <h1 className="bold mb0 h2 text-center">
                              Create IoT Token
                            </h1>
                            <p className="fs-18 text-center line-height-3">
                              It seems you don't have any token for the Hydro X Tech, you can create the token by clicking the button below.
                            </p>
                          </>
                        )}
                      </Col>
                      {token ? (
                        <Col span={24}>
                          <Space align="center" className="w-100 justify-center">
                            <Button
                              size="large"
                              type="primary"
                              className="p-l-15 p-r-15"
                              onClick={() => onStepChange(3)}
                            >
                              Next
                            </Button>
                          </Space>
                        </Col>
                      ) : (
                        <Col span={24}>
                          <Space align="center" className="w-100 justify-center">
                            <Button
                              size="large"
                              type="primary"
                              className="p-l-15 p-r-15"
                              onClick={onCreateTokenHanlder}
                            >
                              Create Token
                            </Button>
                          </Space>
                        </Col>
                      )}
                    </Row>
                  </Space>
                </div>
              </>
            )}

            {current == 3 && (
              <>
                <div className="flex h-100">
                  <Space align="center">
                    <Row>
                      <Col span={24}>
                        <h1 className="bold mb0 h2 text-center">
                          Complete the setup
                        </h1>
                        <p className="fs-18 text-center">
                          Before using Hydro X Tech you have to complete the setup in the control settings, and you can click on the button below and we will take you there.
                        </p>
                      </Col>
                      <Col span={24}>
                        <Space align="center" className="w-100 justify-center">
                          <Button
                            size="large"
                            type="primary"
                            className="p-l-15 p-r-15"
                            onClick={onFinishSetup}
                          >
                            Go now
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Space>
                </div>
              </>
            )}

            {current == 4 && (
              <>
                <div className="flex h-100">
                  <Space align="center" className="space-w-100 w-100">
                    <Row>
                      <Col span={24}>
                        <div className="text-center">
                          <Image width={100} height={100} src={Loader1} alt="loader" />
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h2">
                            <SplitText
                              animate="visible"
                              initial={{ x: '100%' }}
                              variants={{ visible: i => ({ x: 0, transition: { delay: i * .2 } }) }}
                            >
                              Redirecting now
                            </SplitText>
                          </motion.div> 
                        </div>
                      </Col>
                    </Row>
                  </Space>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .step-container {
          height: calc(100% - 48px);
        }

        .plantlist-container{
          max-height: 65vh;
          overflow: scroll;
          padding-top: 15px;
        }
        :global(.card-plantlist:hover){
          cursor: pointer;
        }
        :global(.card-plantlist:not(:last-of-type)){
          margin-bottom: 1rem!important;
        }
        :global(.col-image-plantlist .ant-image){
          vertical-align: middle;
        }
        :global(.ant-card.card-body-p-1 .ant-card-body){
          padding: 15px!important;
          border-radius: 1rem;
        }
        :global(.col-detail-plantlist .title-plantlist){
          color: var(--grey-1)
        }
        :global(.col-detail-plantlist .subtitle-plantlist){
          color: var(--grey)
        }
        :global(.card-plantlist-selected){
          background-color: #ffc19e5c;
          border: 1px solid #ffc19e5c;
          transition: .5s ease-out;
        }

        :global(.space-w-100 .ant-space-item){
          width: 100%;
        }
      `}</style>

      <style jsx>{`
        :global(.card-token) {
          margin: 0 auto;
          width: fit-content;
          border-radius: .5rem;
          background-color: var(--light);
        }
        :global(.card-token .ant-card-body) {
          padding: 5px 10px;
        }
        :global(.overflow-wrap-anywhere) {
          overflow-wrap: anywhere;
        }
      `}</style>
    </>
  )
}

export default SetupProfileModal
