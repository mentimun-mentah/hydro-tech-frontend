import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { Form, Input, Button, Divider, Row, Col } from 'antd'

import { deepCopy, enterPressHandler } from 'lib/utility'
import { formLogin, formLoginIsValid } from 'formdata/login'

import axios from 'lib/axios'
import SocialLogin from './SocialButton'
import * as actions from 'store/actions'
import Style from 'components/Auth/style'
import ErrorMessage from 'components/ErrorMessage'

const REGISTER = "REGISTER", FORGOT_PASSWORD = "FORGOT_PASSWORD", RESEND_VERIFICATION = "RESEND_VERIFICATION"

const LoginContainer = ({ changeView }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [login, setLogin] = useState(formLogin)

  const { email, password } = login

  /* INPUT CHANGE FUNCTION */
  const onChangeHandler = e => {
    const name = e.target.name
    const value = e.target.value

    const data = {
      ...login,
      [name]: {
        ...login[name],
        value: value,
        isValid: true,
        message: null,
      },
    };
    setLogin(data)
  }
  /* INPUT CHANGE FUNCTION */

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.preventDefault()
    if(formLoginIsValid(login, setLogin)) {
      setLoading(true)
      const data = {
        email: email.value,
        password: password.value,
      }
      axios.post("/users/login", data)
        .then(() => {
          setLoading(false)
          dispatch(actions.getUser())
          router.replace("/dashboard")
        })
        .catch((err) => {
          setLoading(false)
          const state = deepCopy(login)
          const errDetail = err.response.data.detail;
          if (typeof errDetail === "string") {
            state.password.value = state.password.value;
            state.password.isValid = false;
            state.password.message = errDetail;
          } else {
            errDetail.map((data) => {
              const key = data.loc[data.loc.length - 1];
              if (state[key]) {
                state[key].value = state[key].value;
                state[key].isValid = false;
                state[key].message = data.msg;
              }
            });
          }
          setLogin(state)
        })
    }
  }
  /* SUBMIT FORM FUNCTION */

  return(
    <>
      <section className="content">
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}>
          <main className="main-content-sidebar">
            <div className="auth-content">
              <h2 className="auth-content-title">Sign in to Hydro</h2>
              <SocialLogin text="Sign in" />
              <Divider plain>Or</Divider>

              <Form name="login" layout="vertical" onKeyUp={e => enterPressHandler(e, onSubmitHandler)}>
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
          
                <Form.Item className="m-b-10">
                  <Row justify="space-between">
                    <Col md={12}>
                      <a onClick={() => changeView(FORGOT_PASSWORD)}>Forgot password ?</a>
                    </Col>
                    <Col md={12}>
                      <a className="float-right" onClick={() => changeView(RESEND_VERIFICATION)}>
                        Resend verification
                      </a>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item>
                  <Button block type="primary" size="large" onClick={onSubmitHandler} disabled={loading}>
                    {loading ? <LoadingOutlined /> : <b>Sign In</b>}
                  </Button>
                </Form.Item>

                <span>Not a member?</span>
                <a onClick={() => changeView(REGISTER)}> Register now</a>
              </Form>
            </div>
          </main>
        </motion.div>
      </section>

      <style jsx>{Style}</style>
    </>
  )
}

export default LoginContainer
