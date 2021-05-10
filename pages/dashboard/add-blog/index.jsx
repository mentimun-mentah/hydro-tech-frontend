import { withAuth } from "lib/withAuth";
import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout, Card, Row, Col, Form, Button, Input, Select, Upload, Modal, Space, InputNumber, Empty } from 'antd'

import { deepCopy } from 'lib/utility'
import { formImage } from 'formdata/image'
import { formPlant } from 'formdata/plant'
import { imageValidation, imagePreview, uploadButton } from 'lib/imageUploader'
import { formHeaderHandler, formErrorMessage, signature_exp, resNotification, jsonHeaderHandler } from 'lib/axios'

import _ from 'lodash'
import axios from 'lib/axios'
import isIn from 'validator/lib/isIn'
import * as actions from 'store/actions'
import Pagination from 'components/Pagination'
import PlantCard from 'components/Card/PlantAdmin'
import ErrorMessage from 'components/ErrorMessage'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'

const formPlantCopy = deepCopy(formPlant)

const per_page = 12

const AddPlants = () => {
  const dispatch = useDispatch()
  const plants = useSelector(state => state.plant.plant)

  const [q, setQ] = useState("")
  const [page, setPage] = useState(plants.page)
  const [plant, setPlant] = useState(formPlant)
  const [difficulty, setDifficulty] = useState("")
  const [loading, setLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [imageList, setImageList] = useState(formImage)

  const { id, name, desc, ph_max, ph_min, tds_min, growth_value, growth_type, difficulty_level } = plant

  const resetInputField = () => {
    setTimeout(() => {
      setPlant(formPlantCopy)
      setImageList(formImage)
    }, 500)
  }

  /* INPUT CHANGE FUNCTION */
  const onChangeHandler = (e, item) => {
    const name = !item && e.target.name;
    const value = !item && e.target.value;
    if(item){
      const data = {
        ...plant,
        [item]: { ...plant[item], value: e, isValid: true, message: null }
      }
      setPlant(data)
    }
    else {
      const data = {
        ...plant,
        [name]: { ...plant[name], value: value, isValid: true, message: null }
      }
      setPlant(data)
    }
  }
  /* INPUT CHANGE FUNCTION */

  /* IMAGE CHANGE FUNCTION */
  const imageChangeHandler = ({ fileList: newFileList }) => {
    const data = {
      ...imageList,
      file: { value: newFileList, isValid: true, message: null }
    }
    setImageList(data)
  };
  /* IMAGE CHANGE FUNCTION */

  const fetchingPlantHandler = () => {
    let query = {}
    if(q) query['q'] = q
    if(difficulty) query['difficulty'] = difficulty
    dispatch(actions.getPlant({ page: 1, per_page: per_page, ...difficulty }))
  }

  const onDeleteHandler = (id) => {
    let queryString = {}
    queryString["page"] = page
    queryString["per_page"] = per_page

    if(q) queryString["q"] = q
    else delete queryString["q"]

    if(difficulty !== "") queryString["difficulty"] = difficulty
    else delete queryString["difficulty"]

    axios.delete(`/plants/delete/${id}`, jsonHeaderHandler())
      .then(res => {
        resNotification("success", "Success", res.data.detail)
        dispatch(actions.getPlant({ ...queryString }))
      })
      .catch(err => {
        const errDetail = err.response.data.detail
        if(errDetail == signature_exp){
          dispatch(actions.getPlant({ ...queryString }))
          resNotification("success", "Success", "Successfully delete the plant.")
        } else if(typeof(errDetail) === "string") {
          resNotification("error", "Error", errDetail)
        } else {
          resNotification("error", "Error", errDetail[0].msg)
        }
      })
  }

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("name", name.value)
    formData.append("desc", desc.value)
    formData.append("ph_max", parseFloat(ph_max.value).toFixed(2))
    formData.append("ph_min", parseFloat(ph_min.value).toFixed(2))
    formData.append("tds_min", parseFloat(tds_min.value).toFixed(2))
    formData.append("growth_value", growth_value.value)
    formData.append("growth_type", growth_type.value)
    formData.append("difficulty_level", difficulty_level.value)
    _.forEach(imageList.file.value, file => {
      if(!file.hasOwnProperty('url')){
        formData.append('image', file.originFileObj)
      }
    })
    
    let method = 'post'
    let url = '/plants/create'
    let successResponse = "Successfully add a new plant."
    if(isUpdate) {
      method = 'put'
      url = `/plants/update/${id}`
      successResponse = "Successfully update the plant."
    }

    axios[method](url, formData, formHeaderHandler())
      .then(res => {
        setLoading(false)
        resetInputField()
        fetchingPlantHandler()
        resNotification("success", "Success", res.data.detail)
        if(isUpdate) setIsUpdate(false)
      })
      .catch(err => {
        setLoading(false)
        const state = deepCopy(plant)
        const errDetail = err.response.data.detail;
        const errName = ["The name has already been taken.", "Nama sudah dipakai."]

        if(errDetail == signature_exp){
          resetInputField()
          resNotification("success", "Success", successResponse)
          fetchingPlantHandler()
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
            if(key === "image")formErrorMessage("error", "Image " + data.msg)
            if(state[key]){
              state[key].isValid = false
              state[key].message = data.msg
            }
          });
        }
        setPlant(state)
      })
  }

  useEffect(() => {
    let queryString = {}
    queryString["page"] = page
    queryString["per_page"] = per_page

    if(q) queryString["q"] = q
    else delete queryString["q"]

    if(difficulty !== "") queryString["difficulty"] = difficulty
    else delete queryString["difficulty"]

    dispatch(actions.getPlant({...queryString}))
  }, [page])

  useEffect(() => {
    setPage(1)
    let queryString = {}
    queryString["page"] = 1
    queryString["per_page"] = per_page

    if(q) queryString["q"] = q
    else delete queryString["q"]

    if(difficulty !== "") queryString["difficulty"] = difficulty
    else delete queryString["difficulty"]

    dispatch(actions.getPlant({...queryString}))
  }, [q, difficulty])

  useEffect(() => {
    if(plants && plants.data && plants.data.length < 1 && plants.page > 1 && plants.total > 1){
      setPage(plants.page - 1)
    }
  }, [plants])

  const onGetEditData = (plant) => {
    const state = deepCopy(formPlant)
    const { plants_id, plants_name, plants_desc, plants_ph_max, plants_ph_min, plants_tds_min } = plant
    const { plants_growth_value, plants_growth_type, plants_difficulty_level, plants_image } = plant
    state.id = plants_id
    state.name.value = plants_name
    state.desc.value = plants_desc
    state.ph_max.value = plants_ph_max
    state.ph_min.value = plants_ph_min
    state.tds_min.value = plants_tds_min
    state.growth_value.value = plants_growth_value
    state.growth_type.value = plants_growth_type
    state.difficulty_level.value = plants_difficulty_level

    const imagePlant = {
      file: { 
        value: [{
          uid: -Math.abs(plants_id),
          url: `${process.env.NEXT_PUBLIC_API_URL}/static/plants/${plants_image}`
        }], 
        isValid: true, 
        message: null 
      }
    }

    console.log(state)
    setIsUpdate(true)
    setPlant(state)
    setImageList(imagePlant)

    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  return(
    <>
      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <div className="header-dashboard">
                  <h2 className="h2 bold">{isUpdate ? "Update" : "Add"} Blog</h2>
                  <Form name="AddBlog" layout="vertical">
                    <Row gutter={[20, 20]}>
                      <Col span={24}>
                        <Form.Item 
                          label="Title"
                          className="m-b-0"
                          validateStatus={!name.isValid && name.message && "error"}
                        >
                          <Input
                            size="large"
                            name="name"
                            value={name.value}
                            onChange={onChangeHandler}
                            placeholder="Title"
                          />
                          <ErrorMessage item={name} />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item 
                          label="Description"
                          className="m-b-0"
                          validateStatus={!desc.isValid && desc.message && "error"}
                        >
                          <Input.TextArea 
                            size="large"
                            name="desc"
                            value={desc.value}
                            placeholder="Description"
                            onChange={onChangeHandler}
                            autoSize={{ minRows: 2, maxRows: 3 }} 
                          />
                          <ErrorMessage item={desc} />
                        </Form.Item>
                      </Col>

                      <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                        <Form.Item 
                          label="PH Maximum"
                          className="m-b-0"
                          validateStatus={!ph_max.isValid && ph_max.message && "error"}
                        >
                          <InputNumber
                            size="large"
                            step="0.01"
                            min="0"
                            max="20"
                            className="w-100"
                            placeholder="PH Maximum"
                            value={ph_max.value}
                            onChange={e => onChangeHandler(e, "ph_max")}
                          />
                          <ErrorMessage item={ph_max} />
                        </Form.Item>
                      </Col>

                      <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                        <Form.Item 
                          label="PH Minimum"
                          className="m-b-0"
                          validateStatus={!ph_min.isValid && ph_min.message && "error"}
                        >
                          <InputNumber
                            size="large"
                            step="0.01"
                            min="0"
                            max="20"
                            className="w-100"
                            placeholder="PH Minimum"
                            value={ph_min.value}
                            onChange={e => onChangeHandler(e, "ph_min")}
                          />
                          <ErrorMessage item={ph_min} />
                        </Form.Item>
                      </Col>
                      <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                        <Form.Item 
                          label="TDS Minimum"
                          className="m-b-0"
                          validateStatus={!tds_min.isValid && tds_min.message && "error"}
                        >
                          <InputNumber
                            size="large"
                            step="0.01"
                            min="0"
                            max="3000"
                            className="w-100"
                            placeholder="TDS Minimum"
                            value={tds_min.value}
                            onChange={e => onChangeHandler(e, "tds_min")}
                          />
                          <ErrorMessage item={tds_min} />
                        </Form.Item>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item 
                          label="Time to growth"
                          className="m-b-0"
                          validateStatus={
                            (!growth_value.isValid && growth_value.message && "error") || 
                            (!growth_type.isValid && growth_type.message && "error")
                          }
                        >
                          <div>
                            <div className="ant-input-group-wrapper">
                              <div className="ant-input-wrapper ant-input-group input-with-addonafter">
                                <InputNumber
                                  size="large"
                                  min="0"
                                  max="1000000000"
                                  className="w-100 bor-right-rad-0"
                                  placeholder="e.g. 28"
                                  value={growth_value.value}
                                  onChange={e => onChangeHandler(e, "growth_value")}
                                />
                                <div className="ant-input-group-addon noselect fs-12 bg-transparent">
                                  <Select 
                                    size="large" 
                                    name="growth_type"
                                    value={growth_type.value}
                                    className="select-before"
                                    onChange={e => onChangeHandler(e, "growth_type")}
                                  >
                                    <Select.Option value="days">days</Select.Option>
                                    <Select.Option value="weeks">weeks</Select.Option>
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <ErrorMessage item={!growth_value.isValid && growth_value || !growth_type.isValid && growth_type} />
                          </div>
                        </Form.Item>
                      </Col>

                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form.Item 
                          label="Difficulty Level"
                          className="m-b-0"
                          validateStatus={!difficulty_level.isValid && difficulty_level.message && "error"}
                        >
                          <Select 
                            size="large"
                            name="difficulty_level"
                            value={difficulty_level.value}
                            onChange={e => onChangeHandler(e, "difficulty_level")}
                          >
                            <Select.Option value="easy">Easy</Select.Option>
                            <Select.Option value="medium">Medium</Select.Option>
                            <Select.Option value="hard">Hard</Select.Option>
                          </Select>
                          <ErrorMessage item={difficulty_level} />
                        </Form.Item>
                      </Col>

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item 
                          label="Photo (500 × 500 px)"
                          className="m-b-0"
                        >
                          <Upload
                            accept="image/*"
                            listType="picture-card"
                            className="avatar-uploader"
                            disabled={loading}
                            onPreview={imagePreview}
                            onChange={imageChangeHandler}
                            fileList={imageList.file.value}
                            beforeUpload={(f) => imageValidation(f, "image", "/plants/create", "post", setLoading, () => {}, "")}
                          >
                            {imageList.file.value.length >= 1 ? null : uploadButton(loading)}
                          </Upload>
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
              <div className="header-dashboard m-t-40 mb0">
                <h2 className="h2 bold mb0">Plant List</h2>
              </div>

              <Form layout="vertical">
                <Row gutter={[20, 20]}>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item className="">
                      <Input
                        size="large"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="Search plant"
                        prefix={<i className="far fa-search text-grey" />}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item className="">
                      <Space className="space-w-100 w-100">
                        <span>Difficulty: </span>
                        <Select 
                          size="large"
                          className="w-100"
                          placeholder="Difficulty"
                          value={difficulty}
                          onChange={val => setDifficulty(val)}
                        >
                          <Select.Option value="">All</Select.Option>
                          <Select.Option value="easy">Easy</Select.Option>
                          <Select.Option value="medium">Medium</Select.Option>
                          <Select.Option value="hard">Hard</Select.Option>
                        </Select>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              <AnimatePresence>
                {plants && plants.data && plants.data.length > 0 ? (
                  <Row gutter={[20, 20]}>
                      {plants && plants.data && plants.data.length > 0 && plants.data.map(plant => (
                        <Col xl={6} lg={8} md={8} sm={12} xs={12} key={plant.plants_id}>
                          <PlantCard 
                            plant={plant} 
                            onGetEditData={() => onGetEditData(plant)}
                            onShowModal={() => setShowModal(!showModal)}
                            onDeleteHandler={() => onDeleteHandler(plant.plants_id)}
                          />
                        </Col>
                      ))}
                    <Col xl={24} lg={24} md={24} sm={24}>
                      <div className="text-center m-t-20 m-b-20">
                        <Pagination 
                          total={plants.total} 
                          goTo={val => setPage(val)} 
                          current={page} 
                          hideOnSinglePage 
                          pageSize={per_page}
                        />
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: ".2" }}
                  >
                    <Empty className="m-t-150 m-b-150" description={<span className="text-grey">No Result</span>} /> 
                  </motion.div>
                )}
              </AnimatePresence>

            </Col>
          </Row>

        </Layout.Content>
      </Layout>

      <Modal
        centered
        visible={showModal}
        zIndex={3000}
        width={416}
        closable={false}
        footer={null}
        className="modal-modif noselect text-center"
        closeIcon={<i className="fas fa-times" />}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        <div className="text-dark">
          <h3 className="mb-3 h3 bold">Delete plant?</h3>
          <p className="text-grey-2 fs-16 mb-3">Bayam</p>
          <p className="text-grey-2">Plant deletion cannot be undone</p>

          <Space>
            <Button className="btn-white" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="primary" danger onClick={() => setShowModal(false)}>Delete</Button>
          </Space>
        </div>
      </Modal>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ".2" }}
            className="overlay-blur"
          />
        )}
      </AnimatePresence>

      <style jsx>{pageStyle}</style>
      <style jsx>{addPlantStyle}</style>
    </>
  )
}

AddPlants.getInitialProps = async ctx => {
  let res = await axios.get(`/plants/all-plants?page=1&per_page=${per_page}`)
  ctx.store.dispatch(actions.getPlantSuccess(res.data))
}

export default withAuth(AddPlants)
