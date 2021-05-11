import { motion } from 'framer-motion'
import { Card, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import Link from 'next/link'
import Image from 'next/image'

const Hydro = '/static/images/blog/2.jpeg'

const CardBlog = () => {
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
          cover={<Image alt="blog" src={Hydro} width={350} height={250} />}
          actions={[
            <Link href="/dashboard/manage-blog/asd">
              <a>
                <EditOutlined key="edit" onClick={() => {}} />
              </a>
            </Link>,
            <Popconfirm
              okText="Delete"
              onConfirm={() => {}}
              title={`Delete article ?`}
            >
              <DeleteOutlined key="delete" />
            </Popconfirm>
          ]}
        >
          <small className="text-grey">Maret 01, 2021</small>
          <h1 className="h3 bold truncate line-height-3">What Are Hydroponic Systems and How Do They Work?</h1>
          <p className="truncate-2 m-b-0">
            Known for being versatile, hydroponics is appropriate for use in developing countries as it efficiently produces food in arid and mountainous regions, on city rooftops, or, in other words, pretty much anywhere.
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

export default CardBlog
