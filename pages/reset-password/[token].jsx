import { Form, Input, Button } from 'antd'

import Style from 'components/Auth/style'

const ResetPassword = () => {
  return(
    <>
      <div id="main-container">
        <section className="auth-sidebar">
          <div className="auth-sidebar-content">
            <header>
              <h1 className="h1 bolder">Grow, learn, share and repeat!</h1>
            </header>
            <div className="artwork">
              <div className="artwork-image" />
              <h1 className="artwork-attribution"></h1>
            </div>
          </div>
        </section>
        <section className="content">
          <main className="main-content-sidebar">
            <div className="auth-content">
              <h2 className="auth-content-title forgot-title">Reset Password</h2>
              <Form
                name="reset"
                layout="vertical"
              >
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
                  <Button block type="primary" /*className="btn-signin"*/ size="large">
                    <b>
                      Change Password
                    </b>
                  </Button>
                </Form.Item>

                <span>Not a member?</span>
                <a href="/register"> Register now</a>
              </Form>
            </div>
          </main>
        </section>
      </div>
      <style jsx>{Style}</style>
    </>
  )
}

export default ResetPassword
