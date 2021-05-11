import { motion } from 'framer-motion'
import { Card, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import Image from 'next/image'

const PlantCard = ({ plant, onGetEditData, onDeleteHandler }) => {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: ".2" }}
      >
        <Card 
          bordered={false}
          className="radius1rem shadow1 h-100 hover-pointer rounded-card-actions"
          actions={[
            <EditOutlined key="edit" onClick={onGetEditData} />,
            <Popconfirm
              okText="Delete"
              onConfirm={onDeleteHandler}
              title={`Delete ${plant.plants_name}?`}
            >
              <DeleteOutlined key="delete" />
            </Popconfirm>
          ]}
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
          <div className="text-center items-center text-grey m-t-5">
            <h3 className="h3 bold mb1 line-height-1 truncate">
              {plant.plants_name}
            </h3>
            <p className="mb0">{plant.plants_growth_value} <span className="text-capitalize">{plant.plants_growth_type}</span></p>
            <p className="mb0">PH <b className="text-orange">{plant.plants_ph_max}</b></p>
            <p className="mb0">PPM <b className="text-orange">{plant.plants_tds_min}</b></p>
            <p className="mb0">Difficutly level <b className="text-orange text-capitalize">{plant.plants_difficulty_level}</b></p>
          </div>
        </Card>
      </motion.div>
    </>
  )
}

export default PlantCard
