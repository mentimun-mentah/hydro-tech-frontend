import { useState } from 'react'
import { Layout, Tabs, Upload, Button, Form, Space, Divider, Input, Row, Col, Select } from 'antd'

import moment from 'moment'
import pageStyle from 'components/Dashboard/pageStyle.js'

const formImage = {
  file: { 
    value: [
      {
        uid: '-1',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
    ], 
    isValid: true, message: null },
};

const Accounts = () => {
  const [avatar, setAvatar] = useState(formImage)

  return (
    <>
      <div className="header-dashboard">
        <h1 className="h1 bold mb0">Manage Account</h1>
        <span className="header-date">{moment().format("dddd, DD MMMM YYYY")}</span>
      </div>
      <Layout>
        <Layout.Content>
          <Row gutter={[20, 20]} justify="center">
            <Col xl={16} lg={18} md={24} sm={24}>
              <Tabs type="card" centered>

                <Tabs.TabPane tab="Profile" key="1">
                  <Form layout="vertical">
                    <Form.Item label={<b className="fs-16">Avatar</b>}>
                      <div className="avatar-section">
                        <Space>
                          <Upload
                            accept="image/*"
                            listType="picture-card"
                            className="avatar-uploader"
                            // onPreview={imagePreview}
                            fileList={avatar.file.value}
                            showUploadList={{showRemoveIcon: false, showPreviewIcon: true}}
                          >
                            {avatar.file.value.length >= 1 && null}
                          </Upload>
                          <Upload
                            accept="image/*"
                            showUploadList={false}
                            // beforeUpload={(file) => imageValidation(file, "file", "/users/update-avatar", "put", setLoading, () => dispatch(actions.getUser()), "The image profile has updated.")}
                          >
                            <Button disabled={false}>
                              Upload
                            </Button>
                          </Upload>
                        </Space>
                      </div>
                    </Form.Item>

                    <Divider />

                    <Row gutter={[20, 20]}>
                      <Col lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Username" className="mb0">
                          <Input type="text" placeholder="Username" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Email" className="mb0">
                          <Input type="Email" placeholder="Email" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Phone Number" className="mb0">
                          <Input placeholder="Phone number" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={24} sm={24} xs={24}>
                        <Form.Item label="Gender" className="mb0">
                          <Select 
                            name="gender" 
                            className="w-100" 
                            placeholder="Choose gender"
                          >
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col lg={24}>
                        <Form.Item className="mb0">
                          <Button type="primary">Save</Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>

                </Tabs.TabPane>

                <Tabs.TabPane tab="Password" key="2">
                  <Form layout="vertical">
                    <Row gutter={[20, 20]}>
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <Form.Item 
                          label="Old Password"
                          name="old_password"
                          className="mb0"
                        >
                          <Input.Password placeholder="Old Password" size="large" />
                        </Form.Item>
                      </Col>
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <Form.Item 
                          label="Password"
                          name="password"
                          className="mb0"
                        >
                          <Input.Password placeholder="Password" size="large" />
                        </Form.Item>
                      </Col>
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <Form.Item 
                          label="Confirmation Password"
                          name="password"
                          className="mb0"
                        >
                          <Input.Password placeholder="Confirmation Password" size="large" />
                        </Form.Item>
                      </Col>
                      <Col lg={24}>
                        <Form.Item className="mb0">
                          <Button type="primary">Save</Button>
                        </Form.Item>
                      </Col>
                    </Row>




                  </Form>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Plant" key="3">
                  Plant
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>

      <style jsx>{pageStyle}</style>
      <style jsx>{`
      :global(.ant-tabs-tab:hover) {
        color: var(--purple-1);
      }
      :global(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
        color: var(--purple);
      }
      :global(.ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane) {
        border-radius: 1rem;
        padding: 24px;
        background: #fff;
      }
      :global(.ant-tabs-card > .ant-tabs-nav) {
        margin-bottom: 0px;
      }
      :global(.ant-tabs-card > .ant-tabs-nav::before) {
        display: none;
      }
      :global(.ant-tabs-card .ant-tabs-tab, [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab) {
        background: transparent;
        border-color: transparent;
      }
      :global(.ant-tabs-card .ant-tabs-tab-active, [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active) {
        background: #fff;
        border-color: #fff;
      }
      :global(.ant-tabs-card .ant-tabs-tab) {
        background: transparent;
        border-color: transparent;
      }
      :global(.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab) {
        border-radius: 10px 10px 0 0;
      }
      :global(.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab) {
        border: 1px solid transparent;
      }
      :global(.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab) {
        margin-left: 5px;
      }

      :global(.ant-upload-list-picture-card-container) {
        display: inline-block;
        width: 70px;
        height: 70px;
        margin: 0;
        vertical-align: top;
      }
      :global(.avatar-uploader .ant-upload){
        vertical-align: middle;
        border-radius: 50%;
        margin-left: auto !important;
        margin-right: auto !important;
      }
      :global(.avatar-uploader .ant-upload-list-picture-card-container){
        margin-right: 0;
        border-radius: 50%;
      }
      :global(.avatar-uploader .ant-upload-list-item-info,
              .avatar-uploader .ant-upload-list-picture-card .ant-upload-list-item-info::before){
        border-radius: 50%;
      }
      :global(.avatar-uploader .ant-upload-list-picture-card .ant-upload-list-item){
        padding: 0px;
        border-radius: 50%;
      }

      .avatar-section {
        display: inline-flex;
        align-items: center;
      }
      `}</style>
    </>
  )
}

export default Accounts
