import { motion } from 'framer-motion'
import { Form, Input, Button } from 'antd'
import Style from 'components/Auth/style'

const REGISTER = "REGISTER"
const ResetPassword = ({ changeView }) => {
  return(
    <>
      <section className="content">
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}>
          <main className="main-content-sidebar">
            <div className="auth-content">
              <h2 className="auth-content-title forgot-title">Reset Password</h2>
              <Form name="reset" layout="vertical">
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

                <Form.Item>
                  <Button block type="primary" size="large">
                    <b>Change Password</b>
                  </Button>
                </Form.Item>

                <span>Not a member?</span>
                <a changeView={() => changeView(REGISTER)}> Register now</a>
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
