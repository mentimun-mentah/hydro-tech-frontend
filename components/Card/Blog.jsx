import { Card, Button } from 'antd'
import { motion } from 'framer-motion'

import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'

const CardBlog = ({ blog }) => {
  let plainText = blog.blogs_description.replace(/<[^>]+>/g, ' ');
  let finalText = plainText.replace(/&nbsp;/g, " ");

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
          cover={
            <Image alt="blog" src={`${process.env.NEXT_PUBLIC_API_URL}/static/blogs/${blog.blogs_image}`} width={350} height={250} />
          }
        >
          <small className="text-grey">{moment(blog.blogs_created_at).format('LL')}</small>
          <h1 className="h3 bold truncate line-height-3">{blog.blogs_title}</h1>
          <p className="truncate-2">{finalText}</p>
          <Link href="/blog/[slug]" as={`/blog/${blog.blogs_slug}`}>
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
