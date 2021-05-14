import { Layout, Menu } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

import Link from 'next/link'
import SplitText from '../dashboard/SplitText'

const LayoutDocs = ({ children }) => {
  return(
    <>
      <Layout>
        <Layout.Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          className="ant-layout-sider-custom"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="sidebar-inner">
            <div className="logo text-center bold">
              <Link href="/" as="/">
                <motion.a
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover-pointer text-reset"
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
                </motion.a>
              </Link>
            </div>

            <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} className="ant-menu-scroll">
              {[...Array(40)].map((_, i) => (
                <Menu.Item key={i}>
                  <Link href={`/docs/#${i}`} as={`/docs/#${i}`}>
                    <a>navgation {i}</a>
                  </Link>
                </Menu.Item>
              ))}
            </Menu>

          </div>
        </Layout.Sider>

        <Layout className="bg-white">
          {children}
        </Layout>
      </Layout>

      {/* <style jsx global>{Style}</style> */}
      <style jsx>{`
        :global(.ant-layout-sider) {
          background: var(--white)!important;
        }

        :global(.ant-layout-sider-custom .ant-layout-sider-children) {
          top: 0;
          height: 100vh;
          width: inherit;
          position: fixed;
        }
        :global(.ant-menu, .ant-menu-item a) {
          color: var(--grey)!important;
        }
        :global(.ant-menu-item-selected, 
        .ant-menu-item-selected a:hover, 
        .ant-menu-item-selected a) {
          color: var(--black)!important;
        }

        :global(.ant-menu-item:hover, 
        .ant-menu-item a:hover, 
        .ant-menu-item-active, 
        .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, 
        .ant-menu-submenu-active, .ant-menu-submenu-title:hover,
        .ant-menu-item-selected a:hover) {
          color: var(--black)!important;
        }
        :global(.ant-menu-inline) {
          border-right: 1px solid white!important;
        }

        :global(.ant-menu-inline .ant-menu-item::after, .ant-menu-vertical, .ant-menu-vertical .ant-menu-item::after) {
          border-right: 3px solid var(--black)!important;
        }

        :global(.ant-menu-sub.ant-menu-inline) {
          background: transparent;
        }

        :global(.ant-menu-scroll) {
          overflow: scroll;
          height: 100vh;
        }

        :global(.ant-menu-scroll::-webkit-scrollbar) {
          width: 0;  /* Remove scrollbar space */
          background: transparent;  /* Optional: just make scrollbar invisible */
        }

        :global(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
          font-weight: 600!important;
          background-color: #f0f1f2!important;
        }

        :global(.ant-menu-item:active, .ant-menu-submenu-title:active) {
          background: #f0f1f2!important;
        }
        :global(.ant-menu-sub.ant-menu-inline) {
          background: transparent;
        }

        :global(.ant-menu-submenu-arrow::before, .ant-menu-submenu-arrow::after) {
          width: 7px;
        }

        :global(.logo) {
          padding-top: 1rem;
          padding-bottom: 15px;
          font-size: 1.1rem;
        }
      `}</style>
    </>
  )
}

export default LayoutDocs
