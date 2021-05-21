import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Router from 'next/router'
import nookies from 'nookies'
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


Auth.getInitialProps = (ctx) => {
  const cookies = nookies.get(ctx)
  if(cookies.csrf_refresh_token && cookies.csrf_access_token && 
     cookies.csrf_refresh_token !== "null" && cookies.csrf_access_token !== "null" &&
     cookies.csrf_refresh_token !== "undefined" && cookies.csrf_access_token !== "undefined"
  ) {
    process.browser
      ? Router.replace("/", "/") //Redirec from Client Side
      : ctx.res.writeHead(302, { Location: "/" }).end(); //Redirec from Server Side
  }
};

export default Auth
