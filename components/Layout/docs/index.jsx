import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Layout, Menu, Row, Col, Button, Drawer, Affix, AutoComplete, Input } from 'antd'
import { SearchOutlined, MenuOutlined } from '@ant-design/icons'

import React from 'react'
import Link from 'next/link'
import slugify from 'react-slugify'
import SplitText from '../dashboard/SplitText'

export const menuItems = [
  {
    category: 'Learn ESP32', 
    items: [
      {title: 'ESP32 Introduction'},
      {title: 'ESP32 Arduino IDE'},
      {title: 'VS Code and PlatformIO'},
      {title: 'ESP32 Pinout'},
      {title: 'ESP32 Inputs Outputs'},
      {title: 'ESP32 PWM'},
      {title: 'ESP32 Analog Inputs'},
      {title: 'ESP32 Interrupts Timers'},
      {title: 'ESP32 Deep Sleep'},
    ]
  },
  {
    category: 'Protocols', 
    items: [
      {title: 'ESP32 Web Server'},
      {title: 'ESP32 LoRa'},
      {title: 'ESP32 BLE'},
      {title: 'ESP32 Bluetooth'},
      {title: 'ESP32 MQTT'},
      {title: 'ESP32 ESP-NOW'},
      {title: 'ESP32 Wi-Fi'},
      {title: 'ESP32 WebSocket'},
      {title: 'ESP32 ESP-MESH'},
      {title: 'ESP32 Email'},
      {title: 'ESP32 Text Messages'},
    ]
  },
  {
    category: 'Arduino Modules', 
    items: [
      {title: 'Arduino Relay Module'},
      {title: 'Arduino WS2812B'},
      {title: 'Arduino IR Receiver'},
      {title: 'Arduino Reed Switch'},
      {title: 'Arduino Ultrasonic Sensor'},
      {title: 'Arduino SD Card'},
      {title: 'Arduino Fingerprint Sensor'},
      {title: 'Arduino Membrane Keypad'},
    ]
  },
  {
    category: 'Arduino Sensors', 
    items: [
      {title: 'Arduino DHT11/DHT22'},
      {title: 'Arduino BME280'},
      {title: 'Arduino BMP180'},
      {title: 'Arduino BME680'},
      {title: 'Arduino DS18B20'},
      {title: 'Arduino LM35 Sensor'},
      {title: 'Arduino Tilt Sensor'},
      {title: 'Arduino Microphone'},
      {title: 'Arduino Color Sensor'},
    ]
  },
]

const Logo = () => (
    <Link href="/" as="/">
    <motion.a initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hover-pointer text-reset">
      <SplitText
        animate="visible"
        initial={{ x: '-100%' }}
        variants={{ visible: i => ({ x: 0, transition: { delay: i * .2 } }) }}
      >
        HYDRO X TECH
      </SplitText>
    </motion.a>
  </Link>
)

const renderTitle = (title) => (
  <span> {title} </span>
);

const renderItem = (label) => ({
  value: label,
  label: (
    <p className="m-b-0 fw-600"> {label} </p>
  ),
})

const renderOption = () => {
  let res = []
  for(let menu of menuItems) {
    let data = {
      label: renderTitle(menu.category),
      options: []
    }
    for(let item of menu.items) {
      data.options.push(renderItem(item.title))
    }
    res.push(data)
  }
  return res
}


