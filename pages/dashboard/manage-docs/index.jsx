import { withAuth } from 'lib/withAuth'
import { AnimatePresence } from 'framer-motion'
import { Layout, Row, Col, Form, Input } from 'antd'

import _ from 'lodash'
import dynamic from 'next/dynamic'
import Pagination from 'components/Pagination'
import CardLoading from 'components/Card/CardLoading'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'

const CardLoadingMemo = React.memo(CardLoading)
const CardDocs = dynamic(() => import('components/Card/DocsAdmin'), { ssr: false, loading: () => <CardLoadingMemo />  })
const CardDocsMemo = React.memo(CardDocs)

const per_page = 12

const ManageDocumentation = () => {
  return(
    <>
      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <div className="header-dashboard m-b-5">
                <h2 className="h2 bold mb0">Manage Documentation</h2>
              </div>

              <Form layout="vertical">
                <Row gutter={[20, 20]}>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item className="">
                      <Input
                        size="large"
                        // value={q}
                        // onChange={e => setQ(e.target.value)}
                        placeholder="Search documentation"
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
                            <CardDocsMemo />
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

export default withAuth(ManageDocumentation)
