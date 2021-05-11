import { withAuth } from 'lib/withAuth'
import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout, Card, Row, Col, Form, Button, Input, Select, Upload, Modal, Space, InputNumber, Empty } from 'antd'

import { deepCopy } from 'lib/utility'
import { formImage } from 'formdata/image'
import { imageValidation, imagePreview, uploadButton } from 'lib/imageUploader'
import { formHeaderHandler, formErrorMessage, signature_exp, resNotification, jsonHeaderHandler } from 'lib/axios'

import _ from 'lodash'
import axios from 'lib/axios'
import dynamic from 'next/dynamic'
import isIn from 'validator/lib/isIn'
import * as actions from 'store/actions'
import Pagination from 'components/Pagination'
import CardBlog from 'components/Card/BlogAdmin'
import PlantCard from 'components/Card/PlantAdmin'
import ErrorMessage from 'components/ErrorMessage'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'


const per_page = 12

const ManageBlog = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

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
                    <Form.Item className="">
                      <Input
                        size="large"
                        // value={q}
                        // onChange={e => setQ(e.target.value)}
                        placeholder="Search article"
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
                      <Row gutter={[20, 20]}>
                        {[...Array(12)].map((_, i) => (
                          <Col xl={8} lg={12} md={12} sm={24} xs={24} key={i}>
                            <CardBlog />
                          </Col>
                        ))}
                      </Row>
                    </AnimatePresence>

                  </Col>

                  <Col xl={24} lg={24} md={24} sm={24}>
                    <div className="text-center m-t-20 m-b-20">
                      <Pagination 
                        total={45} 
                        goTo={val => console.log(val)} 
                        current={3} 
                        hideOnSinglePage 
                        pageSize={per_page}
                      />
                    </div>
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
