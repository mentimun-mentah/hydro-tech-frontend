import { useState, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigation, Pagination as PagiSwiper, Scrollbar, A11y } from 'swiper'
import { Row, Col, Divider, Input, Select, Form, Grid, Empty } from 'antd'

import React from 'react'
import axios from 'lib/axios'
import SwiperCore from 'swiper'
import dynamic from 'next/dynamic'
import * as actions from 'store/actions'
import Pagination from 'components/Pagination'
import CardLoading from 'components/Card/CardLoading'
import CardHorizontal from 'components/Card/HorizontalBlog'
import CardSmallHorizontal from 'components/Card/SmallHorizontalBlog'

const CardLoadingMemo = React.memo(CardLoading)
const CardBlog = dynamic(() => import('components/Card/Blog'), { ssr: false, loading: () => <CardLoadingMemo />  })
const CardBlogMemo = React.memo(CardBlog)
const useBreakpoint = Grid.useBreakpoint

SwiperCore.use([Navigation, PagiSwiper, Scrollbar, A11y]);

const per_page = 3

const Blog = () => {
  const { lg }= useBreakpoint()
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog.blog)

  const [q, setQ] = useState("")
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState("newest")
  const [mostViewed1, setMostViewed1] = useState([])
  const [mostViewed2, setMostViewed2] = useState([])

  useEffect(() => {
    let queryString = {}
    queryString["page"] = page
    queryString["per_page"] = per_page
    queryString["order_by"] = orderBy

    if(q) queryString["q"] = q
    else delete queryString["q"]

    dispatch(actions.getBlog({...queryString}))

  }, [page, orderBy, q])

  useEffect(() => {
    if(blogs && blogs.data && blogs.data.length < 1 && blogs.page > 1 && blogs.total > 1) {
      setPage(blogs.page - 1)
    }
  }, [blogs])

  useEffect(async () => {
    const resMostViewed = await axios.get("/blogs/all-blogs", { params: { page: 1, per_page: 10, order_by: 'visitor' }})
    setMostViewed2(resMostViewed.data.data.slice(0, 4))
    setMostViewed1(resMostViewed.data.data.slice(5, 10))
  }, [])

  return (
    <>

      <div className="container-fluid p-t-100">

        <Row gutter={[10, 10]} justify="center">
          <Col xxl={16} xl={22} lg={22} md={24} sm={24} xs={24}>

            <Row gutter={[20, 20]}>
              <Col xl={14} lg={14} md={24} sm={24} xs={24}>
                <Swiper loop autoplay navigation slidesPerView={1}>
                  {mostViewed1 && mostViewed1.length > 0 ? (
                    <>
                      {mostViewed1.map(blog => (
                        <SwiperSlide key={blog.blogs_id}>
                          <CardHorizontal blog={blog} />
                        </SwiperSlide>
                      ))}
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: ".2" }}
                      className="w-100 text-center"
                    >
                      <Empty className="m-t-150 m-b-150" description={<span className="text-grey">No Data</span>} />
                    </motion.div>
                  )}
                </Swiper>
              </Col>

              <Col xl={10} lg={10} md={24} sm={24} xs={24}>
                <h2 className="h2 bold">Most Viewed</h2>
                <Row gutter={[10,10]}>
                  {mostViewed2 && mostViewed2.length > 0 ? (
                    <>
                      {mostViewed2.map(blog => (
                        <CardSmallHorizontal key={blog.blogs_id} blog={blog} />
                      ))}
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: ".2" }}
                      className="w-100 text-center"
                    >
                      <Empty className="m-t-150 m-b-150" description={<span className="text-grey">No Data</span>} />
                    </motion.div>
                  )}
                </Row>
              </Col>

            </Row>


            <div className="m-t-20">
              <Row gutter={[10,10]} className="m-b-10">
                <Col span={24}>
                  <h2 className="h2 bold m-b-0">All Articles</h2>
                </Col>
              </Row>

              <Row gutter={[10,10]} className="m-b-0" justify="space-between">
                <Col xl={10} lg={14} md={14} sm={14} xs={14}>
                  <Input 
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Search article" 
                    prefix={<SearchOutlined />}
                  />
                </Col>
                <Col xl={5} lg={5} md={10} sm={10} xs={10}>
                  <Form name="basic">
                    <Form.Item label={`${lg ? 'Order by: ' : ''}`}>
                      <Select value={orderBy} onChange={val => setOrderBy(val)} className="w-100">
                        <Select.Option value="newest">Newest</Select.Option>
                        <Select.Option value="oldest">Oldest</Select.Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>


              <AnimatePresence>
                <Row gutter={[20, 20]} align={blogs.data && blogs.data.length == 0 && "middle"}>
                  {blogs && blogs.data && blogs.data.length > 0 ? (
                    <>
                      {blogs.data.map(blog => (
                        <Col xl={8} lg={12} md={12} sm={24} xs={24} key={blog.blogs_id}>
                          <CardBlogMemo
                            blog={blog}
                          />
                        </Col>
                      ))}

                      <Col xl={24} lg={24} md={24} sm={24}>
                        <div className="text-center m-t-20 m-b-20">
                          <Pagination
                            total={blogs.total}
                            goTo={val => setPage(val)}
                            current={page}
                            hideOnSinglePage
                            pageSize={per_page}
                          />
                        </div>
                      </Col>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: ".2" }}
                      className="w-100 text-center"
                    >
                      <Empty className="m-t-150 m-b-150" description={<span className="text-grey">No Data</span>} />
                    </motion.div>
                  )}
                </Row>
              </AnimatePresence>
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
