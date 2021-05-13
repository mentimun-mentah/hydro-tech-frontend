import { Card, Button } from 'antd'
import { motion } from 'framer-motion'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import Link from 'next/link'
import Image from 'next/image'

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
          className="w-100 card-blog" 
          bordered={false}
          cover={<Image alt="blog" src="/static/images/arduino-boards.jpeg" width={350} height={250} />}
        >
          <h1 className="h3 bold truncate line-height-3">
            Set-up your IoT devkit
          </h1>
          <p className="truncate-2">
            For sending your first Hello World on NB-IoT you can use an embedded developer kit (devkit). Devkits are available for all NB-IoT modules from different manufactures such as Quectel or ublox.
          </p>
          <Link href="/docs/asd">
            <a>
              <Button type="primary" ghost><b>Read more</b></Button>
            </a>
          </Link>
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
