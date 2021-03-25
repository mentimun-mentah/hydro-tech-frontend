import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'

import Link from 'next/link'

import Style from './style'
import SplitText from './SplitText'

const HOME = "HOME", REPORT = "REPORT", SETTING = "SETTING", LOGOUT = "LOGOUT", DASHBOARD = "DASHBOARD"

const SidebarContainer = ({ children /*, setShowReport, setShowSetting, activeMenu, setActiveMenu */ }) => {
  const [collapsed, setCollapsed] = useState(false)

  return(
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider 
          collapsible 
          theme="light"
          collapsed={collapsed} 
          data-testid="sidebar"
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
              theme="light" 
              mode="inline" 
              inlineIndent={15} 
              defaultSelectedKeys={[DASHBOARD]}
              // selectedKeys={[activeMenu]}
              // onSelect={val => setActiveMenu(val.key)}
            >
              <Menu.Item key={HOME} icon={<i className="far fa-door-open" />}>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </Menu.Item>
              <Menu.Item key={DASHBOARD} icon={<i className="far fa-house-flood" />}>
                Dashboard
              </Menu.Item>
              <Menu.Item key={REPORT} icon={<i className="far fa-clipboard-list" />} onClick={() => console.log(true)}>
                Report
              </Menu.Item>
              <Menu.Item key={SETTING} icon={<i className="far fa-cog" />} onClick={() => console.log(true)}>
                Settings
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
