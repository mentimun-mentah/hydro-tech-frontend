import { withAuth } from "lib/withAuth";
import { formErrorMessage } from 'lib/axios'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout, Row, Col, Drawer, Grid, Form, Input, Button, Modal, Space, Select, Empty } from 'antd'

import _ from 'lodash'
import React from 'react'
import moment from 'moment'
import axios from 'lib/axios'
import Image from 'next/image'
import Reward from 'react-rewards'
import dynamic from 'next/dynamic'
import * as actions from 'store/actions'
import Pagination from 'components/Pagination'
import pageStyle from 'components/Dashboard/pageStyle.js'
import PlantCardLoading from 'components/Card/PlantLoading'

const PlantCardLoadingMemo = React.memo(PlantCardLoading)

const PlantCard = dynamic(() => import('components/Card/Plant'), { ssr: false, loading: () => <PlantCardLoadingMemo />  })

const useBreakpoint = Grid.useBreakpoint
const Badge = '/static/images/badge.svg'
const Sprout = '/static/images/sprout.svg'

const per_page = 12

const Plants = () => {
  const reward = useRef()
  const dispatch = useDispatch()
  const screens = useBreakpoint()

  const plants = useSelector(state => state.plant.plant)

  const [q, setQ] = useState("")
  const [page, setPage] = useState(plants.page)
  const [difficulty, setDifficulty] = useState("")
  const [loading, setLoading] = useState(false)
  const [plantData, setPlantData] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [progressPlant, setProgressPlant] = useState({id: "", start: false})
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [showModalPlanted, setShowModalPlanted] = useState(false)

  const onShowDrawer = () => {
    setVisibleDrawer(true)
  }
  const onCloseDrawer = () => {
    // setPlantData({})
    setVisibleDrawer(false)
    setShowModalPlanted(true)
  }

  const onOkModalPlantedHandler = () => {
    setProgressPlant({id: plantData.plants_id, start: true})
    setShowModalPlanted(false)
  }
  const onCancelModalPlantedHandler = () => {
    setProgressPlant({id: plantData.plants_id, start: false})
    setShowModalPlanted(false)
    setPlantData({})
  }
  const onPlantedHandler = () => {
    const data = {...progressPlant, start: true}
    setProgressPlant(data)
  }
  const onCancelPlantedHandler = () => {
    setPlantData({})
    setProgressPlant({id: "", start: false})
  }
  const onCongratsHandler = () => {
    setPlantData({})
    setProgressPlant({id: "", start: false})
    setShowModal(true)
    setTimeout(() => {
      reward.current.rewardMe();
    }, 1000)
  }

  useEffect(() => {
    let mounted = true
    if(mounted && screens.xs) setIsMobile(true)
    else setIsMobile(false)

    return () => mounted = false
  }, [screens])

  const getPlantData = (id) => {
    setLoading(true)
    axios.get(`/plants/get-plant/${id}`)
      .then(res => {
        setLoading(false)
        setPlantData(res.data)
        onShowDrawer()
      })
      .catch(() => {
        setLoading(false)
        formErrorMessage("error", "Something was wrong when fetching data")
      })
  }

  useEffect(() => {
    let queryString = {}
    queryString["page"] = page
    queryString["per_page"] = per_page

    if(q) queryString["q"] = q
    else delete queryString["q"]

    if(difficulty !== "") queryString["difficulty"] = difficulty
    else delete queryString["difficulty"]

    dispatch(actions.getPlant({...queryString}))
  }, [page])

  useEffect(() => {
    setPage(1)
    let queryString = {}
    queryString["page"] = 1
    queryString["per_page"] = per_page

    if(q) queryString["q"] = q
    else delete queryString["q"]

    if(difficulty !== "") queryString["difficulty"] = difficulty
    else delete queryString["difficulty"]

    dispatch(actions.getPlant({...queryString}))
  }, [q, difficulty])

  useEffect(() => {
    if(plants && plants.data && plants.data.length < 1 && plants.page > 1 && plants.total > 1){
      setPage(plants.page - 1)
    }
  }, [plants])

  return (
    <>
      <div className="header-dashboard">
        <h1 className="h1 bold mb0">Plants List</h1>
        <span className="header-date">{moment().format("dddd, DD MMMM YYYY")}</span>
      </div>

      <Form layout="vertical">
        <Row gutter={[20, 20]}>
          <Col lg={12} md={12} sm={12} xs={24}>
            <Form.Item className="">
              <Input
                size="large"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search plant"
                prefix={<i className="far fa-search text-grey" />}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <Form.Item className="">
              <Space className="space-w-100 w-100">
                <span>Difficulty: </span>
                <Select 
                  size="large"
                  className="w-100"
                  placeholder="Difficulty"
                  value={difficulty}
                  onChange={val => setDifficulty(val)}
                >
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="easy">Easy</Select.Option>
                  <Select.Option value="medium">Medium</Select.Option>
                  <Select.Option value="hard">Hard</Select.Option>
                </Select>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Reward
        type="confetti"
        ref={ref => { reward.current = ref; }}
        config={{
          fakingRequest: false,
          angle: 360,
          decay: 0.80,
          spread: 360,
          startVelocity: 100,
          elementCount: 256,
          elementSize: 8,
          lifetime: 260,
          zIndex: 3100,
          springAnimation: true
        }}
      >
      </Reward>

      <Layout>
        <Layout.Content>

          <AnimatePresence>
            {plants && plants.data && plants.data.length > 0 ? (
              <Row gutter={[20, 20]}>
                {plants && plants.data && plants.data.length > 0 && plants.data.map(plant => (
                  <Col xl={6} lg={8} md={8} sm={12} xs={12} key={plant.plants_id}>
                    <PlantCard 
                      plant={plant} 
                      onPlantedHandler={onPlantedHandler}
                      onCancelPlantedHandler={onCancelPlantedHandler}
                      ongoing={{ongoing: progressPlant.id == plant.plants_id, start: progressPlant.start}}
                      onCongrats={(progressPlant.id == plant.plants_id && progressPlant.start) ? onCongratsHandler : () => {}}
                      getPlantData={() => getPlantData(plant.plants_id)}
                    />
                  </Col>
                ))}
                <Col xl={24} lg={24} md={24} sm={24}>
                  <div className="text-center m-t-20 m-b-20">
                    <Pagination 
                      total={plants.total} 
                      goTo={val => setPage(val)} 
                      current={page} 
                      hideOnSinglePage 
                      pageSize={per_page}
                    />
                  </div>
                </Col>
              </Row>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: ".2" }}
              >
                <Empty className="m-t-150 m-b-150" description={<span className="text-grey">No Result</span>} /> 
              </motion.div>
            )}
          </AnimatePresence>

        </Layout.Content>
      </Layout>

      <Drawer
        width={isMobile? "80%" : "400" }
        onClose={() => setVisibleDrawer(false)}
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
        {!_.isEmpty(plantData) && (
          <>
            <section className="mb3">
              <h1 className="bold h2">{plantData.plants_name}</h1>
              <p className="text-grey-1">{plantData.plants_desc}</p>
            </section>
            <section>
              <h3 className="bold">Information to growth Bayam</h3>
              <Row gutter={[20, 0]} className="text-grey-1">
                <Col span={12}>
                  <p className="bold mb0 fs-22 line-height-1 text-shadow-detail">{plantData.plants_ph_max}</p>
                  <p className="mb-0 text-shadow-detail">pH</p>
                </Col>
                <Col span={12}>
                  <p className="bold mb0 fs-22 line-height-1 text-shadow-detail">{plantData.plants_tds_min}</p>
                  <p className="mb-0 text-shadow-detail">PPM</p>
                </Col>
                <Col span={12}>
                  <p className="bold mb0 fs-22 line-height-1 text-shadow-detail">
                    {plantData.plants_growth_value} {plantData.plants_growth_type}
                  </p>
                  <p className="mb-0 text-shadow-detail">Time</p>
                </Col>
                <Col span={12}>
                  <p className="bold mb0 fs-22 line-height-1 text-shadow-detail text-capitalize">{plantData.plants_difficulty_level}</p>
                  <p className="mb-0 text-shadow-detail">Difficulty</p>
                </Col>
              </Row>
            </section>
          </>
        )}
      </Drawer>

      <Modal
        centered
        visible={showModal}
        zIndex={3000}
        width={416}
        closable={false}
        footer={null}
        className="modal-modif noselect text-center"
        closeIcon={<i className="fas fa-times" />}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        <div className="text-dark text-center">
          <Image src={Badge} width={150} height={150} alt="badge" />
          <h3 className="mb-3 h3 bold">Congratulation</h3>
          <p>You already finished growing lecctue</p>
          <Button className="btn-white" onClick={() => setShowModal(false)}>Okay</Button>
        </div>
      </Modal>

      <Modal
        centered
        visible={showModalPlanted && !_.isEmpty(plantData)}
        zIndex={3000}
        width={416}
        closable={false}
        footer={null}
        className="modal-modif noselect text-center"
        closeIcon={<i className="fas fa-times" />}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        <div className="text-dark text-center">
          <h3 className="mb-3 h3 bold">Are you already planted {plantData.plants_name}?</h3>
          <Space>
            <Button type="primary" onClick={onOkModalPlantedHandler}>Yes I did</Button>
            <Button className="btn-white" onClick={onCancelModalPlantedHandler}>No yet</Button>
          </Space>
        </div>
      </Modal>

      <AnimatePresence>
        {(visibleDrawer || showModal || showModalPlanted) && (
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
        
        :global(.space-w-100 .ant-space-item:last-of-type){
          width: 100%;
        }
      `}</style>
    </>
  )
}

Plants.getInitialProps = async ctx => {
  let res = await axios.get(`/plants/all-plants?page=1&per_page=${per_page}`)
  ctx.store.dispatch(actions.getPlantSuccess(res.data))
}

export default withAuth(Plants)
