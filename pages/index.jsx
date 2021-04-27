import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Row, Col, Button, Divider, Grid, Drawer } from 'antd'

import Link from 'next/link'
import Image from 'next/image'

const useBreakpoint = Grid.useBreakpoint
const Garden = '/static/images/garden-3.svg'
const BetterFood = '/static/images/better-food.svg'
const GrowthOwn = '/static/images/growth-own.svg'
const AboutUs = '/static/images/about-us-2.svg'
const Analytics = '/static/images/analytics.svg'
const Presentation = '/static/images/presentation.svg'
const Process = '/static/images/process.svg'
const PlantsHand = '/static/images/plants-hand.svg'
const GrowingPlant = '/static/images/growing-plant.svg'

const services_list = [
  { title: "Realtime Monitoring", image: Analytics, label: "Imagine you are a recruiter with hundreds or even thousands" },
  { title: "Automated Control", image: Process, label: "Imagine you are a recruiter with hundreds or even thousands" },
  { title: "Multiple Plants", image: PlantsHand, label: "Imagine you are a recruiter with hundreds or even thousands" },
  { title: "Automated Report", image: Presentation, label: "Imagine you are a recruiter with hundreds or even thousands" },
  { title: "Growth Plant", image: GrowingPlant, label: "Using image processing" },
]

