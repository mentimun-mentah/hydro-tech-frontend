import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Row, Col, Card, Button, Divider, Input } from 'antd'
import { Navigation, Pagination as PagiSwiper, Scrollbar, A11y } from 'swiper'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SwiperCore from 'swiper'
import dynamic from 'next/dynamic'
import Pagination from 'components/Pagination'
import CardLoading from 'components/Card/CardLoading'

const CardLoadingMemo = React.memo(CardLoading)
const CardBlog = dynamic(() => import('components/Card/Blog'), { ssr: false, loading: () => <CardLoadingMemo />  })
const CardBlogMemo = React.memo(CardBlog)

SwiperCore.use([Navigation, PagiSwiper, Scrollbar, A11y]);

const Blog = () => {
  const [page, setPage] = useState(2)

  return (
    <>

      <div className="container-fluid p-t-100">

        <Row gutter={[10, 10]} justify="center">
          <Col xxl={16} xl={22} lg={22} md={24} sm={24} xs={24}>

            <Row gutter={[20, 20]}>
              <Col xl={14} lg={14} md={24} sm={24} xs={24}>
                <Swiper loop autoplay navigation slidesPerView={1}>
                  <SwiperSlide>
                    <Card
                      bordered={false}
                      bodyStyle={{ padding: 0 }}
                      className="w-100 card-blog" 
                      cover={<Image alt="blog" src="/static/images/arduino-boards.jpeg" width={350} height={450} />}
                    >
                    </Card>
                    <div className="overlay">
                      <div className="centered text-center">
                        <h2 className="h2 bold truncate-2 text-white">What Are Hydroponic Systems and How Do They Work?</h2>
                        <p className="truncate-4">Known for being versatile, hydroponics is appropriate for use in developing countries as it efficiently produces food in arid and mountainous regions, on city rooftops, or, in other words, pretty much anywhere.</p>
                        <Button className="btn-white" ghost>Read more</Button>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </Col>

              <Col xl={10} lg={10} md={24} sm={24} xs={24}>
                <h2 className="h2 bold">Most Viewed</h2>
                <Row gutter={[10,10]}>
                  {[...Array(4)].map((_, i) => (
                    <Col span={24} key={i}>
                      <Row gutter={[10,10]}>
                        <Col xl={8} lg={8} md={8} sm={8} xs={10}>
                          <Link href="/blog/1" as="/blog/1">
                            <a className="text-reset">
                              <Image 
                                alt="blog" 
                                width={350}
                                height={180}
                                objectFit="cover"
                                className="border-radius--5rem" 
                                src="/static/images/arduino-boards.jpeg"
                              />
                            </a>
                          </Link>
                        </Col>
                        <Col xl={16} lg={16} md={16} sm={16} xs={14}>
                          <Link href="/blog/1" as="/blog/1">
                            <a className="text-reset">
                              <h4 className="h4 bold truncate m-b-2">
                                What Are Hydroponic Systems and How Do They Work?
                              </h4>
                              <p className="truncate-2 m-b-0">Known for being versatile, hydroponics is appropriate for use in developing countries as it efficiently produces food in arid and mountainous regions, on city rooftops, or, in other words, pretty much anywhere.</p>
                            </a>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Col>

            </Row>


            <div className="m-t-20">
              <Row gutter={[10,10]} className="m-b-10">
                <Col xl={14} lg={14} md={14} sm={24} xs={24}>
                  <h2 className="h2 bold m-b-0">All Articles</h2>
                </Col>
                <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                  <Input placeholder="Search article" prefix={<SearchOutlined />} />
                </Col>
              </Row>

              <Row gutter={[20, 20]}>
                {[...Array(12)].map((_, i) => (
                  <Col xl={6} lg={6} md={8} sm={12} xs={24} key={i}>
                    <CardBlogMemo />
                  </Col>
                ))}
              </Row>
            </div>
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
      :global(.ant-card.card-blog .ant-card-cover, .ant-card.card-blog .ant-card-cover > div) {
          border-radius: .5rem;
        }
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
          background-image: url('/static/images/blog/blog-wrapper.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }

        :global(.bg-whitesmoke--3) {
          background-color: #fafafa4d!important;
          backdrop-filter: blur(4px);
        }

        :global(.centered) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        :global(.overlay) {
          position: absolute;
          height: calc(100% - 7px);
          width: 100%;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.4);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: .5rem;
        }

        :global(.swiper-button-next:after, .swiper-button-prev:after) {
          color: white;
          font-size: 18px;
          font-weight: bold;
        }

      `}</style>
    </>
  )
}

export default Blog
