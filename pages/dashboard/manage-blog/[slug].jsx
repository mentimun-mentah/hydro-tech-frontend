import Router, { useRouter } from 'next/router'
import { withAuth } from "lib/withAuth";
import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Layout, Card, Row, Col, Form, Button, Input, Upload } from 'antd'

import { deepCopy } from 'lib/utility'
import { formBlog, formDescription, formBlogIsValid } from 'formdata/blog'
import { formImage } from 'formdata/image'
import { imageValidation, imagePreview, uploadButton } from 'lib/imageUploader'
import { formHeaderHandler, formErrorMessage, signature_exp, resNotification } from 'lib/axios'

import _ from 'lodash'
import axios from 'lib/axios'
import dynamic from 'next/dynamic'
import isIn from 'validator/lib/isIn'
import ErrorMessage from 'components/ErrorMessage'
import pageStyle from 'components/Dashboard/pageStyle'
import addPlantStyle from 'components/Dashboard/addPlantStyle'

const Editor = dynamic(import('components/Editor'), { ssr: false })

const ManageBlogSlug = ({ blogData }) => {
  const router = useRouter()

  const [blogId, setBlogId] = useState("")
  const [blog, setBlog] = useState(formBlog)
  const [desc, setDesc] = useState(formDescription)
  const [loading, setLoading] = useState(false)
  const [imageList, setImageList] = useState(formImage)

  const { title } = blog
  const { description } = desc

  useEffect(() => {
    if(blogData) {
      const { blogs_id, blogs_title, blogs_image, blogs_description } = blogData
      const stateBlog = deepCopy(blog)
      const stateDesc = deepCopy(desc)

      setBlogId(blogs_id)

      if(blogs_image) {
        const imageData = {
          uid: -Math.abs(Math.random()),
          url: `${process.env.NEXT_PUBLIC_API_URL}/static/blogs/${blogs_image}`
        }
        const data = {
          ...imageList,
          file: {value: [imageData], isValid: true, message: null}
        }
        setImageList(data)
      }

      stateBlog["title"].value = blogs_title
      stateDesc["description"].value = blogs_description

      setBlog(stateBlog)
      setDesc(stateDesc)
    }
  }, [blogData])

  /* INPUT CHANGE FUNCTION */
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const data = {
      ...blog,
      [name]: { ...blog[name], value: value, isValid: true, message: null }
    }
    setBlog(data)
  }

  const onDescChangeHandler = val => {
    const data = {
      ...desc,
      description: { ...desc.description, value: val, isValid: true, message: null }
    }
    setDesc(data)
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

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.preventDefault()
    if(formBlogIsValid(blog, setBlog, desc, setDesc)) {
      const formData = new FormData()
      formData.append("title", title.value)
      formData.append("description", description.value)
      _.forEach(imageList.file.value, file => {
        if(!file.hasOwnProperty('url')){
          formData.append('image', file.originFileObj)
        }
      })

      setLoading(true)
      axios.put(`/blogs/update/${blogId}`, formData, formHeaderHandler())
        .then(res => {
          setLoading(false)
          resetInputField()
          setDesc(formDescription)
          resNotification("success", "Success", res.data.detail)
          router.replace('/dashboard/manage-blog')
        })
        .catch(err => {
          setLoading(false)
          const state = deepCopy(blog)
          const stateDesc = deepCopy(desc)
          const errDetail = err.response.data.detail;
          const errName = ["The name has already been taken.", "Nama sudah dipakai."]
          if(errDetail == signature_exp){
            resetInputField()
            resNotification("success", "Success", "Successfully update the blog.")
            router.replace('/dashboard/manage-blog')
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
              if(key === "image") formErrorMessage("error", "Image " + data.msg)
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
          setBlog(state)
          setDesc(stateDesc)
        })
    }
  }

  const resetInputField = () => {
    setTimeout(() => {
      setBlog(formBlog)
      setImageList(formImage)
      setDesc(formDescription)
    }, 500)
  }

  return(
    <>
      <Layout>
        <Layout.Content>

          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Card className="radius1rem shadow1 h-100 card-add-blog" bordered={false}>
                <div className="header-dashboard">
                  <h2 className="h2 bold">Update Blog</h2>

                  <Form name="AddBlog" layout="vertical">
                    <Row gutter={[20, 20]}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item 
                          label="Photo (750 × 500 px)"
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
                            beforeUpload={(f) => imageValidation(f, "image", `/blogs/update/${blogId}`, "put", setLoading, () => {}, "")}
                          >
                            {imageList.file.value.length >= 1 ? null : uploadButton(loading)}
                          </Upload>
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
        :global(body .card-add-blog) {
          font-weight: normal;
        }
      `}</style>
    </>
  )
}

ManageBlogSlug.getInitialProps = async ctx => {
  const { slug } = ctx.query
  try{
    const res = await axios.get(`/blogs/${slug}`)
    if(res.status == 404){
      process.browser
        ? Router.replace("/dashboard/manage-blog", "/dashboard/manage-blog") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/dashboard/manage-blog" }); //Redirec from Server Side
      !process.browser && ctx.res.end()
    } else {
      return {
        blogData: res.data
      }
    }
  }
  catch (err) {
    const res = await axios.get(`/blogs/${slug}`)
    if(res.status == 404){
      process.browser
        ? Router.replace("/dashboard/manage-blog", "/dashboard/manage-blog") //Redirec from Client Side
        : ctx.res.writeHead(302, { Location: "/dashboard/manage-blog" }); //Redirec from Server Side
      !process.browser && ctx.res.end()
    } else {
      return {
        blogData: res.data
      }
    }
  }
}

export default withAuth(ManageBlogSlug)
