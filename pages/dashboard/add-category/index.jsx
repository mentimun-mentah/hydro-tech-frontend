import { useState } from 'react'
import { withAuth } from "lib/withAuth";
import { AnimatePresence, motion } from 'framer-motion'
import { EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Layout, Card, Row, Col, Form, Button, Input, Popconfirm } from 'antd'

import ErrorMessage from 'components/ErrorMessage'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'

const AddCategory = () => {
  const [loading, setLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  return(
    <>
      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <div className="header-dashboard">
                  <h2 className="h2 bold">{isUpdate ? "Update" : "Add"} Category</h2>
                  <Form name="AddPlants" layout="vertical">
                    <Row gutter={[20, 20]}>
                      <Col span={24}>
                        <Form.Item 
                          label="Name"
                          className="m-b-0"
                          // validateStatus={!name.isValid && name.message && "error"}
                        >
                          <Input
                            size="large"
                            name="name"
                            // value={name.value}
                            // onChange={onChangeHandler}
                            placeholder="Category"
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
                            // disabled={loading}
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

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <div className="header-dashboard m-t-40 m-b-5">
                <h2 className="h2 bold mb0">Category List</h2>
              </div>

              <Form layout="vertical">
                <Row gutter={[20, 20]}>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item className="">
                      <Input
                        size="large"
                        // value={q}
                        // onChange={e => setQ(e.target.value)}
                        placeholder="Search category"
                        prefix={<i className="far fa-search text-grey" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              <AnimatePresence>
                <Row gutter={[20, 20]}>
                  {[...Array(12)].map((category, i) => (
                    <Col xl={6} lg={8} md={8} sm={12} xs={12} key={i}>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: ".2" }}
                      >
                        <Card 
                          bordered={false}
                          className="radius1rem shadow1 h-100 hover-pointer rounded-card-actions"
                          actions={[
                            <EditOutlined key="edit" />,
                            <Popconfirm
                              okText="Delete"
                              title={`Delete Learn ESP32?`}
                            >
                              <DeleteOutlined key="delete" />
                            </Popconfirm>
                          ]}
                        >
                          <h2 className="h3 bold text-center text-grey-1 m-b-0">Learn ESP32</h2>
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
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

export default withAuth(AddCategory)
