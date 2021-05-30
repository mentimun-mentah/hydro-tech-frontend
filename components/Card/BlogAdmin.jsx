import { motion } from 'framer-motion'
import { Card, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'

const CardBlog = ({ blog, onDelete }) => {
  let plainText = blog.blogs_description.replace(/<[^>]+>/g, ' ');
  let finalText = plainText.replace(/&nbsp;/g, " ");

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
            <Image alt="blog" src={`${process.env.NEXT_PUBLIC_API_URL}/static/blogs/${blog.blogs_image}`} width={350} height={250} />
          }
          actions={[
            <Link href="/dashboard/manage-blog/[slug]" as={`/dashboard/manage-blog/${blog.blogs_slug}`}>
              <a>
                <EditOutlined key="edit" />
              </a>
            </Link>,
            <Popconfirm
              okText="Delete"
              onConfirm={onDelete}
              title={`Delete article ?`}
            >
              <DeleteOutlined key="delete" />
            </Popconfirm>
          ]}
        >
          <small className="text-grey">{moment(blog.blogs_created_at).format('LL')}</small>
          <h1 className="h3 bold truncate line-height-3">{blog.blogs_title}</h1>
          <p className="truncate-2 m-b-0">{finalText}</p>
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
