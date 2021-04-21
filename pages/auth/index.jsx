import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Form, Input, Button, Divider, Image, Row, Col, Steps, Card } from 'antd'

import Login from 'components/Auth/Login'
import Register from 'components/Auth/Register'
import ForgotPassword from 'components/Auth/ForgotPassword'
import ResendVerification from 'components/Auth/ResendVerification'

const LOGIN = "LOGIN", REGISTER = "REGISTER", FORGOT_PASSWORD = "FORGOT_PASSWORD", RESEND_VERIFICATION = "RESEND_VERIFICATION"

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

        {active === RESEND_VERIFICATION && (
          <ResendVerification changeView={setActive} />
        )}
      </AnimatePresence>
    </>
  )
}

export default Auth
