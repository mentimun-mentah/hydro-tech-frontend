import { Card } from 'antd'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import Image from 'next/image'

const PlantCard = ({ plant, onShow }) => {
  return (
    <>
      <Card bordered={false} className="radius1rem shadow1 h-100">
        <motion.div
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98, y: 0 }}
          className="hover-pointer"
          onClick={onShow}
        >
          <div className="text-center">
            <Image src={plant.image} width={400} height={400} alt="plant" />
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
    </>
  )
}

export default PlantCard
