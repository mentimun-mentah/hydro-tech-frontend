import 'assets/css/Auth.css'
import { Form, Input, Button } from 'antd'

const ForgotPasswordContainer = () => {
  return(
    <div id="main-container" className="register-sidebar">
      <section className="auth-sidebar">
        <div className="auth-sidebar-content">
          <header>
            <h1 className="h1 bolder">Grow, learn, share and repeat!</h1>
          </header>
          <div className="artwork">
            <div className="artwork-image" />
          </div>
        </div>
      </section>
      <section className="content">
        <main className="main-content-sidebar">
          <div className="auth-content">
            <h2 className="auth-content-title forgot-title">Forgot Password?</h2>
            <p>Enter the email address you used when you joined and we’ll send you a link to reset your password.</p>
            <p>For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.</p>
            <Form
              name="forgotpassword"
              layout="vertical"
            >
              <Form.Item name="email">
                <Input placeholder="Email Address" size="large" />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" /*className="btn-signin"*/ size="large">
                  <b>
                    Send
                  </b>
                </Button>
              </Form.Item>

              <span>Not a member?</span><a href="#signup"> Register now</a>
            </Form>
          </div>
        </main>
      </section>
    </div>
  )
}

export default ForgotPasswordContainer
