import { useEffect } from 'react'
import { withAuth } from 'lib/withAuth'
import { useDispatch } from 'react-redux'
import { Layout, Tabs, Row, Col } from 'antd'

import moment from 'moment'
import axios from 'lib/axios'
import * as actions from 'store/actions'
import Token from 'components/Accounts/Token'
import Camera from 'components/Accounts/Camera'
import Profile from 'components/Accounts/Profile'
import Password from 'components/Accounts/Password'
import pageStyle from 'components/Dashboard/pageStyle.js'

const Accounts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getSettingUsersMySetting())
  }, [])

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
              <Tabs type="card" centered defaultActiveKey="1">

                <Tabs.TabPane tab="Profile" key="1">
                  <Profile />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Password" key="2">
                  <Password />
                </Tabs.TabPane>

                <Tabs.TabPane tab="IoT Token" key="3">
                  <Token />
                </Tabs.TabPane>

                <Tabs.TabPane tab="IoT Camera" key="4">
                  <Camera />
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

Accounts.getInitialProps = async ctx => {
  if(ctx.req) axios.defaults.headers.get.Cookie = ctx.req.headers.cookie;
  try {
    const res = await axios.get("/setting-users/my-setting")
    ctx.store.dispatch(actions.getSettingUsersMySettingSuccess(res.data))
  }
  catch (err) { }
}

export default withAuth(Accounts)
