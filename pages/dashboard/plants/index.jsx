import { useState } from 'react'
import { Layout, Card, Row, Col, Image, Drawer } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'

import moment from 'moment'
import pageStyle from 'components/Dashboard/pageStyle.js'

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
  const [visibleDrawer, setVisibleDrawer] = useState(false)

  const onShowDrawer = () => setVisibleDrawer(true)
  const onCloseDrawer = () => setVisibleDrawer(false)

  return (
    <>
      <div className="header-dashboard">
        <h1 className="h1 bold mb0">Plants List</h1>
        <span className="header-date">{moment().format("dddd, DD MMMM YYYY")}</span>
      </div>

      <Layout>
        <Layout.Content>
          <AnimatePresence exitBeforeEnter>
            <Row gutter={[20, 20]}>
              {plantList.map((plant, i) => (
                <Col lg={8} md={8} sm={24} xs={24} key={i}>
                  <Card bordered={false} className="radius1rem shadow1 h-100">
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      className="hover-pointer"
                      onClick={onShowDrawer}
                    >
                      <div className="text-right">
                        <Image src={plant.image} preview={false} alt="plant" />
                      </div>
                      <div className="text-center items-center text-grey">
                        <h2 className="h2 bold mb1 line-height-1">
                          {plant.name}
                        </h2>
                        <p className="mb0 mt1">16 Weeks</p>
                        <p className="mb0">Difficutly level <b className="text-orange">Simple</b></p>
                      </div>
                    </motion.div>
                  </Card>
                </Col>
              ))}
            </Row>
          </AnimatePresence>
        </Layout.Content>
      </Layout>

      <Drawer
        width="400"
        onClose={onCloseDrawer}
        visible={visibleDrawer}
        closeIcon={<i className="far fa-times"></i>}
        bodyStyle={{
          backgroundImage: `url(${Sprout})`,
          backgroundPosition: 'center bottom -100px',
          backgroundRepeat: 'no-repeat',
        }}
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
