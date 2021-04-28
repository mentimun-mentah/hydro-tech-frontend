import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout, Row, Col, Drawer, Grid, Form, Input, Button } from 'antd'

import moment from 'moment'
import dynamic from 'next/dynamic'
import Pagination from 'components/Pagination'
import pageStyle from 'components/Dashboard/pageStyle.js'
import PlantCardLoading from 'components/Card/PlantLoading'

const PlantCardLoadingMemo = React.memo(PlantCardLoading)

const PlantCard = dynamic(() => import('components/Card/Plant'), { ssr: false, loading: () => <PlantCardLoadingMemo />  })

const useBreakpoint = Grid.useBreakpoint
const Sprout = '/static/images/sprout.svg'
const Bayam = '/static/images/plant/bayam.png'
const Kailan = '/static/images/plant/kailan-2.png'
const Pakcoy = '/static/images/plant/pakcoy-2.png'
const Kangkung = '/static/images/plant/kangkung.png'
const Sawi = '/static/images/plant/sawi.png'
const Selada = '/static/images/plant/selada.png'

const plantList = [
  { name: "Bayam", image: Bayam },
  { name: "Kailan", image: Kailan },
  { name: "Pakcoy", image: Pakcoy },
  { name: "Kangkung", image: Kangkung },
  { name: "Sawi", image: Sawi },
  { name: "Selada", image: Selada },
]

const Plants = () => {
  const screens = useBreakpoint()

  const [isMobile, setIsMobile] = useState(false)
  const [visibleDrawer, setVisibleDrawer] = useState(false)

  const onShowDrawer = () => setVisibleDrawer(true)
  const onCloseDrawer = () => setVisibleDrawer(false)

  useEffect(() => {
    let mounted = true
    if(mounted && screens.xs) setIsMobile(true)
    else setIsMobile(false)

    return () => mounted = false
  }, [screens])

  return (
    <>
      <div className="header-dashboard">
        <h1 className="h1 bold mb0">Plants List</h1>
        <span className="header-date">{moment().format("dddd, DD MMMM YYYY")}</span>
      </div>

      <Form layout="vertical">
        <Row gutter={[20, 20]}>
          <Col lg={10} md={10} sm={12} xs={24}>
            <Form.Item className="">
              <Input
                size="large"
                placeholder="Search plant"
                prefix={<i className="far fa-search text-grey" />}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Layout>
        <Layout.Content>
          <AnimatePresence exitBeforeEnter>
            <Row gutter={[20, 20]}>
              {plantList.map((plant, i) => (
                <Col lg={8} md={8} sm={12} xs={24} key={i}>
                  <PlantCard plant={plant} onShow={onShowDrawer} />
                </Col>
              ))}

              <Col xl={24} lg={24} md={24} sm={24}>
                <div className="text-center m-t-20 m-b-20">
                  <Pagination current={3} total={50} />
                </div>
              </Col>
            </Row>
          </AnimatePresence>
        </Layout.Content>
      </Layout>

      <Drawer
        width={isMobile? "80%" : "400" }
        onClose={onCloseDrawer}
        visible={visibleDrawer}
        closeIcon={<i className="far fa-times"></i>}
        bodyStyle={{
          backgroundImage: `url(${Sprout})`,
          backgroundPosition: 'center bottom -100px',
          backgroundRepeat: 'no-repeat',
        }}
        footer={
          <div style={{ textAlign: 'center' }}>
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
            >
              <Button block onClick={onCloseDrawer} type="primary" size="large">
                Plant Now!
              </Button>
            </motion.div>
          </div>
        }
        footerStyle={{ position: 'absolute', bottom: '0', width: '100%', borderTopWidth: 0 }}
      >
        <section className="mb3">
          <h1 className="bold h2">Bayam</h1>
          <p className="text-grey-1">Bayam (Amaranthus) adalah tumbuhan yang biasa ditanam untuk dikonsumsi daunnya sebagai sayuran hijau. Tumbuhan ini berasal dari Amerika tropik namun sekarang tersebar ke seluruh dunia.</p>
        </section>
        <section>
          <h3 className="bold">Information to growth Bayam</h3>
          <Row gutter={[20, 0]} className="text-grey-1">
            <Col span={12}>
              <p className="bold mb0 fs-22 line-height-1 text-shadow-detail">6.0</p>
              <p className="mb-0 text-shadow-detail">pH</p>
            </Col>
            <Col span={12}>
              <p className="bold mb0 fs-22 line-height-1 text-shadow-detail">1260</p>
              <p className="mb-0 text-shadow-detail">PPM</p>
            </Col>
            <Col span={12}>
              <p className="bold mb0 fs-22 line-height-1 text-shadow-detail">6 Weeks</p>
              <p className="mb-0 text-shadow-detail">Time</p>
            </Col>
            <Col span={12}>
              <p className="bold mb0 fs-22 line-height-1 text-shadow-detail">Simple</p>
              <p className="mb-0 text-shadow-detail">Difficulty</p>
            </Col>
          </Row>
        </section>
      </Drawer>

      <AnimatePresence>
        {visibleDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ".2" }}
            className="overlay-blur"
          />
        )}
      </AnimatePresence>

      <style jsx>{pageStyle}</style>
      <style jsx>{`
        .text-shadow-detail{
          text-shadow: 1px 1px 2px #fff;
        }
      `}</style>
    </>
  )
}

export default Plants
