import { useState } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { Form, Input, Button, Divider, Image, Row, Col, Steps, Card } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { deepCopy } from 'lib/utility'
import { resNotification } from 'lib/axios'
import { formRegister, formRegisterIsValid } from 'formdata/register'

import axios from 'lib/axios'
import SocialLogin from './SocialButton'
import Style from 'components/Auth/style'
import ErrorMessage from 'components/ErrorMessage'
import SplitText from 'components/Layout/dashboard/SplitText'

const Loader1 = '/static/images/loader-1.gif'
const Lecttuce = '/static/images/plant/lecttuce.png'

const steps = [ { title: 'Register', }, { title: 'Choose a Plant', }, { title: 'Finish', } ];

const plantList = ["Bayam", "Brokoli", "Kangkung", "Kubis", "Pakcoy", "Seledri", "Selada"]

const LOGIN = "LOGIN"

const RegisterContainer = ({ changeView }) => {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [register, setRegister] = useState(formRegister)
  const [plantSelected, setPlantSelected] = useState("")
  const [text, setText] = useState("Setting up your profile")

  const { username, email, password, confirm_password } = register

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

  const onChangeHandler = e => {
    const name = e.target.name
    const value = e.target.value

    const data = {
      ...register,
      [name]: {
        ...register[name],
        value: value,
        isValid: true,
        message: null,
      },
    };
    setRegister(data)
  }

  const enterPressHandler = e => {
    if(e.keyCode === 13) onSubmitHandler(e)
  }

  const onSubmitHandler = e => {
    e.preventDefault()
    if(formRegisterIsValid(register, setRegister)) {
      setLoading(true)
      const data = {
        username: username.value,
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value,
      };
      axios.post("/users/register", data)
        .then((res) => {
          setLoading(false)
          resNotification("success", res.data.detail)
          setTimeout(() => {
            next()
          }, 1000)
        })
        .catch((err) => {
          setLoading(false)
          const state = deepCopy(register)
          const errDetail = err.response.data.detail
          if (typeof errDetail === "string") {
            state.email.value = state.email.value
            state.email.isValid = false
            state.email.message = errDetail
          } else {
            errDetail.map((data) => {
              const key = data.loc[data.loc.length - 1]
              if(state[key]) {
                state[key].value = state[key].value
                state[key].isValid = false
                state[key].message = data.msg
              }
            });
          }
          setRegister(state)
        });
    }
  }

  return(
    <>
      <section className="content">
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}>
          <main className="main-content-sidebar">
            <div className="auth-content">
              <AnimatePresence exitBeforeEnter>
                {current !== 0 && loading ? (
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

                        <Form name="login" layout="vertical" onKeyUp={enterPressHandler}>
                          <Form.Item 
                            label="Username"
                            className="m-b-10"
                            validateStatus={!username.isValid && username.message && "error"}
                          >
                            <Input 
                              size="large" 
                              name="username"
                              placeholder="Username" 
                              value={username.value}
                              onChange={onChangeHandler}
                            />
                            <ErrorMessage item={username} />
                          </Form.Item>
                          <Form.Item 
                            label="Email"
                            className="m-b-10"
                            validateStatus={!email.isValid && email.message && "error"}
                          >
                            <Input 
                              size="large"
                              name="email"
                              placeholder="Email"
                              value={email.value}
                              onChange={onChangeHandler}
                            />
                            <ErrorMessage item={email} />
                          </Form.Item>
                          <Form.Item 
                            label="Password"
                            className="m-b-10"
                            validateStatus={!password.isValid && password.message && "error"}
                          >
                            <Input.Password 
                              size="large" 
                              name="password"
                              placeholder="Password"
                              value={password.value}
                              onChange={onChangeHandler}
                            />
                            <ErrorMessage item={password} />
                          </Form.Item>
                          <Form.Item 
                            label="Confirmation Password"
                            className="m-b-10"
                            validateStatus={!confirm_password.isValid && confirm_password.message && "error"}
                          >
                            <Input.Password 
                              size="large" 
                              name="confirm_password"
                              placeholder="Confirmation Password" 
                              value={confirm_password.value}
                              onChange={onChangeHandler}
                            />
                            <ErrorMessage item={confirm_password} />
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
                            <Button block type="primary" size="large" onClick={onSubmitHandler}>
                              <b>
                                {loading && <LoadingOutlined className="m-r-5" /> }Create Account
                              </b>
                            </Button>
                          </Form.Item>

                          <div className="m-b-10">
                            <span>Already a member?</span>
                            <a onClick={() => changeView(LOGIN)}> Sign In</a>
                          </div>
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
        </motion.div>
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
