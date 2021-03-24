import './Sidebar.css';
import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from "react-router-dom";

import * as menus from 'App'

const SplitText = ({ children, ...rest }) => {
  let words = children.split(' ')
  return words.map((word, i) => {
    return (
      <div
        key={children + i}
        style={{ display: 'inline-block', overflow: 'hidden' }}
      >
        <motion.div {...rest} custom={i} style={{ display: 'inline-block', willChange: 'transform' }}>
          {word + (i !== words.length - 1 ? '\u00A0' : '')}
        </motion.div>
      </div>
    )
  })
}

const SidebarContainer = ({ children, setShowReport, setShowSetting, activeMenu, setActiveMenu }) => {
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
              selectedKeys={[activeMenu]}
              onSelect={val => setActiveMenu(val.key)}
            >
              <Menu.Item key={menus.HOME} icon={<i className="far fa-house-flood" />}>
                <Link to="/dashboard">
                  Dashboard
                </Link>
              </Menu.Item>
              <Menu.Item key={menus.REPORT} icon={<i className="far fa-clipboard-list" />} onClick={() => setShowReport(true)}>
                Report
              </Menu.Item>
              <Menu.Item key={menus.SETTING} icon={<i className="far fa-cog" />} onClick={() => setShowSetting(true)}>
                Settings
              </Menu.Item>
              <Menu.Item key={menus.LOGOUT} icon={<i className="far fa-sign-out" />}>
                <Link to="/">
                  Log Out
                </Link>
              </Menu.Item>
              <Menu.Item key="/login" icon={<i className="far fa-sign-in" />}>
                <Link to="/login">
                  Sign in
                </Link>
              </Menu.Item>
              <Menu.Item key="/register" icon={<i className="far fa-sign-in" />}>
                <Link to="/register">
                  Register
                </Link>
              </Menu.Item>
              <Menu.Item key="/forgot-password" icon={<i className="far fa-sign-in" />}>
                <Link to="/forgot-password">
                  Forgot Password
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Layout.Sider>
        <Layout className="main-layout">
          {children}
        </Layout>
      </Layout>
    </>
  )
}

export default SidebarContainer
