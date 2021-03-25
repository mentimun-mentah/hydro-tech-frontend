import { useRouter } from 'next/router'

import AuthLayout from './Auth'
import DasboardLayout from './dashboard'

const Layout = ({ children }) => {
  const router = useRouter()
  const isAuth = router.pathname.startsWith('/auth')
  const isDashboard = router.pathname.startsWith('/dashboard')

  let layout = <>{children}</>
  if(isDashboard) layout = <DasboardLayout>{children}</DasboardLayout>
  if(isAuth) layout = <AuthLayout>{children}</AuthLayout>

  return layout
}

export default Layout