const LayoutDocs = ({ children }) => {
  const router = useRouter()
  const [selected, setSelected] = useState("#esp32-introduction")
  const [collapsed, setCollapsed] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    setSelected(router.asPath.split('#')[1])
  }, [router])

  const onSelectSuggestionHandler = val => {
    router.push(`/docs/#${slugify(val)}`)
  }

  return(
    <>

      <div className="main-wrapper">

        {showButton && (
          <Affix offsetTop={75}>
            <Button 
              className="btn-white border-radius-2px"
              onClick={() => setCollapsed(s => !s)}
              style={{ position: 'absolute', zIndex: '1' }}
            >
              <MenuOutlined />
            </Button>
          </Affix>
        )}

        <Row gutter={[0,0]}>
          <Col className="main-menu" xxl={4} xl={5} lg={5} md={0} sm={0} xs={0}>
            <div className="w-100">
              <section className="main-menu-inner">
                <Layout.Sider
                  theme="light"
                  breakpoint="lg"
                  collapsedWidth="0"
                  width={"100%"}
                  onBreakpoint={val => setShowButton(val)}
                >

                <Affix offsetTop={0}>
                  <div className="logo text-center bold">
                    <Logo />
                  </div>

                  <Menu 
                    mode="inline" 
                    theme="light" 
                    inlineIndent={30}
                    style={{ width: '100%' }}
                    selectedKeys={[selected]}
                    className="aside-container menu-site ant-menu-root ant-menu-inline ant-menu-scroll"
                  >
                    {menuItems.map(menu => (
                      <Menu.ItemGroup title={menu.category} key={slugify(menu.category)}>
                        {menu.items.map(item => (
                          <Menu.Item key={slugify(item.title)}>
                            <Link href={`/docs/#${slugify(item.title)}`} as={`/docs/#${slugify(item.title)}`}>
                              <a>{item.title}</a>
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu.ItemGroup>
                    ))}
                  </Menu>
                </Affix>

                </Layout.Sider>
              </section>
            </div>
          </Col>

          <Col xxl={20} xl={19} lg={19} md={24} sm={24} xs={24}>
            <Affix offsetTop={0}>
              <section className="container-search">
                <div className="w-100 nav-search">
                  <AutoComplete 
                    className="w-100" 
                    options={renderOption()}
                    dropdownClassName="fixed top-65" 
                    onSelect={onSelectSuggestionHandler}
                  >
                    <Input
                      size="large"
                      placeholder="Search"
                      className="h-65"
                      prefix={<SearchOutlined className="text-grey"/>}
                    />
                  </AutoComplete>
                </div>
              </section>
            </Affix>

            <section className="main-container main-container-component">
              {children}
            </section>

          </Col>
        </Row>
      </div>

      <Drawer
        placement="left"
        closable={false}
        visible={collapsed}
        onClose={() => setCollapsed(false)}
        bodyStyle={{ overflow: 'hidden' }}
        title={
          <div className="logo-drawer bold">
            <Logo />
          </div>
        }
      >
        <Menu 
          mode="inline" 
          theme="light" 
          inlineIndent={10}
          style={{ width: '100%' }}
          selectedKeys={[selected]}
          className="aside-container-drawer menu-site ant-menu-root ant-menu-inline ant-menu-scroll"
        >
          {menuItems.map(menu => (
            <Menu.ItemGroup title={menu.category} key={slugify(menu.category)}>
              {menu.items.map(item => (
                <Menu.Item key={slugify(item.title)}>
                  <Link href={`/docs/#${slugify(item.title)}`} as={`/docs/#${slugify(item.title)}`}>
                    <a>{item.title}</a>
                  </Link>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          ))}
        </Menu>
      </Drawer>

      <style jsx>{`
        .main-wrapper {
          background: #fff;
          padding: 0;
          position: relative;
        }
        :global(.main-menu) {
          z-index: 1;
        }
        :global(.main-menu>div, .main-menu>div>div) {
          height: 100%;
        }
        :global(.main-menu-inner) {
          height: 100%;
          max-height: 100vh;
          overflow: hidden;
        }
        :global(.aside-container) {
          min-height: 100%;
          padding-bottom: 48px;
        }
        :global(.aside-container.ant-menu-inline>.ant-menu-item-group>.ant-menu-item-group-title) {
          padding-left: 30px!important;
          font-size: 13px;
          margin-bottom: 16px;
          margin-top: 16px;
        }
        :global(.ant-menu-item-group-title) {
          color: rgba(0,0,0,.45);
          line-height: 1.5715;
          padding: 8px 16px;
          transition: all .3s;
        }
        :global(.aside-container.ant-menu-inline>.ant-menu-item-group>.ant-menu-item-group-title:after) {
          background: #f0f0f0;
          content: "";
          display: block;
          height: 1px;
          position: relative;
          top: 12px;
          width: calc(100% - 20px);
        }

        :global(.aside-container-drawer.ant-menu-inline>.ant-menu-item-group>.ant-menu-item-group-title) {
          padding-left: 10px!important;
          font-size: 13px;
          margin-bottom: 16px;
          margin-top: 16px;
        }
        :global(.aside-container-drawer.ant-menu-inline>.ant-menu-item-group>.ant-menu-item-group-title:after) {
          background: #f0f0f0;
          content: "";
          display: block;
          height: 1px;
          position: relative;
          top: 12px;
          width: calc(100% - 20px);
        }
        :global(.aside-container-drawer.ant-menu-inline) {
          border-right: unset;
        }


        :global(.ant-menu, .ant-menu-item a) {
          color: var(--grey-1)!important;
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

        :global(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
          font-weight: 600!important;
          background-color: #f0f1f2!important;
        }

        :global(.ant-menu-item:active, .ant-menu-submenu-title:active) {
          background: #f0f1f2!important;
        }

        :global(.ant-menu-inline .ant-menu-item::after, .ant-menu-vertical, .ant-menu-vertical .ant-menu-item::after) {
          border-right: 3px solid var(--grey-1);
        }

        .container-search {
          padding: 0 84px;
          margin-bottom: 10px;
          background: #fff;
          box-shadow: 0 2px 8px #dedede;
        }
        :global(.container-search .ant-input-affix-wrapper) {
          border: unset!important;
        }
        :global(.container-search .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover) {
          border-color: unset!important;
        }
        :global(.container-search .ant-input-affix-wrapper:focus, .container-search .ant-input-affix-wrapper-focused) {
          box-shadow: unset!important;
        }
          
        .main-container {
          min-height: 500px;
          padding: 0 84px 32px 84px;
        }
        @media only screen and (max-width: 992px) {
          .main-container, .container-search {
            padding-left: 48px;
            padding-right: 48px;
          }
        }
        @media only screen and (max-width: 480px) {
          .main-container, .container-search {
            padding-left: 24px;
            padding-right: 24px;
          }
        }

        :global(.ant-menu-scroll) {
          overflow: scroll;
          height: 100vh;
          padding-bottom: 200px;
        }

        :global(.aside-container-drawer.ant-menu-scroll) {
          padding-bottom: 100px;
        }

        :global(.ant-menu-scroll::-webkit-scrollbar) {
          width: 0;  /* Remove scrollbar space */
          background: transparent;  /* Optional: just make scrollbar invisible */
        }

        :global(.logo) {
          padding-top: 20px;
          padding-bottom: 10px;
          margin-bottom: 10px;
          font-size: 1.1rem;
          border-right: 1px solid #f0f0f0;
          box-shadow: 0 2px 8px #dedede;
          background: #fff;
        }

        :global(.logo-drawer) {
          padding-top: 10px;
          font-size: 1rem;
        }
        
        :global(.h-65) {
          height: 65px!important;
        }
      `}</style>
    </>
  )
}

export default LayoutDocs
