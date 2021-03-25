import { motion } from 'framer-motion'
import { Form, Input, Button, Divider } from 'antd'

import SocialLogin from './SocialButton'
import Style from 'components/Auth/style'

const REGISTER = "REGISTER", FORGOT_PASSWORD = "FORGOT_PASSWORD"

const LoginContainer = ({ changeView }) => {
  return(
    <>
      <section className="content">
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}>
          <main className="main-content-sidebar">
            <div className="auth-content">
              <h2 className="auth-content-title">Sign in to Hydro</h2>
              <SocialLogin text="Sign in" />
              <Divider plain>Or</Divider>

              <Form name="login" layout="vertical">
                <Form.Item label="Email" name="email">
                  <Input placeholder="Email" size="large" />
                </Form.Item>
                <Form.Item 
                  label={
                    <div className="w-100">
                      <span>Password</span>
                      <a onClick={() => changeView(FORGOT_PASSWORD)} className="right">Forgot password ?</a>
                    </div>
                  } 
                  name="password"
                  className="input-with-right-child"
                >
                  <Input.Password placeholder="Password" size="large" />
                </Form.Item>

                <Form.Item>
                  <Button block type="primary" size="large">
                    <b>Sign In</b>
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
