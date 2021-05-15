import { withAuth } from "lib/withAuth";
import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Card, Row, Col, Form, Button, Input, Select, Upload, Modal, Space, InputNumber, Empty } from 'antd'

import { deepCopy } from 'lib/utility'
import { formImage } from 'formdata/image'

import _ from 'lodash'
import dynamic from 'next/dynamic'
import isIn from 'validator/lib/isIn'
import * as actions from 'store/actions'
import ErrorMessage from 'components/ErrorMessage'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'

const Editor = dynamic(import('components/Editor'), { ssr: false })

const ManageDocumentation = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageList, setImageList] = useState(formImage)

  return(
    <>
      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <div className="header-dashboard">
                  <h2 className="h2 bold">Update Documentation</h2>
                  <Form name="AddBlog" layout="vertical">
                    <Row gutter={[20, 20]}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item 
                          label="Category"
                          className="m-b-0"
                          // validateStatus={!name.isValid && name.message && "error"}
                        >
                          <Select
                            showSearch
                            size="large"
                            placeholder="Select category"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Select.Option value="jack">Learn ESP32</Select.Option>
                            <Select.Option value="lucy">Protocols</Select.Option>
                            <Select.Option value="asd">Arduino Modules</Select.Option>
                          </Select>
                          {/* <ErrorMessage item={name} /> */}
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

export default withAuth(ManageDocumentation)
