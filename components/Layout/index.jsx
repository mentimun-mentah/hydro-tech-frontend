import { useEffect } from 'react'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import AuthLayout from './Auth'
import HomeLayout from './home'
import DasboardLayout from './dashboard'
import DocumentationLayout from './docs'
import * as actions from 'store/actions'

const Layout = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const isNoLayout = router.pathname.startsWith('/docs')
  const isHome = router.pathname.startsWith('/') || router.pathname.startsWith('/blog')
  const isAuth = router.pathname.startsWith('/auth') || router.pathname.startsWith('/password-reset')
  const isDashboard = router.pathname.startsWith('/dashboard')

  const { csrf_access_token, csrf_refresh_token } = parseCookies()

  useEffect(() => {
    if (csrf_access_token && csrf_refresh_token) {
      dispatch(actions.getUser())
    }
  }, [parseCookies])

  let layout = <>{children}</>
  if(isHome) layout = <HomeLayout>{children}</HomeLayout>
  if(isDashboard) layout = <DasboardLayout>{children}</DasboardLayout>
  if(isAuth) layout = <AuthLayout>{children}</AuthLayout>
  if(isNoLayout) layout = <DocumentationLayout>{children}</DocumentationLayout>

  return layout
}

export default Layout
