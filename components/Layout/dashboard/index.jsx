import { useRouter } from 'next/router'
import { Layout, Menu, Grid } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, createContext } from 'react'

import Style from './style'
import SplitText from './SplitText'
import nookies from 'nookies'
import * as actions from 'store/actions'

const useBreakpoint = Grid.useBreakpoint
const HOME = "HOME", REPORTS = "REPORTS", LOGOUT = "LOGOUT", DASHBOARD = "DASHBOARD", CONTROLS = "CONTROLS", PLANTS = "PLANTS", 
  ACCOUNTS = "ACCOUNTS", ADD_PLANTS = "ADD-PLANTS", ADD_BLOG = "ADD-BLOG", MANAGE_BLOG = "MANAGE-BLOG",
  ADD_DOCS = "ADD-DOCS", MANAGE_DOCS = "MANAGE-DOCS", CHAT = "CHAT"

export const WebSocketContext = createContext()

let ws = {};

const SidebarContainer = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const screens = useBreakpoint()

  const user = useSelector(state => state.auth.user)

  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState(DASHBOARD)

  const onLogoutHandler = () => {
    dispatch(actions.logout())
    ws.close()
    router.replace('/')
  }

  useEffect(() => {
    let mounted = true
    if(mounted && screens.xs) setCollapsed(true)
    else setCollapsed(false)
  }, [screens])

  /*WEBSOCKET*/
  const wsConnect = () => {
    const cookies = nookies.get()
    if(cookies && cookies.csrf_access_token) {
      ws = new WebSocket(`ws://${process.env.NEXT_PUBLIC_HOSTNAME}:8000/dashboard/ws?csrf_token=${cookies.csrf_access_token}`);

      ws.onopen = () => {
        ws.send("Connected");
        ws.send(`kind:live_cam_false`);
      };

      ws.onclose = () => {
        ws.close()
        setTimeout(() => {
          wsConnect()
        }, 3000);
      };
    }

    ws.onerror = () => {
      ws.close()
    };
  };
  /*WEBSOCKET*/

  /*CONNECT TO WEBSOCKET WHEN MOUNTED*/
  useEffect(() => {
    if (ws.readyState !== 1) {
      wsConnect();
    }
  }, []);
  /*CONNECT TO WEBSOCKET WHEN MOUNTED*/

  useEffect(() => {
    let routeNow = router.pathname.split("/")[router.pathname.split("/").length - 1]
    let data = routeNow.toUpperCase()
    if(router.pathname.split("/")[router.pathname.split("/").length - 1].startsWith('[')) {
      data = router.pathname.split("/")[router.pathname.split("/").length - 2].toUpperCase()
    }
    setSelected(data)
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
                </>
              )}
              <Menu.Item 
                key={LOGOUT} 
                icon={<i className="far fa-sign-out" />}
                onClick={onLogoutHandler}
              >
                Log Out
              </Menu.Item>
            </Menu>
          </div>
        </Layout.Sider>
        <Layout className="main-layout">
          <WebSocketContext.Provider value={ws}>
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
