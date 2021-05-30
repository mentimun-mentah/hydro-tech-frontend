import { Col, Row } from 'antd'

import Link from 'next/link'
import Image from 'next/image'

const SmallHorizontalBlog = ({ blog }) => {
  let plainText = blog.blogs_description.replace(/<[^>]+>/g, ' ');
  let finalText = plainText.replace(/&nbsp;/g, " ");

  return (
    <>
      <Col span={24}>
        <Row gutter={[10,10]}>
          <Col xl={8} lg={8} md={8} sm={8} xs={10}>
            <Link href="/blog/[slug]" as={`/blog/${blog.blogs_slug}`}>
              <a className="text-reset">
                <Image
                  alt="blog"
                  width={350}
                  height={180}
                  objectFit="cover"
                  className="border-radius--5rem"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/static/blogs/${blog.blogs_image}`}
                />
              </a>
            </Link>
          </Col>
          <Col xl={16} lg={16} md={16} sm={16} xs={14}>
            <Link href="/blog/[slug]" as={`/blog/${blog.blogs_slug}`}>
              <a className="text-reset">
                <h4 className="h4 bold truncate m-b-2">{blog.blogs_title}</h4>
                <p className="truncate-2 m-b-0">{finalText}</p>
              </a>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default SmallHorizontalBlog
