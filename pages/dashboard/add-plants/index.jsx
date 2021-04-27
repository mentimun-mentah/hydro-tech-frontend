import { useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Layout, Card, Row, Col, Form, Button, Input, Select, Upload } from 'antd'

import { formImage } from 'formdata/image'

import Image from 'next/image'
import Pagination from 'components/Pagination'
import pageStyle from 'components/Dashboard/pageStyle'

const Bayam = '/static/images/plant/bayam.png'
const Kailan = '/static/images/plant/kailan-2.png'
const Pakcoy = '/static/images/plant/pakcoy-2.png'
const Kangkung = '/static/images/plant/kangkung.png'
const Sawi = '/static/images/plant/sawi.png'
const Selada = '/static/images/plant/selada.png'

const plantList = [
  { name: "Bayam", image: Bayam },
  { name: "Kailan", image: Kailan },
  { name: "Pakcoy", image: Pakcoy },
  { name: "Kangkung", image: Kangkung },
  { name: "Sawi", image: Sawi },
  { name: "Selada", image: Selada },
]

const AddPlants = () => {
  const [imageList, setImageList] = useState(formImage)

  return(
    <>
      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <div className="header-dashboard">
                  <h2 className="h2 bold">Add Plants</h2>
                  <Form name="AddPlants" layout="vertical">
                    <Row gutter={[20, 20]}>
                      <Col span={24}>
                        <Form.Item 
                          label="Name"
                          className="m-b-0"
                        >
                          <Input
                            size="large"
                            placeholder="Plant Name"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item 
                          label="Description"
                          className="m-b-0"
                        >
                          <Input.TextArea 
                            size="large"
                            placeholder="Description"
                            autoSize={{ minRows: 2, maxRows: 3 }} 
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                        <Form.Item 
                          label="PH Minimum"
                          className="m-b-0"
                        >
                          <Input
                            size="large"
                            placeholder="PH Minimum"
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                        <Form.Item 
                          label="PH Maximum"
                          className="m-b-0"
                        >
                          <Input
                            size="large"
                            placeholder="PH Maximum"
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                        <Form.Item 
                          label="TDS Minimum"
                          className="m-b-0"
                        >
                          <Input
                            size="large"
                            placeholder="TDS Minimum"
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item 
                          label="Time to growth"
                          className="m-b-0"
                        >
                          <Input
                            size="large"
                            placeholder="e.g. 21 days, 4 weeks"
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item 
                          label="Difficulty Level"
                          className="m-b-0"
                        >
                          <Select 
                            size="large"
                            defaultValue="simple"
                          >
                            <Select.Option value="simple">Simple</Select.Option>
                            <Select.Option value="medium">Medium</Select.Option>
                            <Select.Option value="hard">Hard</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item 
                          label="Plant Photo"
                          className="m-b-0"
                        >
                          <Upload
                            accept="image/*"
                            listType="picture-card"
                            className="avatar-uploader"
                            // disabled={loading}
                            // onChange={imageChangeHandler}
                            // fileList={imageList.file.value}
                            // beforeUpload={(f) => imageValidation(f, "image", "/promos/create", "post", () => {}, () => {}, "")}
                          >
                            {imageList.file.value.length >= 1 ? null : "+ Upload"}
                          </Upload>
                        </Form.Item>
                      </Col>

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item className="m-b-0">
                          <Button type="primary" size="large" className="p-l-30 p-r-30">
                            <b>Save</b>
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
              <div className="header-dashboard m-t-40 mb0">
                <h2 className="h2 bold mb0">Plant List</h2>
              </div>

              <Form layout="vertical">
                <Row gutter={[20, 20]}>
                  <Col lg={10} md={10} sm={12} xs={24}>
                    <Form.Item className="">
                      <Input
                        size="large"
                        placeholder="Search plant"
                        prefix={<i className="far fa-search text-grey" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              <Row gutter={[20, 20]}>
                {plantList.map((plant, i) => (
                  <Col lg={6} md={8} sm={8} xs={12} key={i}>
                    <Card 
                      bordered={false}
                      className="radius1rem shadow1 h-100 hover-pointer rounded-card-actions"
                      actions={[
                        <EditOutlined key="edit" />,
                        <DeleteOutlined key="delete" />,
                      ]}
                    >
                      <div className="text-right">
                        <Image src={plant.image} width={500} height={500} alt="plant" />
                      </div>
                      <div className="text-center items-center text-grey">
                        <h3 className="h3 bold mb1 line-height-1">
                          {plant.name}
                        </h3>
                        <p className="mb0">16 Weeks</p>
                        <p className="mb0">PH <b className="text-orange">7</b></p>
                        <p className="mb0">PPM <b className="text-orange">1500</b></p>
                        <p className="mb0">Difficutly level <b className="text-orange">Simple</b></p>
                      </div>
                    </Card>
                  </Col>
                ))}

                <Col xl={24} lg={24} md={24} sm={24}>
                  <div className="text-center m-t-20 m-b-20">
                    <Pagination current={3} total={50} />
                  </div>
                </Col>
              </Row>

            </Col>
          </Row>

        </Layout.Content>
      </Layout>

      <style jsx>{pageStyle}</style>
      <style jsx>{`
        :global(.rounded-card-actions .ant-card-actions) {
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
        }
      `}</style>
    </>
  )
}

export default AddPlants
