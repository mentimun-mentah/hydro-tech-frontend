import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Form, Input, Button, Divider, Image, Row, Col, Steps, Card } from 'antd'

import Login from 'components/Auth/Login'
import Register from 'components/Auth/Register'
import ResetPassword from 'components/Auth/ResetPassword'
import ForgotPassword from 'components/Auth/ForgotPassword'

const LOGIN = "LOGIN", REGISTER = "REGISTER", RESET_PASSWORD = "RESET_PASSWORD", FORGOT_PASSWORD = "FORGOT_PASSWORD"

const Auth = () => {
  const [active, setActive] = useState(LOGIN)

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {active === LOGIN && (
          <Login changeView={setActive} />
        )}

        {active === REGISTER && (
          <Register changeView={setActive} />
        )}

        {active === FORGOT_PASSWORD && (
          <ForgotPassword changeView={setActive} />
        )}

        {active === RESET_PASSWORD && (
          <ResetPassword changeView={setActive} />
        )}
      </AnimatePresence>
    </>
  )
}

export default Auth
