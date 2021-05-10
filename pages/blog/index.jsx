import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Card, Row, Col, Button, Input, Divider } from 'antd'

import Link from 'next/link'
import Image from 'next/image'
import Pagination from 'components/Pagination'

const Hydro = '/static/images/blog/2.jpeg'

const Blog = () => {
  const [q, setQ] = useState("")
  const [page, setPage] = useState(2)

  return (
    <>
      <div className="blog-image">
        <div className="container-fluid p-b-50 p-t-50 blog-image-inner">
          <Row gutter={[10, 10]} justify="center">
            <Col xl={22} lg={22} md={24} sm={24} xs={24}>
              <Row gutter={[20, 20]} justify="center">
                <Col span={24}>
                  <div className="text-center bg-whitesmoke--3 w-fit-content ml-auto mr-auto p-l-15 p-r-15 p-b-1 border-radius--5rem">
                    <h2 className="h1 bold mb1 text-purple">Hydro X Tech</h2>
                    <h3 className="h2 bold mb1 text-grey-1">"Blog"</h3>
                    <p className="text-grey-1 fs-16 m-b-5">Everything about hydroponics</p>
                  </div>
                </Col>
                <Col xl={10} lg={12} md={16} sm={24} xs={24}>
                  <Input 
                    placeholder="Search" 
                    prefix={<SearchOutlined className="text-grey" />} 
                    suffix={<Button type="primary">Go</Button>}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>

      <div className="container-fluid p-t-50">

        <Row gutter={[10, 10]} justify="center">
          <Col xl={22} lg={22} md={24} sm={24} xs={24}>
            <Row gutter={[20, 20]}>
              {[...Array(12)].map((_, i) => (
                <Col xl={8} lg={8} md={8} sm={12} xs={24} key={i}>
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
                </Col>
              ))}
            </Row>
          </Col>

          <Col span={24}>
            <div className="text-center m-t-20 m-b-20">
              <Pagination 
                total={30} 
                goTo={val => setPage(val)} 
                current={page} 
                hideOnSinglePage 
                pageSize={10}
              />
            </div>
          </Col>
        </Row>

      </div>

      <Divider className="p-b-10" />

      <style jsx>{`
        :global(.ant-card.card-blog .ant-card-cover img) {
          object-fit: cover;
          border-radius: .5rem;
        }
        :global(.ant-card.card-blog .ant-card-body) {
          padding-top: 0px;
          padding-left: 0px;
          padding-right: 0px;
          padding-bottom: 20px;
        }

        :global(.card-blog) {
          background-color: transparent;
        }

        :global(.blog-image) {
          padding-top: 74px;
          // background: rgb(3,154,145);
          // background: linear-gradient(180deg, rgba(3,154,145,0.31556372549019607) 8%, rgba(255,255,255,1) 84%);
        }

        :global(.blog-image .blog-image-inner) {
          background-image: url('/static/images/blog/blog-wrapper.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }

        :global(.bg-whitesmoke--3) {
          background-color: #fafafa4d!important;
          backdrop-filter: blur(4px);
        }
      `}</style>
    </>
  )
}

export default Blog
