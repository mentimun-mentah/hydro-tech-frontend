import { motion } from 'framer-motion'
import { Form, Input, Button } from 'antd'
import Style from 'components/Auth/style'

const REGISTER = "REGISTER"

const ForgotPassword = ({ changeView }) => {
  return(
    <>
      <section className="content">
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}>
          <main className="main-content-sidebar">
            <div className="auth-content">
              <div>
                <h2 className="auth-content-title forgot-title">Forgot Password?</h2>
                <p>Enter the email address you used when you joined and we’ll send you a link to reset your password.</p>
                <p>For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.</p>

                <Form name="reset" layout="vertical">
                  <Form.Item name="email">
                    <Input placeholder="Email Address" size="large" />
                  </Form.Item>

                  <Form.Item>
                    <Button block type="primary" size="large">
                      <b>Send</b>
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

export default ForgotPassword
