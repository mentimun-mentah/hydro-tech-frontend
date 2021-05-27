import { withAuth } from 'lib/withAuth'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout, Row, Col, Form, Input, Empty } from 'antd'
import { jsonHeaderHandler, resNotification, signature_exp } from 'lib/axios'

import _ from 'lodash'
import React from 'react'
import axios from 'lib/axios'
import dynamic from 'next/dynamic'
import * as actions from 'store/actions'
import Pagination from 'components/Pagination'
import CardLoading from 'components/Card/CardLoading'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'

const CardLoadingMemo = React.memo(CardLoading)
const CardBlog = dynamic(() => import('components/Card/BlogAdmin'), { ssr: false, loading: () => <CardLoadingMemo />  })
const CardBlogMemo = React.memo(CardBlog)

const per_page = 12

const ManageBlog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog.blog)

  const [q, setQ] = useState("")
  const [page, setPage] = useState(blogs.page)

  useEffect(() => {
    let queryString = {}
    queryString["page"] = page
    queryString["per_page"] = per_page

    if(q) queryString["q"] = q
    else delete queryString["q"]

    queryString["order_by"] = "newest"

    dispatch(actions.getBlog({...queryString}))
  }, [page])

  useEffect(() => {
    setPage(1)
    let queryString = {}
    queryString["page"] = 1
    queryString["per_page"] = per_page

    if(q) queryString["q"] = q
    else delete queryString["q"]

    queryString["order_by"] = "newest"

    dispatch(actions.getBlog({...queryString}))
  }, [q])

  useEffect(() => {
    if(blogs && blogs.data && blogs.data.length < 1 && blogs.page > 1 && blogs.total > 1){
      setPage(blogs.page - 1)
    }
  }, [blogs])

  const onDeleteHandler = id => {
    axios.delete(`/blogs/delete/${id}`, jsonHeaderHandler())
      .then(res => {
        dispatch(actions.getBlog({ page: page, per_page: per_page, order_by: "newest"}))
        resNotification("success", "Success", res.data.detail)
      })
      .catch(err => {
        console.log(err)
        const errDetail = err.response.data.detail
        if(errDetail == signature_exp){
          dispatch(actions.getBlog())
          resNotification("success", "Success", "Successfully delete the blog.")
        } else if(typeof(errDetail) === "string") {
          resNotification("error", "Error", errDetail)
        } else {
          resNotification("error", "Error", errDetail[0].msg)
        }
      })
  }

  return(
    <>
      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <div className="header-dashboard m-b-5">
                <h2 className="h2 bold mb0">Manage Blog</h2>
              </div>

              <Form layout="vertical">
                <Row gutter={[20, 20]}>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item>
                      <Input
                        size="large"
                        placeholder="Search article"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        prefix={<i className="far fa-search text-grey" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              <AnimatePresence>
                <Row gutter={[20, 20]}>
                  <Col span={24}>

                    <AnimatePresence>
                      <Row gutter={[20, 20]} align={blogs.data && blogs.data.length == 0 && "middle"}>
                        {blogs && blogs.data && blogs.data.length > 0 ? (
                          <>
                            {blogs.data.map(blog => (
                              <Col xl={8} lg={12} md={12} sm={24} xs={24} key={blog.blogs_id}>
                                <CardBlogMemo 
                                  blog={blog} 
                                  onDelete={() => onDeleteHandler(blog.blogs_id)}
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

                  </Col>

                </Row>
              </AnimatePresence>

            </Col>
          </Row>

        </Layout.Content>
      </Layout>

      <style jsx>{pageStyle}</style>
      <style jsx>{addPlantStyle}</style>
    </>
  )
}

export default withAuth(ManageBlog)
