import { useRouter } from 'next/router'
import { Layout, Menu, Grid } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, createContext } from 'react'

import nookies from 'nookies'
import isIn from 'validator/lib/isIn'
import * as actions from 'store/actions'
import ReconnectingWebSocket from 'reconnecting-websocket'

import Style from './style'
import SplitText from './SplitText'

const useBreakpoint = Grid.useBreakpoint
const HOME = "HOME", REPORTS = "REPORTS", LOGOUT = "LOGOUT", DASHBOARD = "DASHBOARD", CONTROLS = "CONTROLS", PLANTS = "PLANTS", 
  ACCOUNTS = "ACCOUNTS", ADD_PLANTS = "ADD-PLANTS", ADD_BLOG = "ADD-BLOG", MANAGE_BLOG = "MANAGE-BLOG",
  ADD_DOCS = "ADD-DOCS", MANAGE_DOCS = "MANAGE-DOCS", CHAT = "CHATS", ADMIN = "ADMIN", ADD_CATEGORY = "ADD-CATEGORY"

export const WebSocketContext = createContext()

let ws2 = {}
let wsChat2 = {}

const SidebarContainer = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const screens = useBreakpoint()

  const user = useSelector(state => state.auth.user)

  const [activeUser, setActiveUser] = useState({total_online: 0, total_offline: 0, online_user: [], offline_user: []})
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState(DASHBOARD)
  const [isMenuAdmin, setIsMenuAdmin] = useState(false)

  const onLogoutHandler = () => {
    dispatch(actions.logout())
    ws2.close()
    wsChat2.close()
    router.replace('/')
  }

  useEffect(() => {
    let mounted = true
    if(mounted && screens.xs) setCollapsed(true)
    else setCollapsed(false)
  }, [screens])

  useEffect(() => {
    const cookies = nookies.get()

    if(cookies && cookies.csrf_access_token) {
      const hydroURL = `ws://${process.env.NEXT_PUBLIC_HOSTNAME}:8000/dashboard/ws?csrf_token=${cookies.csrf_access_token}`
      const chatURL = `ws://${process.env.NEXT_PUBLIC_HOSTNAME}:8000/dashboard/ws-chat?csrf_token=${cookies.csrf_access_token}`
      ws2 = new ReconnectingWebSocket(hydroURL)
      wsChat2 = new ReconnectingWebSocket(chatURL)

      if(router.pathname === "/dashboard/chats") {
        wsChat2.onmessage = msg => {
          if((msg.data.indexOf("total_online") !== -1) && (msg.data.indexOf("total_offline") !== -1)) {
            setActiveUser(JSON.parse(msg.data))
          }
        }
      }

      ws2.onopen = () => {
        if (ws2.readyState == 1) {
          console.log("Hydro Connected");
          ws2.send(`kind:live_cam_false`);
        }
      };

      wsChat2.onopen = () => {
        console.log("Chat Connected");
      };
    }

    window.addEventListener("beforeunload", alertUser);

    return () => {
      window.removeEventListener("beforeunload", alertUser)
      ws2.close()
      wsChat2.close()
    }
  }, [])

  const alertUser = e => {
    // e.preventDefault()
    // e.returnValue = ''
    wsChat2.close()
  }

  useEffect(() => {
    let routeNow = router.pathname.split("/")[router.pathname.split("/").length - 1]
    let data = routeNow.toUpperCase()
    if(routeNow.startsWith('[')) {
      data = router.pathname.split("/")[router.pathname.split("/").length - 2].toUpperCase()
    }
    setSelected(data)
    let listAdminRoute = ['add-plants', 'add-blog', 'manage-blog', 'add-docs', 'manage-docs', 'add-category']
    if(router.pathname.split("/")[2] && isIn(router.pathname.split("/")[2], listAdminRoute)){
      setIsMenuAdmin(true)
    } else {
      setIsMenuAdmin(false)
    }
  }, [router])

  return(
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider 
          collapsible 
          theme="light"
          collapsed={collapsed} 
          data-testid="sidebar"
          className="ant-layout-sider-custom"
          onCollapse={val => setCollapsed(val)}
          trigger={
            <i 
              title={collapsed ? 'icon-right' : 'icon-left'}
              data-testid="sidebar-collapsed-icon" 
              className={`far fa-chevron-${collapsed ? 'right' : 'left'}`} 
            />
          }
        >
          <div className="sidebar-inner">
            <div className="logo text-center bold">
              <AnimatePresence exitBeforeEnter>
                {collapsed ? 
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                  >
                    <SplitText
                      animate="visible"
                      initial={{ x: '100%' }}
                      variants={{
                        visible: i => ({
                          x: 0,
                          transition: { delay: i * .2 }
                        })
                      }}
                    >
                      H X T
                    </SplitText>
                  </motion.div> : 
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <SplitText
                      animate="visible"
                      initial={{ x: '-100%' }}
                      variants={{
                        visible: i => ({
                          x: 0,
                          transition: { delay: i * .2 }
                        })
                      }}
                    >
                      HYDRO X TECH
                    </SplitText>
                  </motion.div>
                }
              </AnimatePresence>
            </div>

            <Menu 
              mode="inline" 
              theme="light" 
              inlineIndent={15} 
              className="ant-menu-scroll"
              selectedKeys={[selected]}
            >
              <Menu.Item 
                key={HOME} 
                icon={<i className="far fa-door-open" />}
                onClick={() => router.push('/')}
              >
                Home
              </Menu.Item>

              <AnimatePresence>
                {isMenuAdmin && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                  >
                  <Menu 
                    mode="inline" 
                    theme="light" 
                    inlineIndent={15} 
                    className="ant-menu-scroll"
                    selectedKeys={[selected]}
                  >
                    {user && user.role == "admin" && (
                      <>
                        <Menu.Item 
                          key={ADD_PLANTS}
                          icon={<i className="far fa-hand-holding-seedling" />} 
                          onClick={() => router.push('/dashboard/add-plants')}
                        >
                          Add Plants
                        </Menu.Item>
                        <Menu.SubMenu 
                          key="blog-sub" 
                          icon={<i className="far fa-blog m-r-10" />} 
                          title={collapsed ? "" : "Blog"}
                        >
                          <Menu.Item 
                            key={ADD_BLOG}
                            onClick={() => router.push('/dashboard/add-blog')}
                          >
                            Add Blog
                          </Menu.Item>
                          <Menu.Item 
                            key={MANAGE_BLOG}
                            onClick={() => router.push('/dashboard/manage-blog')}
                          >
                            Manage Blog
                          </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu 
                          key="docs-sub" 
                          icon={<i className="far fa-book m-r-10" />} 
                          title={collapsed ? "" : "Documentation"}
                        >
                          <Menu.Item 
                            key={ADD_CATEGORY}
                            onClick={() => router.push('/dashboard/add-category')}
                          >
                            Add Category
                          </Menu.Item>
                          <Menu.Item 
                            key={ADD_DOCS}
                            onClick={() => router.push('/dashboard/add-docs')}
                          >
                            Add Docs
                          </Menu.Item>
                          <Menu.Item 
                            key={MANAGE_DOCS}
                            onClick={() => router.push('/dashboard/manage-docs')}
                          >
                            Manage Docs
                          </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item 
                          key={ADMIN+"BACK"} 
                          icon={<i className="far fa-long-arrow-left" />}
                          onClick={() => setIsMenuAdmin(false)}
                        >
                          Back
                        </Menu.Item>
                      </>
                    )}
                  </Menu>
                  </motion.div>
                )} 
              </AnimatePresence>
              <AnimatePresence>
                {!isMenuAdmin && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                  <Menu 
                    mode="inline" 
                    theme="light" 
                    inlineIndent={15} 
                    className="ant-menu-scroll"
                    selectedKeys={[selected]}
                  >
                    <Menu.Item 
                      key={DASHBOARD} 
                      icon={<i className="far fa-house-flood" />}
                      onClick={() => router.push('/dashboard')}
                    >
                      Dashboard
                    </Menu.Item>
                    <Menu.Item 
                      key={CONTROLS} 
                      icon={<i className="far fa-cog" />} 
                      onClick={() => router.push('/dashboard/controls')}
                    >
                      Controls
                    </Menu.Item>
                    <Menu.Item 
                      key={REPORTS} 
                      icon={<i className="far fa-clipboard-list" />} 
                      onClick={() => router.push('/dashboard/reports')}
                    >
                      Reports
                    </Menu.Item>
                    <Menu.Item 
                      key={PLANTS} 
                      icon={<i className="far fa-seedling" />} 
                      onClick={() => router.push('/dashboard/plants')}
                    >
                      Plants
                    </Menu.Item>
                    <Menu.Item 
                      key={ACCOUNTS} 
                      icon={<i className="far fa-user" />} 
                      onClick={() => router.push('/dashboard/accounts')}
                    >
                      Accounts
                    </Menu.Item>
                    <Menu.Item 
                      key={CHAT} 
                      icon={<i className="far fa-comments-alt" />} 
                      onClick={() => router.push('/dashboard/chats')}
                    >
                      Room Chat
                    </Menu.Item>
                    {user && user.role == "admin" && (
                      <Menu.Item 
                        key={ADMIN}
                        icon={<i className="far fa-users-crown" />}
                        onClick={() => setIsMenuAdmin(true)}
                      >
                        Admin
                      </Menu.Item>
                    )}
                    <Menu.Item 
                      key={LOGOUT} 
                      icon={<i className="far fa-sign-out" />}
                      onClick={onLogoutHandler}
                    >
                      Log Out
                    </Menu.Item>
                  </Menu>
                  </motion.div>
                )}
              </AnimatePresence>
            </Menu>
          </div>
        </Layout.Sider>
        <Layout className="main-layout">
          <WebSocketContext.Provider value={{ws: ws2, wsChat: wsChat2, activeUser: activeUser}}>
            {children}
          </WebSocketContext.Provider>
        </Layout>
      </Layout>

      <style jsx global>{Style}</style>
      <style jsx>{`
        @media only screen and (max-width: 575px) {
          :global(.ant-layout-sider-custom) {
            z-index: 2;
            position: ${collapsed ? "unset" : "fixed"};
          }
          :global(.ant-layout-sider-custom .ant-layout-sider-children) {
            background-color: white;
            box-shadow: rgb(0 0 0 / 8%) 3px 8px 20px;
          }
        }
        :global(.ant-layout-sider-custom .ant-layout-sider-children .ant-menu-submenu-selected) {
          color: var(--black);
        }
        :global(.ant-layout-sider-custom .ant-layout-sider-children .ant-menu-submenu-selected .ant-menu-item:active, 
                .ant-layout-sider-custom .ant-layout-sider-children .ant-menu-submenu-selected .ant-menu-submenu-title:active) {
          border-radius: .8rem;
        }
        :global(.ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-expand-icon, .ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow) {
          color: var(--black)!important;
        }
        :global(.ant-menu-submenu-arrow) {
          color: var(--grey);
        }
      `}</style>
    </>
  )
}

export default SidebarContainer
