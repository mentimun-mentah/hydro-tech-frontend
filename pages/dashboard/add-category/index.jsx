import { withAuth } from "lib/withAuth";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { EditOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Layout, Card, Row, Col, Form, Button, Input, Popconfirm, Empty } from 'antd'

import { deepCopy, enterPressHandler } from 'lib/utility'
import { formCategory, formCategoryIsValid } from 'formdata/category'
import { jsonHeaderHandler, signature_exp, formErrorMessage, resNotification } from 'lib/axios'

import axios from 'lib/axios'
import isIn from 'validator/lib/isIn'
import * as actions from 'store/actions'
import ErrorMessage from 'components/ErrorMessage'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'

const AddCategory = () => {
  const dispatch = useDispatch()

  const categories = useSelector(state => state.categories.categories)

  const [q, setQ] = useState("")
  const [loading, setLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [category, setCategory] = useState(formCategory)

  const { id, name } = category

  /* INPUT CHANGE FUNCTION */
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = {
      ...category,
      [name]: { ...category[name], value: value, isValid: true, message: null }
    }
    setCategory(data)
  }
  /* INPUT CHANGE FUNCTION */

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.preventDefault()
    if(formCategoryIsValid(category, setCategory)) {
      setLoading(true)

      const data = { name: name.value }
      
      let method = 'post'
      let url = '/category-docs/create'
      let successResponse = "Successfully add a new category-doc."
      if(isUpdate) {
        method = 'put'
        url = `/category-docs/update/${id}`
        successResponse = "Successfully update the category-doc."
      }

      axios[method](url, data, jsonHeaderHandler())
        .then(res => {
          setLoading(false)
          resetInputField()
          dispatch(actions.getCategory({q: q}))
          resNotification("success", "Success", res.data.detail)
          if(isUpdate) setIsUpdate(false)
        })
        .catch(err => {
          setLoading(false)
          const state = deepCopy(category)
          const errDetail = err.response.data.detail
          const errName = ["The name has already been taken.", "Nama sudah dipakai."]

          if(errDetail == signature_exp){
            resetInputField()
            dispatch(actions.getCategory({q: q}))
            resNotification("success", "Success", successResponse)
            if(isUpdate) setIsUpdate(false)
          }
          else if(typeof(errDetail) === "string" && isIn(errDetail, errName)){
            state.name.value = state.name.value
            state.name.isValid = false
            state.name.message = errDetail
          }
          else if(typeof(errDetail) === "string" && !isIn(errDetail, errName)){
            formErrorMessage("error", errDetail)
          }
          else {
            errDetail.map((data) => {
              const key = data.loc[data.loc.length - 1];
              if(state[key]){
                state[key].isValid = false
                state[key].message = data.msg
              }
            });
          }
          setCategory(state)
        })
    }
  }

  const resetInputField = () => {
    setCategory(formCategory)
  }

  useEffect(() => {
    dispatch(actions.getCategory({ q: q }))
  }, [q])

  const onGetEditData = async (id) => {
    await axios.get(`/category-docs/get-category-doc/${id}`)
      .then(res => {
        const state = deepCopy(formCategory)
        state.id = res.data.category_docs_id
        state.name.value = res.data.category_docs_name
        setCategory(state)
        setIsUpdate(true)
      })
      .catch(async err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp) {
          await axios.get(`/category-docs/get-category-doc/${id}`)
            .then(res => {
              const state = deepCopy(formCategory)
              state.id = res.data.category_docs_id
              state.name.value = res.data.category_docs_name
              setCategory(state)
              setIsUpdate(true)
            })
        }
        else if(typeof(errDetail) === "string" && errDetail !== signature_exp){
          formErrorMessage("error", errDetail)
        }
        else {
          formErrorMessage("error", "Something was wrong!")
        }
      })

    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  const onDeleteCategory = async (id) => {
    await axios.delete(`/category-docs/delete/${id}`, jsonHeaderHandler())
      .then(res => {
        formErrorMessage("success", res.data.detail)
        dispatch(actions.getCategory({q: q}))
      })
      .catch(err => {
        const errDetail = err.response.data.detail;
        if(errDetail === signature_exp) {
          formErrorMessage("success", res.data.detail)
          dispatch(actions.getCategory({q: q}))
        }
        else if(typeof(errDetail) === "string" && errDetail !== signature_exp){
          formErrorMessage("error", errDetail)
        }
        else {
          formErrorMessage("error", "Something was wrong!")
        }
      })

  }

  return(
    <>
      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <div className="header-dashboard m-b-0">
                  <h2 className="h2 bold">{isUpdate ? "Update" : "Add"} Category</h2>
                  <Form name="Add Category" layout="vertical" onKeyUp={e => enterPressHandler(e, onSubmitHandler)}>
                    <Row gutter={[20, 20]}>
                      <Col span={24}>
                        <Form.Item 
                          label="Name"
                          className="m-b-0"
                          validateStatus={!name.isValid && name.message && "error"}
                        >
                          <Input
                            size="large"
                            name="name"
                            value={name.value}
                            onChange={onChangeHandler}
                            placeholder="Category"
                          />
                          <ErrorMessage item={name} />
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
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="Search category"
                        prefix={<i className="far fa-search text-grey" />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              <AnimatePresence>
                <Row gutter={[20, 20]}>
                  {categories && categories.length > 0 ? (
                    <>
                    {categories.map(category => (
                      <Col xl={6} lg={8} md={8} sm={12} xs={12} key={category.category_docs_id}>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: ".2" }}
                          className="w-100"
                        >
                          <Card 
                            bordered={false}
                            className="radius1rem shadow1 h-100 hover-pointer rounded-card-actions"
                            actions={[
                              <EditOutlined 
                                key="edit" 
                                onClick={() => onGetEditData(category.category_docs_id)}
                              />,
                              <Popconfirm
                                okText="Delete"
                                onConfirm={() => onDeleteCategory(category.category_docs_id)}
                                title={`${category.category_docs_name} ?`}
                              >
                                <DeleteOutlined key="delete" />
                              </Popconfirm>
                            ]}
                          >
                            <h2 className="h3 bold text-center text-grey-1 m-b-0">{category.category_docs_name}</h2>
                          </Card>
                        </motion.div>
                      </Col>
                    ))}
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: ".2" }}
                      className="w-100"
                    >
                      <Empty className="m-t-100 m-b-100" description={<span className="text-grey">No Result</span>} /> 
                    </motion.div>
                  )}
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
