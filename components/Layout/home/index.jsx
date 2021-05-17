import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Row, Col, Button, Divider, Grid, Drawer } from 'antd'

import Link from 'next/link'
import Image from 'next/image'

const useBreakpoint = Grid.useBreakpoint

const HomeLayout = ({ children }) => {
  const router = useRouter()
  const { lg } = useBreakpoint()

  const user = useSelector(state => state.auth.user)

  const [visible, setIsVisible] = useState(false)
  const [selected, setSelected] = useState("home")

  useEffect(() => {
    let data = ""
    if(router.asPath.indexOf("#") == "-1") data = router.pathname.split("/")[1]
    else data = router.asPath.split("/")[1]
    setSelected(data)
    return () => data = ""
  }, [router])

  return(
    <>
      <nav className="menuBar">
        <div className="logo">
          <a href="/">
            <Image src="/static/images/logo-hydro.png" height={50} width={195} />
          </a>
        </div>
        <div className="menuCon">
          {lg ? (
            <Menu mode="horizontal" defaultSelectedKeys={[selected]} style={{minWidth: 'max-content'}}>
              <Menu.Item key="home">
                <Link href="/#home" as="/#home">
                  <a>Home</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="#service4">
                <Link href="/#service" as="/#service">
                  <a>Service</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="#service">
                <Link href="/#service" as="/#service">
                  <a>Service</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="#about">
                <Link href="/#about" as="/#about">
                  <a>About Us</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="blog">
                <Link href="/blog" as="/blog">
                  <a>Blog</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="docs">
                <Link href="/docs" as="/docs">
                  <a>Documentation</a>
                </Link>
              </Menu.Item>
              {(user && user.username && user.avatar) ? (
                <Menu.Item key="dashboard">
                  <Link href="/dashboard" as="/dashboard">
                    <a>Dashboard</a>
                  </Link>
                </Menu.Item>
              ) : (
                <Menu.Item key="signin">
                  <Link href="/auth" as="/auth">
                    <a>Sign In</a>
                  </Link>
                </Menu.Item>
              )}
            </Menu>
          ) : (
            <Button
              type="text"
              className="m-r-10"
              icon={<i className="far fa-bars" />}
              onClick={() => setIsVisible(true)}
            />
          )}
        </div>
      </nav>

      {children}

      <main>
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle" className="m-b-30">
            <Col xl={19} lg={19} md={24} sm={24} xs={24}>
              <div className="text-center m-b-30">
                <Image src="/static/images/logo-hydro.png" height={50} width={195} />
              </div>

              <Row gutter={[20, 20]} justify="center" className="text-center">
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <h3 className="bold h3">Short History</h3>
                  <p>
                    We are a small team, which is engaged in agriculture, especially hydroponics, we use technology to facilitate automatic maintenance of a plantation and will increase the yield of better quality crops.
                    {/* We are a small team, yang bergerak di bidang pertanian khususnya hydroponic, kita memanfaatkan teknologi untuk memudahkan pemeliharaan suatu perkebunan secara otomatis dan akan meningkatkan hasil kualitas panen menjadi lebih baik. */}
                  </p>
                </Col>

                <Col xl={8} lg={8} md={8} sm={24} xs={24} className="footer__contact">
                  <h3 className="bold h3">Contact</h3>
                  <p>
                    <i className="fas fa-map-marker-alt"></i> Taman Giri, Jl. Jalan No.84
                  </p>
                  <p>
                    <i className="fas fa-phone"></i> Phone: (0361) 144 527 93
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i> Email:{" "}
                    <a href="mailto:hydroxtech@gmail.com">hydroxtech@gmail.com</a>
                  </p>
                </Col>

                <Col xl={8} lg={8} md={8} sm={24} xs={24} className="footer__social">
                  <h3 className="bold h3">Follow us</h3>
                  <p>
                    <a href="*">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="*">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="*">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="*">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </p>
                </Col>
              </Row>

              <Divider />

              <p className="text-center m-b-25">All right reserved @hydroxtech</p>

            </Col>
          </Row>

        </div>
      </main>

      <Drawer
        placement="right"
        zIndex="1030"
        visible={visible}
        onClose={() => setIsVisible(false)}
        closeIcon={<i className="fas fa-times" />}
        headerStyle={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
      >
        <Menu mode="inline" defaultSelectedKeys={["home"]} className="m-t-15 menu-mobile">
          <Menu.Item key="home">
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="service">
            <Link href="#service" as="#service">
              <a>Service</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link href="#about" as="#about">
              <a>About Us</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="blog">
            <Link href="/blog" as="/blog">
              <a>Blog</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="docs">
            <Link href="/docs" as="/docs">
              <a>Documentation</a>
            </Link>
          </Menu.Item>
          {(user && user.username && user.avatar) ? (
            <Menu.Item key="dashboard">
              <Link href="/dashboard" as="/dashboard">
                <a>Dashboard</a>
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="signin">
              <Link href="/auth" as="/auth">
                <a>Sign In</a>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ".2" }}
            className="overlay-blur"
          />
        )}
      </AnimatePresence>

      <style global jsx>{`
.menuBar {
  z-index: 2;
  width: 100%;
  position: fixed;
  padding: 0 10px;
  overflow: auto;
  backdrop-filter: blur(8px);
}

.logo {
  width: fit-content;
  float: left;
}

.logo a {
  display: inline-block;
  font-size: 20px;
  padding: 15px 10px 0px 10px;
  text-transform: capitalize;
}

.menuCon {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 74px;
}

.menuCon .ant-menu {
  background: inherit;
}

.menuCon .ant-menu-item {
  padding: 0px 5px;
}

.menuCon .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item {
  margin: 0 10px;
}

.menuCon .ant-menu-submenu-title {
  padding: 10px 20px;
}

.menuCon .ant-menu-item a,
.menuCon .ant-menu-submenu-title a {
  padding: 10px 15px;
}

.menuCon .ant-menu-horizontal {
  border-bottom: none;
}

.menuCon .ant-menu-horizontal > .ant-menu-item a:hover, 
.menuCon .ant-menu-horizontal > .ant-menu-item-selected a,
.menuCon .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,
.menuCon .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected {
  color: var(--green);
  border-color: var(--green);
}

.ant-menu-inline .ant-menu-item::after, .ant-menu-inline {
  border-width: 0px;
}

.menu-mobile.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  font-weight: 600 !important;
  background-color: #e4f1f1!important;
}

.menu-mobile .ant-menu-item {
  border-radius: 0.8rem;
}

.menu-mobile.ant-menu, .menu-mobile .ant-menu-item a {
  color: var(--grey-1) !important;
}

.menu-mobile .ant-menu-item:hover, 
.menu-mobile .ant-menu-item-selected, 
.menu-mobile .ant-menu-item-selected a:hover, 
.menu-mobile .ant-menu-item-selected a {
  color: #2f9991!important;
}

.menu-mobile .ant-menu-item:active, .menu-mobile .ant-menu-submenu-title:active {
  background: #e4f1f1!important;
}


.footer__top { padding: 60px 0; background: #021927; text-align: left; color: white;}
.footer__top h3 { padding-bottom: 10px; color: #fff; }

.footer__about img.footer__logo { max-width: 250px; margin-top: 0; margin-bottom: 18px; }
.footer__about p a { color: #aaa !important;}

.footer__contact p { word-wrap: break-word;}
.footer__contact i { padding-right: 10px; font-size: 18px; color: var(--grey); }
.footer__contact p a { color: var(--grey-1)!important; }

.footer__social a { display: inline-block; margin-right: 20px; margin-bottom: 8px; color: var(--grey)!important; border: 0; }
.footer__social a:hover, .footer__social a:focus { color: #aaa !important; border: 0; }
.footer__social i { font-size: 24px; vertical-align: middle; }

.footer__copyright p { margin: 0; padding: 0.5rem 0; }
.footer__copyright a { color: #fff; border: 0; }
.footer__copyright a:hover, .footer__copyright a:focus { color: #aaa; border: 0; }
      `}</style>
    </>
  )
}

export default HomeLayout
