import { useState } from 'react'
import { motion } from 'framer-motion'
import { SearchOutlined } from '@ant-design/icons'
import { Row, Col, Button, Input, Card, Divider } from 'antd'

import Pagination from 'components/Pagination'

import Link from 'next/link'
import Image from 'next/image'

const Hydro = '/static/images/blog/2.jpeg'

const Documentation = () => {
  return(
    <>
      <div className="blog-image">
        <div className="container-fluid p-b-50 p-t-50 blog-image-inner">
          <Row gutter={[10, 10]} justify="center">
            <Col xl={22} lg={22} md={24} sm={24} xs={24}>
              <Row gutter={[20, 20]} justify="center">
                <Col span={24}>
                  <div className="text-center bg-whitesmoke--3 w-fit-content ml-auto mr-auto p-l-15 p-r-15 p-b-1 border-radius--5rem">
                    <h2 className="h1 bold mb1 text-purple">Hydro X Tech</h2>
                    <h3 className="h2 bold mb1 text-grey-1">"Documentation"</h3>
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
                      cover={<Image alt="blog" src="/static/images/arduino-boards.jpeg" width={350} height={250} />}
                    >
                      <small className="text-grey">Maret 01, 2021</small>
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
                </Col>
              ))}
            </Row>
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
        }

        :global(.blog-image .blog-image-inner) {
          background-image: url('/static/images/bg-docs.jpg');
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

export default Documentation
