import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Layout, Menu, Grid } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, createContext } from 'react'

import Style from './style'
import SplitText from './SplitText'
import * as actions from 'store/actions'

const useBreakpoint = Grid.useBreakpoint
const HOME = "HOME", REPORTS = "REPORTS", LOGOUT = "LOGOUT", DASHBOARD = "DASHBOARD", CONTROLS = "CONTROLS", PLANTS = "PLANTS", ACCOUNTS = "ACCOUNTS", ADD_PLANTS = "ADD-PLANTS"

export const WebSocketContext = createContext()

let ws = {};

const SidebarContainer = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const screens = useBreakpoint()

  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState(DASHBOARD)

  const onLogoutHandler = () => {
    dispatch(actions.logout())
    router.replace('/')
  }

  useEffect(() => {
    let mounted = true
    if(mounted && screens.xs) setCollapsed(true)
    else setCollapsed(false)
  }, [screens])

  /*WEBSOCKET*/
  const wsConnect = () => {
    return false
    let tkn =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjE5MjQ4MzU1LCJuYmYiOjE2MTkyNDgzNTUsImp0aSI6IjE2MGQ0N2FkLWM1YzctNDFiMy04MDA3LTlmMWJhMTkyNGMwYyIsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2UsImNzcmYiOiI0Njc2YjFmZS00ZTEyLTRhZDItODViZS01NzVlYzcxOWVmNDQifQ.w3PvDUeTPevHr0cOB6OzlVbZLJag7PH5yZS_n91RlV8";

    let tkn2 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjE5NTQ3MjA4LCJuYmYiOjE2MTk1NDcyMDgsImp0aSI6IjBiZmFhODViLTcxZmQtNGE2OS05YzVkLWJjY2U3MTA2MTgxZSIsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2UsImNzcmYiOiI0N2M3ODcwYi1mZDk2LTQwZjYtYTBmYy1jZTkyYmMxYWQ2YTkifQ.XBQncUZojqtBLlqiup2xT7heyQSggaiMWu15RfomEJo";

    // ws = new WebSocket(`ws://192.168.18.37:8000/dashboard/ws?token=${tkn2}`);
    ws = new WebSocket(`ws://192.168.18.86:8000/dashboard/ws?token=${tkn}`);

    ws.onopen = () => {
      ws.send("Connected");
      console.log("Connected");
      ws.send(`kind:live_cam_false`);
    };

    console.log(ws)

    ws.onmessage = (msg) => {
      console.log(msg.data)
    }

    ws.onclose = (e) => {
      ws.close()
      console.log("Layout Disconected.\nReconnect will be attempted in 1 second.", e.reason);
      setTimeout(() => {
        wsConnect()
      }, 3000);
    };

    ws.onerror = (err) => {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
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
    const data = router.pathname.split("/")[router.pathname.split("/").length - 1].toUpperCase()
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
                key={ADD_PLANTS}
                icon={<i className="far fa-hand-holding-seedling" />} 
                onClick={() => router.push('/dashboard/add-plants')}
              >
                Add Plants
              </Menu.Item>
              <Menu.Item 
                key={ACCOUNTS} 
                icon={<i className="far fa-user" />} 
                onClick={() => router.push('/dashboard/accounts')}
              >
                Accounts
              </Menu.Item>
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
      `}</style>
    </>
  )
}

export default SidebarContainer
