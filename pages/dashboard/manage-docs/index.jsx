import { withAuth } from 'lib/withAuth'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout, Row, Col, Form, Input, Empty } from 'antd'

import _ from 'lodash'
import React from 'react'
import dynamic from 'next/dynamic'
import * as actions from 'store/actions'
import CardLoading from 'components/Card/CardLoading'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'

const CardLoadingMemo = React.memo(CardLoading)
const CardDocs = dynamic(() => import('components/Card/DocsAdmin'), { ssr: false, loading: () => <CardLoadingMemo />  })
const CardDocsMemo = React.memo(CardDocs)

const ManageDocumentation = () => {
  const dispatch = useDispatch()
  
  const documentations = useSelector(state => state.documentations.documentation)

  const [q, setQ] = useState("")

  useEffect(() => {
    let queryString = {}

    if(q) queryString["q"] = q
    else delete queryString["q"]

    dispatch(actions.getAllDocumentation({...queryString}))
  }, [q])


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
                    <Form.Item>
                      <Input
                        size="large"
                        value={q}
                        onChange={e => setQ(e.target.value)}
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
                        {documentations && documentations.length > 0 ? (
                          <>
                            {documentations.map(doc => (
                              <Col xl={8} lg={12} md={12} sm={24} xs={24} key={doc.documentations_id}>
                                <CardDocsMemo doc={doc} />
                              </Col>
                            ))}
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

export default withAuth(ManageDocumentation)
