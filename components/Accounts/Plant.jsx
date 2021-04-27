import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Card, Row, Col, Drawer, Grid, Form, Input } from 'antd'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import Pagination from 'components/Pagination'
import pageStyle from 'components/Dashboard/pageStyle.js'
import PlantCardLoading from 'components/Card/PlantLoading'

const PlantCardLoadingMemo = React.memo(PlantCardLoading)

const PlantCard = dynamic(() => import('components/Card/Plant'), { ssr: false, loading: () => <PlantCardLoadingMemo />  })

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

const PlantContainer = () => {
  return(
    <>
      <AnimatePresence exitBeforeEnter>
        <Row gutter={[20, 20]}>
          {plantList.map((plant, i) => (
            <Col lg={8} md={8} sm={12} xs={24} key={i}>
              <Card 
                bordered={false}
                className="radius1rem shadow1 h-100 hover-pointer rounded-card-actions"
              >
                <div className="text-center">
                  <Image src={plant.image} width={500} height={500} alt="plant" />
                </div>
                <div className="text-center items-center text-grey fs-12">
                  <h3 className="h3 bold mb1 line-height-1">
                    {plant.name}
                  </h3>
                  <p className="mb0">16 Weeks</p>
                  <p className="mb0">PH <b className="text-orange">7</b></p>
                  <p className="mb0">PPM <b className="text-orange">1500</b></p>
                  <p className="mb0">Difficutly level <b className="text-orange">Simple</b></p>
                </div>
              </Card>
            </Col>
          ))}

          <Col xl={24} lg={24} md={24} sm={24}>
            <div className="text-center m-t-20 m-b-20">
              <Pagination current={3} total={50} />
            </div>
          </Col>
        </Row>
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

export default PlantContainer
