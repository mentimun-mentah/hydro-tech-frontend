import { motion } from 'framer-motion'
import { Card, Button, Row, Col, Progress } from 'antd'

import Image from 'next/image'

const PlantCard = ({ plant, ongoing, onCongrats, getPlantData, onPlantedHandler, onCancelPlantedHandler }) => {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: ".2" }}
        className="h-100"
      >
        <Card bordered={false} className="radius1rem shadow1 h-100 plant-card">
          <motion.div
            whileHover={{ y: ongoing ? 0 : -4 }}
            whileTap={{ scale: ongoing ? 1 : 0.98, y: 0 }}
            className="hover-pointer h-100 plant-card-body"
            onClick={ongoing.ongoing ? () => {} : getPlantData}
          >
            <div className="text-center">
              <Image 
                alt="plant"
                width={500}
                height={500}
                className="border-radius--5rem"
                src={`${process.env.NEXT_PUBLIC_API_URL}/static/plants/${plant.plants_image}`}
              />
            </div>
            <div className="text-center items-center text-grey plant-card-body-ongoing m-t-5">
              <h2 className="h2 bold mb1 line-height-1 truncate">
                {plant.plants_name}
              </h2>
              {ongoing.ongoing && ongoing.start && (
                <>
                  <Progress 
                    percent={0} 
                    status="active" 
                    className="p-r-5 p-l-5 m-b-10" 
                    strokeColor="#ffc19e" 
                    format={val => <span className="fs-12 text-grey-1">{val}%</span>}
                  />
                  <Row gutter={[10, 10]} className="w-100 m-t-auto">
                    {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}> */}
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <motion.div whileTap={{ scale: 0.96 }}>
                        <Button block type="primary" onClick={(ongoing.ongoing && ongoing.start) ? onCongrats : () => {}}>
                          Finish
                        </Button>
                      </motion.div>
                    </Col>
                    {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}> */}
                    {/*   <motion.div whileTap={{ scale: 0.96 }}> */}
                    {/*     <Button block className="btn-white" onClick={onCancelPlantedHandler}> */}
                    {/*       Cancel */}
                    {/*     </Button> */}
                    {/*   </motion.div> */}
                    {/* </Col> */}
                  </Row>
                </>
              )} 
              {ongoing.ongoing && !ongoing.start && (
                <>
                  <Row gutter={[10, 10]} className="w-100 m-t-auto">
                    {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}> */}
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <motion.div whileTap={{ scale: 0.96 }}>
                        <Button block type="primary" onClick={(ongoing.ongoing && !ongoing.start) ? onPlantedHandler : () => {}}>
                          Planted
                        </Button>
                      </motion.div>
                    </Col>
                    {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}> */}
                    {/*   <motion.div whileTap={{ scale: 0.96 }}> */}
                    {/*     <Button block className="btn-white" onClick={onCancelPlantedHandler}> */}
                    {/*       Cancel */}
                    {/*     </Button> */}
                    {/*   </motion.div> */}
                    {/* </Col> */}
                  </Row>
                </>
              )}
              {!ongoing.ongoing && (
                <>
                  <p className="mb0 mt1">{plant.plants_growth_value} <span className="text-capitalize">{plant.plants_growth_type}</span></p>
                  <p className="mb0">Difficutly level <b className="text-orange text-capitalize">{plant.plants_difficulty_level}</b></p>
                </>
              )}
            </div>
          </motion.div>
        </Card>
      </motion.div>

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
