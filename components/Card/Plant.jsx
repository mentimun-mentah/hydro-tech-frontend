import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Progress } from 'antd'

import Image from 'next/image'

const PlantCard = ({ plant, onShow, ongoing, onCongrats }) => {
  return (
    <>
      <Card bordered={false} className="radius1rem shadow1 h-100 plant-card">
        <motion.div
          whileHover={{ y: ongoing ? 0 : -4 }}
          whileTap={{ scale: ongoing ? 1 : 0.98, y: 0 }}
          className="hover-pointer h-100 plant-card-body"
          onClick={ongoing ? () => {} : onShow}
        >
          <div className="text-center">
            <Image src={plant.image} width={400} height={400} alt="plant" />
          </div>
          <div className="text-center items-center text-grey plant-card-body-ongoing">
            <h2 className="h2 bold mb1 line-height-1">
              {plant.name}
            </h2>
            {ongoing ? (
              <>
                <Progress 
                  percent={50} 
                  status="active" 
                  className="p-r-5 p-l-5 m-b-10" 
                  strokeColor="#ffc19e" 
                  format={val => <span className="fs-12 text-grey-1">{val}%</span>}
                />
                <Row gutter={[10, 10]} className="w-100 m-t-auto">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <motion.div whileTap={{ scale: 0.96 }}>
                      <Button block type="primary" onClick={ongoing ? onCongrats : () => {}}>
                        Finish
                      </Button>
                    </motion.div>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <motion.div whileTap={{ scale: 0.96 }}>
                      <Button block className="btn-white">
                        Cancel
                      </Button>
                    </motion.div>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <p className="mb0 mt1">16 Weeks</p>
                <p className="mb0">Difficutly level <b className="text-orange">Simple</b></p>
              </>
            )}
          </div>
        </motion.div>
      </Card>

      <style jsx>{`
        :global(.plant-card .ant-card-body) {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        :global(.plant-card-body) {
          display: flex;
          flex-direction: column;
          transform: none;
        }
        :global(.plant-card-body-ongoing) {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}

export default PlantCard
