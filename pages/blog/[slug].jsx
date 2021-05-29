import { Row, Col, Divider, Space } from 'antd'
import { EmailIcon, FacebookIcon, TwitterIcon, TelegramIcon, LineIcon } from 'react-share'
import { EmailShareButton, FacebookShareButton, TwitterShareButton, TelegramShareButton, LineShareButton } from 'react-share'

import moment from 'moment'
import axios from 'lib/axios'
import Image from 'next/image'
import Router from 'next/router'

const BlogSlug = ({ blogData }) => {
  const { blogs_title, blogs_slug, blogs_created_at, blogs_image, blogs_description, blogs_visitor } = blogData

  const link = `${process.env.NEXT_PUBLIC_HOSTNAME}/blog/${blogs_slug}`
              
  return (
    <>
      <div className="container-fluid p-b-0 p-t-100">

        <Row gutter={[10, 10]} justify="center">
          <Col xl={22} lg={22} md={24} sm={24} xs={24}>
            <Row gutter={[20, 20]} justify="center">
              <Col xl={14} lg={14} md={20} sm={24} xs={24}>
                <div className="text-center">
                  <h2 className="h2 bold mb0 text-purple m-t-30 m-b-10">{blogs_title}</h2>
                  <p>
                    <small className="text-grey">
                      {moment(blogs_created_at).format('LL')} <span className="m-l-5 m-r-5">•</span> <i className="fal fa-eye"></i> {blogs_visitor} views
                    </small>
                  </p>
                  <Space>
                    <EmailShareButton url={link}>
                      <EmailIcon size={32} round={true} />
                    </EmailShareButton>
                    <FacebookShareButton url={link}>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton url={link}>
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                    <TelegramShareButton url={link}>
                      <TelegramIcon size={32} round={true} />
                    </TelegramShareButton>
                    <LineShareButton url={link}>
                      <LineIcon size={32} round={true} />
                    </LineShareButton>
                  </Space>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[10, 10]} justify="center">
          <Col xl={22} lg={22} md={24} sm={24} xs={24}>
            <Row gutter={[20, 20]} justify="center">
              <Col xl={16} lg={16} md={20} sm={24} xs={24}>

                <div className="m-t-30 m-b-30">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/static/blogs/${blogs_image}`}
                    className="border-radius--5rem img-fit"
                    alt="Detail Blog"
                    layout="responsive"
                    height={1200}
                    width={2000}
                  />
                </div>

                <div dangerouslySetInnerHTML={{__html: blogs_description}} />
              </Col>

            </Row>
          </Col>
        </Row>

      </div>

      <Divider className="p-b-10" />

      <style jsx>{`
        :global(.comment-edit .ant-comment-actions) {
          margin-top: 5px;
        }
        :global(.ant-comment-content-author-name){
          width: 100%;
        }
      `}</style>

    </>
  )
}

BlogSlug.getInitialProps = async ctx => {
  const { slug } = ctx.query
  try{
    const res = await axios.get(`/blogs/${slug}`)
    if(res.status == 404){
      process.browser
        ? Router.replace("/blog", "/blog") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/blog" }); //Redirec from Server Side
      !process.browser && ctx.res.end()
    } else {
      return {
        blogData: res.data
      }
    }
  }
  catch (err) {
    const res = await axios.get(`/blogs/${slug}`)
    if(res.status == 404){
      process.browser
        ? Router.replace("/blog", "/blog") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/blog" }); //Redirec from Server Side
      !process.browser && ctx.res.end()
    } else {
      return {
        blogData: res.data
      }
    }
  }
}

export default BlogSlug
