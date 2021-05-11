import { withAuth } from "lib/withAuth";
import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout, Card, Row, Col, Form, Button, Input, Select, Upload, Modal, Space, InputNumber, Empty } from 'antd'

import { deepCopy } from 'lib/utility'
import { formImage } from 'formdata/image'
import { formPlant } from 'formdata/plant'
import { imageValidation, imagePreview, uploadButton } from 'lib/imageUploader'
import { formHeaderHandler, formErrorMessage, signature_exp, resNotification, jsonHeaderHandler } from 'lib/axios'

import _ from 'lodash'
import axios from 'lib/axios'
import dynamic from 'next/dynamic'
import isIn from 'validator/lib/isIn'
import * as actions from 'store/actions'
import Pagination from 'components/Pagination'
import PlantCard from 'components/Card/PlantAdmin'
import ErrorMessage from 'components/ErrorMessage'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'

const Editor = dynamic(import('components/Editor'), { ssr: false })

const ManageBlog = () => {
  const dispatch = useDispatch()

  const [plant, setPlant] = useState(formPlant)
  const [loading, setLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [imageList, setImageList] = useState(formImage)

  return(
    <>
      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <div className="header-dashboard">
                  <h2 className="h2 bold">Update Blog</h2>
                  <Form name="AddBlog" layout="vertical">
                    <Row gutter={[20, 20]}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item 
                          label="Photo (750 × 500 px)"
                          className="m-b-0"
                        >
                          <Upload
                            accept="image/*"
                            listType="picture-card"
                            className="avatar-uploader"
                            disabled={loading}
                            onPreview={imagePreview}
                            // onChange={imageChangeHandler}
                            fileList={imageList.file.value}
                            beforeUpload={(f) => imageValidation(f, "image", "/plants/create", "post", setLoading, () => {}, "")}
                          >
                            {imageList.file.value.length >= 1 ? null : uploadButton(loading)}
                          </Upload>
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item 
                          label="Title"
                          className="m-b-0"
                          // validateStatus={!name.isValid && name.message && "error"}
                        >
                          <Input
                            size="large"
                            name="name"
                            // value={name.value}
                            // onChange={onChangeHandler}
                            placeholder="Title"
                          />
                          {/* <ErrorMessage item={name} /> */}
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item 
                          label="Description"
                          className="m-b-0"
                          // validateStatus={!name.isValid && name.message && "error"}
                        >
                          <Editor 
                            setContent={() => {}} 
                            height="200"
                          />
                          {/* <ErrorMessage item={name} /> */}
                        </Form.Item>
                      </Col>

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item className="m-b-0">
                          <Button 
                            size="large"
                            type="primary" 
                            className="p-l-30 p-r-30" 
                            disabled={loading}
                            // onClick={onSubmitHandler}
                          >
                            {loading ? <LoadingOutlined /> : <b>Save</b>}
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card>
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
