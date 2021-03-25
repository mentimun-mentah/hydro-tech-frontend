import 'assets/css/Auth.css'
import { Form, Input, Button, Divider, Image, Row, Col } from 'antd'
import GoogleLogo from 'assets/images/google.svg'
import FacebookLogo from 'assets/images/facebook.svg'

const LoginContainer = () => {
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
            <h2 className="auth-content-title">Sign in to Hydro</h2>
            <Row gutter={[10, 10]}>
              <Col span={20}>
                <Button block className="ant-btn-blue btn-google" size="large">
                  <Image width={18} src={GoogleLogo} preview={false} alt="GoogleLogo" />
                  <b className="ml1 align-top">Sign in with Google</b>
                </Button>
              </Col>
              <Col span={4}>
                <Button block className="btn-google px0" size="large">
                  <Image width={18} src={FacebookLogo} preview={false} alt="GoogleLogo" />
                </Button>
              </Col>
            </Row>
            <Divider plain>Or</Divider>

            <Form
              name="login"
              layout="vertical"
            >
              <Form.Item label="Email" name="email">
                <Input placeholder="Email" size="large" />
              </Form.Item>
              <Form.Item 
                label={
                  <div className="w-100">
                    <span>Password</span>
                    <a href="#forgot-password" className="right">Forgot password ?</a>
                  </div>
                } 
                name="password"
                className="input-with-right-child"
              >
                <Input.Password placeholder="Password" size="large" />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" /*className="btn-signin"*/ size="large">
                  <b>
                    Sign In
                  </b>
                </Button>
              </Form.Item>

              <span>Not a member?</span><a href="#register-id"> Register now</a>
            </Form>
          </div>
        </main>
      </section>
    </div>
  )
}

export default LoginContainer
