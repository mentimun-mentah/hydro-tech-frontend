import { Form, Input, Button } from 'antd'
import Link from 'next/link'

import Style from 'components/Auth/style'

const ResetPassword = () => {
  return(
    <>
      <section className="content">
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

              <span>Already a member?</span>
              <Link href="/auth">
                <a> Sign In</a>
              </Link>
            </Form>
          </div>
        </main>
      </section>
      <style jsx>{Style}</style>
    </>
  )
}

export default ResetPassword
