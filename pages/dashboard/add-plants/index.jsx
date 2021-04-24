import { useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Layout, Card, Row, Col, Image, Form, Button, Input, Select, Upload, Pagination } from 'antd'

import { formImage } from 'formdata/image'

import pageStyle from 'components/Dashboard/pageStyle.js'

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
                            placeholder="Description"
                            autoSize={{ minRows: 2, maxRows: 3 }} 
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={24}>
                        <Form.Item 
                          label="Default PH"
                          className="m-b-0"
                        >
                          <Input
                            placeholder="Default PH"
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24}>
                        <Form.Item 
                          label="Default PPM"
                          className="m-b-0"
                        >
                          <Input
                            placeholder="Default PPM"
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={24}>
                        <Form.Item 
                          label="Time to growth"
                          className="m-b-0"
                        >
                          <Input
                            placeholder="Time to growth"
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={24}>
                        <Form.Item 
                          label="Difficulty Level"
                          className="m-b-0"
                        >
                          <Select defaultValue="simple">
                            <Select.Option value="simple">Simple</Select.Option>
                            <Select.Option value="medium">Medium</Select.Option>
                            <Select.Option value="hard">Hard</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xl={24} lg={24} md={24} sm={24}>
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

                      <Col xl={24} lg={24} md={24} sm={24}>
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
              <div className="header-dashboard m-t-40">
                <h2 className="h2 bold mb0">Plant List</h2>
              </div>

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
                        <Image src={plant.image} preview={false} alt="plant" />
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
                  <Pagination className="modif-pagination text-center m-t-20 m-b-20" current={3} total={50} />
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
        :global(.modif-pagination) {

        }
      `}</style>
    </>
  )
}

export default AddPlants