const Home = () => {
  const { xs, sm, md, lg, xl } = useBreakpoint()
  const [visible, setIsVisible] = useState(false)

  const user = useSelector(state => state.auth.user)

  return (
    <>
      <nav className="menuBar">
        <div className="logo">
          <a href="/">
            <Image src="/static/images/logo-hydro.png" height={50} width={195} />
          </a>
        </div>
        <div className="menuCon">
          {md ? (
            <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
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
              <Menu.Item key="dashboard">
                <Link href="/dashboard" as="/dashboard">
                  <a>Dashboard</a>
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

      <main className="site-body">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle">
            <Col xl={24} lg={24} md={23} sm={23} xs={23}>
              <Row gutter={[20, 20]} justify="center" align="middle">
                <Col xl={{span: 8, order: 1}} lg={{span: 8, order: 1}} 
                  md={{span: 12, order: 1}} sm={{span: 24, order: 2}} xs={{span: 24, order: 2}}
                >
                  <div>
                    <h1 className="bold h1">A beautiful garden is a combination work of heart and technology.</h1>
                    <p>Grow it yourselft, plant a farm Garden now. Gardening grows the spirit. Flowers feed the soul.</p>
                    <Button className="ant-btn-green">
                      <Link href={(user && user.username && user.avatar) ? "/dashboard" : "/auth"}>
                        <a>Get Started</a>
                      </Link>
                    </Button>
                  </div>
                </Col>
                <Col xl={{span: 12, order: 2}} lg={{span: 12, order: 2}}
                  md={{span: 12, order: 2}} sm={{span: 24, order: 1}} xs={{span: 24, order: 1}}
                >
                  <div className="text-center">
                    <Image
                      width="600"
                      height="600"
                      src={Garden}
                      alt="temperature"
                      className="ml5"
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </main>

      <section id="service" className="p-t-80 p-b-40 bg-gradient-2">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle">
            <Col xl={24} lg={24} md={23} sm={23} xs={23}>
              <Row gutter={[20, 20]} justify="center" align="middle">
                <Col span={24}>
                  <div className="text-center">
                    <h2 className="h2 bold">Our Service</h2>
                    <p className="text-justify m-b-30">
                      Imagine you are a recruiter with hundreds or even thousands of applicants data to screen and process.
                    </p>
                    <p className="text-justify m-b-30">
                      xs: {JSON.stringify(xs)}, sm: {JSON.stringify(sm)}, md: {JSON.stringify(md)}, lg: {JSON.stringify(lg)}, xl: {JSON.stringify(xl)}
                    </p>
                  </div>
                </Col>
                <Col xl={18} lg={18} md={20} sm={24} xs={24}>
                  <Row gutter={[20, 20]} justify="center" align="middle">
                    {services_list.map((data, i) => (
                      <Col xl={8} lg={8} md={12} sm={12} xs={12} key={i}>
                        <div className="text-center">
                          <Image
                            width={90}
                            height={90}
                            src={data.image}
                            alt="temperature"
                            className="ml5"
                          />
                          <h3 className="h3 bold">{data.title}</h3>
                          <p className="text-justify">
                            {data.label}
                          </p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <div id="about" />
        </div>
      </section>

      <section className="m-b-0 bg-gradient-2">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle">
            <Col xl={19} lg={19} md={24} sm={24}xs={24}>
              <Row gutter={[20, 20]} justify="center" align="middle">
                <Col xl={{span: 12, order: 1}} lg={{span: 12, order: 1}}
                  md={{span: 12, order: 1}} sm={{span: 12, order: 1}} xs={{span: 24, order: 1}}
                >
                  <div className="text-center">
                    <Image
                      width="500"
                      height="500"
                      src={AboutUs}
                      alt="temperature"
                      className="ml5"
                    />
                  </div>
                </Col>
                <Col xl={{span: 12, order: 2}} lg={{span: 12, order: 2}} 
                  md={{span: 12, order: 2}} sm={{span: 12, order: 2}} xs={{span: 24, order: 2}}
                >
                  <div className="text-left">
                    <h2 className="h2 bold">About Us</h2>
                    <p>
                      Imagine you are a recruiter with hundreds or even thousands of applicants data to screen and process. 
                      Grow it yourselft, plant a farm Garden now. Gardening grows the spirit. Flowers feed the soul.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <svg
          viewBox="0 0 1440 270"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: "-250px", marginBottom: "-7px" }}
        >
          <path
            fill="rgb(180 222 220)"
            d="M0 192l60-10.7c60-10.3 180-32.3 300-26.6C480 160 600 192 720 176c120-16 240-80 360-101.3 120-21.7 240 .3 300 10.6l60 10.7v224H0z"
          ></path>
        </svg>
      </section>

      <main className="bg-gradient-3">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle">
            <Col xl={19} lg={19} md={24} sm={24}xs={24}>
              <Row gutter={[20, 20]} justify="center" align="middle">
                <Col xl={{span: 12, order: 2}} lg={{span: 12, order: 2}}
                  md={{span: 12, order: 2}} sm={{span: 12, order: 2}} xs={{span: 24, order: 1}}
                >
                  <div className="text-center">
                    <Image
                      width="450"
                      height="450"
                      src={BetterFood}
                      alt="temperature"
                      className="ml5"
                    />
                  </div>
                </Col>
                <Col xl={{span: 12, order: 1}} lg={{span: 12, order: 1}}
                  md={{span: 12, order: 1}} sm={{span: 12, order: 1}} xs={{span: 24, order: 2}}
                >
                  <div className="text-left">
                    <h2 className="h2 bold">Creating a Better Hydroponics System</h2>
                    <p>
                      Imagine you are a recruiter with hundreds or even thousands of applicants data to screen and process.
                      Grow it yourselft, plant a farm Garden now. Gardening grows the spirit. Flowers feed the soul.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </main>

      <main className="bg-gradient-3">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle">
            <Col xl={19} lg={19} md={24} sm={24}xs={24}>
              <Row gutter={[20, 20]} justify="center" align="middle">
                <Col xl={{span: 12, order: 1}} lg={{span: 12, order: 1}}
                  md={{span: 12, order: 1}} sm={{span: 12, order: 1}} xs={{span: 24, order: 1}}
                >
                  <div className="text-center">
                    <Image
                      width="450"
                      height="450"
                      src={GrowthOwn}
                      alt="temperature"
                      className="ml5"
                    />
                  </div>
                </Col>
                <Col xl={{span: 12, order: 2}} lg={{span: 12, order: 2}}
                  md={{span: 12, order: 2}} sm={{span: 12, order: 2}} xs={{span: 24, order: 2}}
                >
                  <div className="text-left">
                    <h2 className="h2 bold">Grow your own plant</h2>
                    <p>
                      Imagine you are a recruiter with hundreds or even thousands of applicants data to screen and process.
                      Grow it yourselft, plant a farm Garden now. Gardening grows the spirit. Flowers feed the soul.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </main>

      <main className="bg-gradient-4">
        <svg 
          viewBox="0 0 1440 250"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: "-80px", marginBottom: "-7px" }}
        >
          <path
            fill="#fafafa"
            d="M0 192l60-10.7c60-10.3 180-32.3 300-26.6C480 160 600 192 720 176c120-16 240-80 360-101.3 120-21.7 240 .3 300 10.6l60 10.7v224H0z"
          ></path>
        </svg>
      </main>

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
                    Imagine you are a recruiter with hundreds or even thousands of applicants data to screen and process.
                    Grow it yourselft, plant a farm Garden now. Gardening grows the spirit. Flowers feed the soul.
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
                    <a href="mailto:support@automatch.com">suardhanatugas@gmail.com</a>
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
          <Menu.Item key="dashboard">
            <Link href="/dashboard" as="/dashboard">
              <a>Dashboard</a>
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
  z-index: 1;
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

.site-body {
  padding-top: 88px;
  background: rgb(3,154,145);
  background: linear-gradient(180deg, rgba(3,154,145,0.31556372549019607) 8%, rgba(250,250,250,1) 84%);
}

.site-body-2 {
  padding-top: 88px;
  background: rgb(192 223 220);
}

.site-body-3 {
  background: rgba(255,203,93);
  background: linear-gradient(180deg, rgba(255,203,93,0.21192226890756305) 0%, rgba(250,250,250,0.6881127450980392) 77%);
}

.bg-gradient-2 {
  background: inherit;
}

.bg-gradient-3 {
  background: rgb(180 222 220);
}

.bg-gradient-4 {
  background: rgb(180 222 220);
  background: linear-gradient(180deg, rgba(180,222,220,1) 8%, rgba(255,255,255,1) 84%);
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

export default Home
