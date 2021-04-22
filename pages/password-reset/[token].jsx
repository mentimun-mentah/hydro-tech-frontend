import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Form, Input, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { formErrorMessage } from 'lib/axios'
import { deepCopy, enterPressHandler } from 'lib/utility'
import { formReset, formResetIsValid } from 'formdata/resetPassword'

import Link from 'next/link'
import axios from 'lib/axios'
import Style from 'components/Auth/style'
import ErrorMessage from 'components/ErrorMessage'

const ResetPassword = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [reset, setReset] = useState(formReset)

  const { email, password, confirm_password } = reset

  /* INPUT CHANGE FUNCTION */
  const onChangeHandler = e => {
    const name = e.target.name
    const value = e.target.value

    const data = {
      ...reset,
      [name]: {
        ...reset[name],
        value: value,
        isValid: true,
        message: null,
      },
    };
    setReset(data)
  }
  /* INPUT CHANGE FUNCTION */

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.preventDefault()
    if(formResetIsValid(reset, setReset)) {
      setLoading(true);
      const data = {
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value,
      }
      const { token } = router.query;
      axios.put(`/users/password-reset/${token}`, data)
        .then((res) => {
          setLoading(false);
          formErrorMessage("success", res.data.detail)
          router.replace("/");
        })
        .catch((err) => {
          setLoading(false);
          const state = deepCopy(reset);
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
          setReset(state);
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
              <h2 className="auth-content-title forgot-title">Reset Password</h2>
              <Form name="resetPassword" layout="vertical" onKeyUp={e => enterPressHandler(e, onSubmitHandler)}>
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
                  className="m-b-10 input-with-right-child"
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
                  className="input-with-right-child"
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

                <Form.Item>
                  <Button block type="primary" size="large" onClick={onSubmitHandler} disabled={loading}>
                    {loading ? <LoadingOutlined /> : <b>Change Password</b>}
                  </Button>
                </Form.Item>

                <span>Already a member?</span>
                <Link href="/auth"><a> Sign In</a></Link>
              </Form>
            </div>
          </main>
        </motion.div>
      </section>
      <style jsx>{Style}</style>
    </>
  )
}

export default ResetPassword
