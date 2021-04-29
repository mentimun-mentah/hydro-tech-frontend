import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { LoadingOutlined } from '@ant-design/icons'
import { Form, Input, Button, Divider } from 'antd'

import { formErrorMessage } from 'lib/axios'
import { deepCopy, enterPressHandler } from 'lib/utility'
import { formRegister, formRegisterIsValid } from 'formdata/register'

import axios from 'lib/axios'
import SocialLogin from './SocialButton'
import Style from 'components/Auth/style'
import ErrorMessage from 'components/ErrorMessage'


const LOGIN = "LOGIN"

const RegisterContainer = ({ changeView }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [register, setRegister] = useState(formRegister)

  const { username, email, password, confirm_password } = register

  /* INPUT CHANGE FUNCTION */
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
  /* INPUT CHANGE FUNCTION */

  /* SUBMIT FORM FUNCTION */
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
          formErrorMessage("success", res.data.detail)
          router.replace('/dashboard')
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
  /* SUBMIT FORM FUNCTION */

  return(
    <>
      <section className="content">
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}>
          <main className="main-content-sidebar">
            <div className="auth-content">
              <h2 className="auth-content-title forgot-title">Register to Hydro</h2>
              <SocialLogin text="Register" />
              <Divider plain>Or</Divider>

              <Form name="login" layout="vertical" onKeyUp={e => enterPressHandler(e, onSubmitHandler)}>
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

                <Form.Item name="agreement" className="m-b-10">
                  <div className="text-secondary">
                    <span>By registering, I agree to the</span>
                    <a className="text-tridatu" href="#a"> Terms and Conditions</a>
                    <span> and </span>
                    <a className="text-tridatu" href="#b"> Privacy Policy</a>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button block type="primary" size="large" onClick={onSubmitHandler} disabled={loading}>
                    {loading ? <LoadingOutlined /> : <b>Create Account</b>}
                  </Button>
                </Form.Item>

                <div className="m-b-10">
                  <span>Already a member?</span>
                  <a onClick={() => changeView(LOGIN)}> Sign In</a>
                </div>
              </Form>
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
