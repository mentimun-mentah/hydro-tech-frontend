import { motion } from 'framer-motion'
import { Card, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import Link from 'next/link'
import Image from 'next/image'

const CardDocs = () => {
  return(
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: ".2" }}
      >
        <Card 
          className="w-100 card-blog rounded-card-actions"
          bordered={false}
          cover={
            <Image
              src="/static/images/arduino-boards.jpeg" 
              width={350} 
              height={250} 
              alt="docs" 
            />
          }
          actions={[
            <Link href="/dashboard/manage-docs/asd">
              <a>
                <EditOutlined key="edit" onClick={() => {}} />
              </a>
            </Link>,
            <Popconfirm
              okText="Delete"
              onConfirm={() => {}}
              title={`Delete documentation?`}
            >
              <DeleteOutlined key="delete" />
            </Popconfirm>
          ]}
        >
          <h1 className="h3 bold truncate line-height-3">Set-up your IoT devkit</h1>
          <p className="truncate-2 m-b-0">
            For sending your first Hello World on NB-IoT you can use an embedded developer kit (devkit). Devkits are available for all NB-IoT modules from different manufactures such as Quectel or ublox.
          </p>
        </Card>
      </motion.div>

      <style jsx>{`
        :global(.ant-card.card-blog .ant-card-cover img) {
          object-fit: cover;
          border-radius: .5rem;
        }

        :global(.card-blog) {
          border-radius: .5rem;
        }

        :global(.blog-image) {
          padding-top: 74px;
        }
      `}</style>
    </>
  )
}

export default CardDocs
