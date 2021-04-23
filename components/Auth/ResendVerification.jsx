import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Form, Input, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { formErrorMessage } from 'lib/axios'
import { deepCopy, enterPressHandler } from 'lib/utility'
import { formEmail, formEmailIsValid } from 'formdata/email'

import axios from 'lib/axios'
import Style from 'components/Auth/style'
import ErrorMessage from 'components/ErrorMessage'

const REGISTER = "REGISTER"

const ResendVerification = ({ changeView }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [resend, setResend] = useState(formEmail)

  const { email } = resend

  /* INPUT CHANGE FUNCTION */
  const onChangeHandler = e => {
    const name = e.target.name
    const value = e.target.value

    const data = {
      ...resend,
      [name]: {
        ...resend[name],
        value: value,
        isValid: true,
        message: null,
      },
    };
    setResend(data)
  }
  /* INPUT CHANGE FUNCTION */

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.preventDefault()
    if(formEmailIsValid(resend, setResend)){
      const data = { email: email.value }
      axios.post("/users/resend-email", data)
        .then((res) => {
          setLoading(false);
          if(res.status >= 400 && res.status < 500){
            formErrorMessage("error", res.data.detail)
          }
          if(res.status >= 200 && res.status < 300){
            router.replace('/')
            formErrorMessage("success", res.data.detail)
          }
        })
        .catch((err) => {
          setLoading(false);
          const state = deepCopy(resend)
          const errDetail = err.response.data.detail;
          if (typeof errDetail === "string") {
            state.email.value = state.email.value;
            state.email.isValid = false;
            state.email.message = errDetail;
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
          setResend(state);
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
              <div>
                <h2 className="auth-content-title forgot-title">Resend email verification</h2>
                <p>Enter the registered e-mail. We will send you the latest verification link.</p>

                <Form name="resend" layout="vertical" onKeyUp={e => enterPressHandler(e, onSubmitHandler)}>
                  <Form.Item 
                    validateStatus={!email.isValid && email.message && "error"}
                  >
                    <Input 
                      size="large" 
                      name="email"
                      placeholder="Email address" 
                      value={email.value}
                      onChange={onChangeHandler}
                    />
                    <ErrorMessage item={email} />
                  </Form.Item>

                  <Form.Item>
                    <Button block type="primary" size="large" onClick={onSubmitHandler} disabled={loading}>
                      {loading ? <LoadingOutlined /> : <b>Send</b>}
                    </Button>
                  </Form.Item>

                  <span>Not a member?</span><a onClick={() => changeView(REGISTER)}> Register now</a>
                </Form>
              </div>
            </div>
          </main>
        </motion.div>
      </section>
      <style jsx>{Style}</style>
    </>
  )
}

export default ResendVerification
