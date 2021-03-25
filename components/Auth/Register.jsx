import { useState } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { Form, Input, Button, Divider, Image, Row, Col, Steps, Card } from 'antd'

import SocialLogin from './SocialButton'
import Style from 'components/Auth/style'
import SplitText from 'components/Layout/dashboard/SplitText'

const Loader1 = '/static/images/loader-1.gif'
const Lecttuce = '/static/images/plant/lecttuce.png'

const steps = [ { title: 'Register', }, { title: 'Choose a Plant', }, { title: 'Finish', } ];

const plantList = ["Bayam", "Brokoli", "Kangkung", "Kubis", "Pakcoy", "Seledri", "Selada"]

const LOGIN = "LOGIN"

const RegisterContainer = ({ changeView }) => {
  const router = useRouter()
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false)
  const [plantSelected, setPlantSelected] = useState("")
  const [text, setText] = useState("Setting up your profile")

  const next = () => {
    setCurrent(current + 1);
  };

  const onFinish = () => {
    setLoading(true)
    setTimeout(() => {
      setText("Done")
    }, 2000)
    setTimeout(() => {
      router.replace('/dashboard')
    }, 2500)
  }

  return(
    <>
      <section className="content">
        <main className="main-content-sidebar">
          <div className="auth-content">
            <AnimatePresence exitBeforeEnter>
              {loading ? (
                <div className="text-center">
                  <Image width={100} src={Loader1} preview={false} alt="loader" />
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h2">
                    <SplitText
                      animate="visible"
                      initial={{ x: '100%' }}
                      variants={{ visible: i => ({ x: 0, transition: { delay: i * .2 } }) }}
                    >
                      {text}
                    </SplitText>
                  </motion.div> 
                </div>
              ):(
                <>
                  <Steps current={current} size="small" className="mb2">
                    {steps.map(item => (
                      <Steps.Step key={item.title} title={item.title} />
                    ))}
                  </Steps>

                  {current == 0 && (
                    <>
                      <h2 className="auth-content-title forgot-title">Register to Hydro</h2>
                      <SocialLogin text="Register" />
                      <Divider plain>Or</Divider>

                      <Form name="login" layout="vertical">
                        <Form.Item label="Username" name="username">
                          <Input placeholder="Username" size="large" />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                          <Input placeholder="Email" size="large" />
                        </Form.Item>
                        <Form.Item 
                          label="Password"
                          name="password"
                          className="input-with-right-child"
                        >
                          <Input.Password placeholder="Password" size="large" />
                        </Form.Item>
                        <Form.Item 
                          label="Confirmation Password"
                          name="password"
                          className="input-with-right-child"
                        >
                          <Input.Password placeholder="Confirmation Password" size="large" />
                        </Form.Item>

                        <Form.Item name="agreement">
                          <div className="text-secondary">
                            <span>By registering, I agree to the</span>
                            <a className="text-tridatu" href="#a"> Terms and Conditions</a>
                            <span> and </span>
                            <a className="text-tridatu" href="#b"> Privacy Policy</a>
                          </div>
                        </Form.Item>

                        <Form.Item>
                          <Button block type="primary" size="large" onClick={next}>
                            <b>Create Account</b>
                          </Button>
                        </Form.Item>

                        <span>Already a member?</span>
                        <a onClick={() => changeView(LOGIN)}> Sign In</a>
                      </Form>
                    </>
                  )}

                  {current == 1 && (
                    <>
                      <h1 className="bold"> Hi, Ackerman, Choose what plants you will plant </h1>

                      <Form>
                        <Form.Item>
                          <div className="plantlist-container">
                            {plantList.map(data => (
                              <motion.div
                                key={data} 
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98, y: 0 }}
                                className="card-plantlist"
                              >
                                <Card 
                                  className={`radius1rem card-body-p-1 ${plantSelected === data && "card-plantlist-selected"}`}
                                  onClick={() => setPlantSelected(data)}
                                >
                                  <Row gutter={[10,10]}>
                                    <Col className="col-image-plantlist noselect">
                                      <Image width={60} src={Lecttuce} preview={false} alt="plant" className="align-sub noselect" />
                                    </Col>
                                    <Col className="col-detail-plantlist">
                                      <h2 className="mb0 h4 bold title-plantlist">{data}</h2>
                                      <p className="mb0 subtitle-plantlist h6 noselect">
                                        <span className="bold text-orange">{Math.floor(Math.random() * 100)} </span>Days to grow
                                      </p>
                                      <p className="mb0 subtitle-plantlist h6 noselect">
                                        Difficulty level
                                        <span className="bold text-orange"> Simple</span>
                                      </p>
                                    </Col>
                                  </Row>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </Form.Item>

                        <Form.Item>
                          <Button block 
                            size="large" 
                            type="primary" 
                            onClick={onFinish}
                            disabled={plantSelected === ""}
                          >
                            <b>Finish</b>
                          </Button>
                        </Form.Item>
                      </Form>
                    </>

                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </main>
      </section>

      <style jsx>{`
        .plantlist-container{
          max-height: 54vh;
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
      `}</style>
      <style jsx>{Style}</style>
    </>
  )
}

export default RegisterContainer
