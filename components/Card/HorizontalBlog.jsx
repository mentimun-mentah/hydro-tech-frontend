import { Card, Button } from 'antd'

import Link from 'next/link'
import Image from 'next/image'

const HorizontalBlog = ({ blog }) => {
  let plainText = blog.blogs_description.replace(/<[^>]+>/g, ' ');
  let finalText = plainText.replace(/&nbsp;/g, " ");

  return (
    <>
      <Card
        bordered={false}
        bodyStyle={{ padding: 0 }}
        className="w-100 card-blog"
        cover={
          <Image alt="blog" src={`${process.env.NEXT_PUBLIC_API_URL}/static/blogs/${blog.blogs_image}`} width={350} height={450} />
        }
      >
      </Card>
      <div className="overlay">
        <div className="centered text-center">
          <h2 className="h2 bold truncate-2 text-white">{blog.blogs_title}</h2>
          <p className="truncate-4">{finalText}</p>
          <Button className="btn-white" ghost>
            <Link href="/blog/[slug]" as={`/blog/${blog.blogs_slug}`}>
              <a className="text-reset">
                Read more
              </a>
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default HorizontalBlog
