import { Card, Button } from 'antd'
import { motion } from 'framer-motion'

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
        className="h-100"
      >
        <Card 
          className="w-100 card-blog" 
          bordered={false}
          cover={<Image alt="blog" src={Hydro} width={350} height={250} />}
        >
          <small className="text-grey">Maret 01, 2021</small>
          <h1 className="h3 bold truncate line-height-3">What Are Hydroponic Systems and How Do They Work?</h1>
          <p className="truncate-2">
            Known for being versatile, hydroponics is appropriate for use in developing countries as it efficiently produces food in arid and mountainous regions, on city rooftops, or, in other words, pretty much anywhere.
          </p>
          <Link href="/blog/asd">
            <a>
              <Button type="primary" ghost><b>Read more</b></Button>
            </a>
          </Link>
        </Card>
      </motion.div>
    </>
  )
}

export default CardBlog
