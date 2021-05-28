import { withAuth } from "lib/withAuth";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Card, Row, Col, Form, Button, Input, Select } from 'antd'

import { deepCopy } from 'lib/utility'
import { formDocs, formDescription, formDocsIsValid } from 'formdata/documentation'
import { formErrorMessage, signature_exp, resNotification, jsonHeaderHandler } from 'lib/axios'

import _ from 'lodash'
import axios from 'lib/axios'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import isIn from 'validator/lib/isIn'
import * as actions from 'store/actions'
import ErrorMessage from 'components/ErrorMessage'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'

const Editor = dynamic(import('components/Editor'), { ssr: false })

const ManageDocumentationSlug = ({ docsData }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const categories = useSelector(state => state.categories.categories)

  const [docsId, setDocsId] = useState("")
  const [desc, setDesc] = useState(formDescription)
  const [documentation, setDocumentation] = useState(formDocs)

  const [loading, setLoading] = useState(false)

  const { description } = desc
  const { title, category_doc_id } = documentation

  /* INPUT CHANGE FUNCTION */
  const onChangeHandler = (e, item) => {
    const name = !item && e.target.name;
    const value = !item && e.target.value;
    if(item){
      const data = {
        ...documentation,
        [item]: { ...documentation[item], value: e, isValid: true, message: null }
      }
      setDocumentation(data)
    }
    else {
      const data = {
        ...documentation,
        [name]: { ...documentation[name], value: value, isValid: true, message: null }
      }
      setDocumentation(data)
    }
  }

  const onDescChangeHandler = val => {
    const data = {
      ...desc,
      description: { ...desc.description, value: val, isValid: true, message: null }
    }
    setDesc(data)
  }
  /* INPUT CHANGE FUNCTION */

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.preventDefault()
    if(formDocsIsValid(documentation, setDocumentation, desc, setDesc)) {
      const data = {
        title: title.value,
        description: description.value,
        category_doc_id: category_doc_id.value
      }
      setLoading(true)
      axios.put(`/documentations/update/${docsId}`, data, jsonHeaderHandler())
        .then(res => {
          setLoading(false)
          resNotification("success", "Success", res.data.detail)
          resetInputField()
          router.replace('/dashboard/manage-docs')
        })
        .catch(err => {
          setLoading(false)
          const stateDesc = deepCopy(desc)
          const state = deepCopy(documentation)
          const errDetail = err.response.data.detail
          const errName = ["The name has already been taken.", "Nama sudah dipakai."]

          if(errDetail == signature_exp){
            resetInputField()
            resNotification("success", "Success", "Successfully update the documentation.")
            router.replace('/dashboard/manage-docs')
          }
          else if(typeof(errDetail) === "string" && isIn(errDetail, errName)){
            state.title.value = state.title.value
            state.title.isValid = false
            state.title.message = errDetail
          }
          else if(typeof(errDetail) === "string" && !isIn(errDetail, errName)){
            formErrorMessage("error", errDetail)
          }
          else {
            errDetail.map((data) => {
              const key = data.loc[data.loc.length - 1];
              if(key === "description"){
                stateDesc[key].isValid = false
                stateDesc[key].message = data.msg
              }
              if(state[key]){
                state[key].isValid = false
                state[key].message = data.msg
              }
            });
          }
          setDesc(stateDesc)
          setDocumentation(state)
        })
    }
  }
  /* SUBMIT FORM FUNCTION */

  const resetInputField = () => {
    setDocsId("")
    setDesc(formDescription)
    setDocumentation(formDocs)
  }

  useEffect(() => {
    dispatch(actions.getCategory({q:""}))
    if(docsData) {
      const { documentations_id, documentations_title, documentations_description, category_docs_id } = docsData

      const stateDocs = deepCopy(documentation)
      const stateDesc = deepCopy(desc)

      setDocsId(documentations_id)

      stateDocs["title"].value = documentations_title
      stateDocs["category_doc_id"].value = category_docs_id
      stateDesc["description"].value = documentations_description

      setDesc(stateDesc)
      setDocumentation(stateDocs)
    }
  }, [docsData])

  return(
    <>
      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Card className="radius1rem shadow1 h-100 card-update-docs" bordered={false}>
                <div className="header-dashboard m-b-0">
                  <h2 className="h2 bold">Update Documentation</h2>
                  <Form name="AddBlog" layout="vertical">
                    <Row gutter={[20, 20]}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item 
                          label="Category"
                          className="m-b-0"
                          validateStatus={!category_doc_id.isValid && category_doc_id.message && "error"}
                        >
                          <Select
                            showSearch
                            size="large"
                            placeholder="Select category"
                            optionFilterProp="children"
                            value={category_doc_id.value}
                            onChange={e => onChangeHandler(e, "category_doc_id")}
                            onSearch={val => dispatch(actions.getCategory({q:val}))}
                            onFocus={() => dispatch(actions.getCategory({q:""}))}
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {categories && categories.length > 0 && categories.map(category => (
                              <Select.Option 
                                key={category.category_docs_id}
                                value={category.category_docs_id}
                              >
                                {category.category_docs_name}
                              </Select.Option>
                            ))}
                            <Select.Option value="jack">Learn ESP32</Select.Option>
                            <Select.Option value="lucy">Protocols</Select.Option>
                            <Select.Option value="asd">Arduino Modules</Select.Option>
                          </Select>
                          <ErrorMessage item={category_doc_id} />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item 
                          label="Title"
                          className="m-b-0"
                          validateStatus={!title.isValid && title.message && "error"}
                        >
                          <Input
                            size="large"
                            name="title"
                            value={title.value}
                            onChange={onChangeHandler}
                            placeholder="Title"
                          />
                          <ErrorMessage item={title} />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item 
                          label="Description"
                          className="m-b-0"
                          validateStatus={!description.isValid && description.message && "error"}
                        >
                          <Editor 
                            initialValue={description.value}
                            setContent={onDescChangeHandler}
                            height="200"
                          />
                          <ErrorMessage item={description} />
                        </Form.Item>
                      </Col>

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item className="m-b-0">
                          <Button 
                            size="large"
                            type="primary" 
                            className="p-l-30 p-r-30" 
                            disabled={loading}
                            onClick={onSubmitHandler}
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
      <style jsx>{`
        :global(body .card-update-docs) {
          font-weight: normal;
        }
      `}</style>
    </>
  )
}


ManageDocumentationSlug.getInitialProps = async ctx => {
  const { slug } = ctx.query
  try{
    const res = await axios.get(`/documentations/${slug}`)
    if(res.status == 404){
      process.browser
        ? Router.replace("/dashboard/manage-docs", "/dashboard/manage-docs") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/dashboard/manage-docs" }); //Redirec from Server Side
      !process.browser && ctx.res.end()
    } else {
      return {
        docsData: res.data
      }
    }
  }
  catch (err) {
    const res = await axios.get(`/documentations/${slug}`)
    if(res.status == 404){
      process.browser
        ? Router.replace("/dashboard/manage-docs", "/dashboard/manage-docs") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/dashboard/manage-docs" }); //Redirec from Server Side
      !process.browser && ctx.res.end()
    } else {
      return {
        docsData: res.data
      }
    }
  }
}

export default withAuth(ManageDocumentationSlug)
