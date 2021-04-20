import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'

import Style from './style'
import SplitText from './SplitText'

const HOME = "HOME", REPORTS = "REPORTS", LOGOUT = "LOGOUT", DASHBOARD = "DASHBOARD", CONTROLS = "CONTROLS", PLANTS = "PLANTS", ACCOUNTS = "ACCOUNTS"

const SidebarContainer = ({ children }) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

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
              defaultSelectedKeys={[router.pathname.split("/")[router.pathname.split("/").length - 1].toUpperCase()]}
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
              <Menu.Item key={LOGOUT} icon={<i className="far fa-sign-out" />}>
                <a href="/">
                  Log Out
                </a>
              </Menu.Item>
            </Menu>
          </div>
        </Layout.Sider>
        <Layout className="main-layout">
          {children}
        </Layout>
      </Layout>

      <style jsx global>{Style}</style>
    </>
  )
}

export default SidebarContainer
