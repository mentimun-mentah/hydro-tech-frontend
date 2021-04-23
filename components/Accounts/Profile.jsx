import { withAuth } from 'lib/withAuth'
import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Upload, Button, Form, Space, Divider, Input, Row, Col, Select } from 'antd'

import { deepCopy } from 'lib/utility'
import { formImage } from 'formdata/image'
import { imageValidation } from 'lib/imageUploader'
import { formProfile, formProfileIsValid } from 'formdata/profile'
import { jsonHeaderHandler, signature_exp, formErrorMessage } from 'lib/axios'

import axios from 'lib/axios'
import isIn from 'validator/lib/isIn'
import * as actions from 'store/actions'
import ErrorMessage from 'components/ErrorMessage'

const genderList = [{value: 'Laki-laki', label: 'Male'}, {value: 'Perempuan', label: 'Female'}, {value: 'Lainnya', label: 'Other'}]

const ProfileContainer = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)

  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(formImage)
  const [profile, setProfile] = useState(formProfile)
  const [oldData, setOldData] = useState(formProfile)
  const [loadingProfie, setLoadingProfie] = useState(false)

  const oldUsername = oldData.username.value;
  const oldPhone = oldData.phone.value;
  const oldGender = oldData.gender.value;

  const { username, email, phone, gender } = profile

  const saveDisable = (oldUsername === username.value) && (oldPhone === phone.value) && (oldGender === gender.value)

  useEffect(() => {
    if(user){
      const data = {
        ...profile,
        username: { value: user.username, isValid: true, message: null },
        email: { value: user.email, isValid: true, message: null },
        phone: { value: user.phone, isValid: true, message: null },
        gender: { value: user.gender, isValid: true, message: null },
      };
      setProfile(data)
      setOldData(data)

      const avatarData = {
        file: { 
          value: [{
            uid: -Math.abs(Math.random()),
            url: `${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${user.avatar}`
          }], 
          isValid: true, message: null 
        },
      }
      setAvatar(avatarData)
    }
  }, [user])

  /* INPUT CHANGE FUNCTION */
  const onChangeHandler = (e, item) => {
    const name = !item && e.target.name
    const value = !item && e.target.value

    if(item) {
      const data = {
        ...profile,
        [item]: { ...profile[item], value: e, isValid: true, message: null, },
      };
      setProfile(data)
    } else {
      const data = {
        ...profile,
        [name]: { ...profile[name], value: value, isValid: true, message: null }
      }
      setProfile(data)
    }
  }
  /* INPUT CHANGE FUNCTION */


  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.preventDefault()
    if(formProfileIsValid(profile, setProfile)) {
      setLoadingProfie(true)
      const data = {
        username: username.value,
        phone: phone.value,
        gender: gender.value
      }
      axios.put('/users/update-account', data, jsonHeaderHandler())
        .then(res => {
          setLoadingProfie(false)
          dispatch(actions.getUser())
          formErrorMessage("success", res.data.detail)
        })
        .catch(err => {
          console.log(err)
          setLoadingProfie(false)
          const state = deepCopy(profile)
          const errDetail = err.response.data.detail
          const errPhone = ["The phone number has already been taken.", "Nomor telepon sudah dipakai orang lain."]
          if(errDetail === signature_exp){
            axios.put('/users/update-account', data, jsonHeaderHandler())
              .then(res => {
                formErrorMessage("success", res.data.detail)
                dispatch(actions.getUser())
              })
              .catch(() => {
                axios.delete("/users/delete-cookies")
              })
          }
          if(typeof errDetail === "string" && isIn(errDetail, errPhone)) {
            state.phone.value = state.phone.value;
            state.phone.isValid = false;
            state.phone.message = errDetail;
          }
          if(typeof errDetail !== "string") {
            errDetail.map((data) => {
              const key = data.loc[data.loc.length - 1]
              if (state[key]) {
                state[key].value = state[key].value;
                state[key].isValid = false;
                state[key].message = data.msg;
              }
            });
          } 
          setProfile(state);
        })
    }
  }
  /* SUBMIT FORM FUNCTION */


  return (
    <>
      <Form layout="vertical">
        <Form.Item label={<b className="fs-16">Avatar</b>}>
          <div className="avatar-section">
            <Space>
              <Upload
                accept="image/*"
                listType="picture-card"
                className="avatar-uploader"
                fileList={avatar.file.value}
                showUploadList={{showRemoveIcon: false, showPreviewIcon: true}}
              >
                {avatar.file.value.length >= 1 && null}
              </Upload>
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={(file) => imageValidation(file, "file", "/users/update-avatar", "put", setLoading, () => dispatch(actions.getUser()), "The image profile has updated.")}
              >
                <Button disabled={loading}>
                  {loading ? <LoadingOutlined /> : "Upload"}
                </Button>
              </Upload>
            </Space>
          </div>
        </Form.Item>

        <Divider />

        <Row gutter={[20, 20]}>
          <Col lg={12} md={24} sm={24} xs={24}>
            <Form.Item 
              label="Username"
              className="mb0"
              validateStatus={!username.isValid && username.message && "error"}
            >
              <Input 
                size="large"
                name="username"
                placeholder="Username"
                value={username.value}
                onChange={onChangeHandler}
              />
              <ErrorMessage item={username} />
            </Form.Item>
          </Col>

          <Col lg={12} md={24} sm={24} xs={24}>
            <Form.Item 
              label="Email" 
              className="mb0"
              validateStatus={!email.isValid && email.message && "error"}
            >
              <Input disabled type="Email" placeholder={email.value} size="large" />
            </Form.Item>
          </Col>

          <Col lg={12} md={24} sm={24} xs={24}>
            <Form.Item 
              label="Phone Number"
              className="mb0"
              validateStatus={!phone.isValid && phone.message && "error"}
            >
              <Input 
                size="large"
                name="phone"
                placeholder="Phone number"
                value={phone.value}
                onChange={onChangeHandler}
              />
              <ErrorMessage item={phone} />
            </Form.Item>
          </Col>

          <Col lg={12} md={24} sm={24} xs={24}>
            <Form.Item
              label="Gender"
              className="mb0"
              validateStatus={!gender.isValid && gender.message && "error"}
            >
              <Select 
                size="large"
                name="gender" 
                className="w-100" 
                placeholder="Choose gender"
                value={gender.value}
                onChange={e => onChangeHandler(e, "gender")}
              >
                {genderList.map(gen => (
                  <Select.Option key={gen.value} value={gen.value}>{gen.label}</Select.Option>
                ))}
              </Select>
              <ErrorMessage item={gender} />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item className="mb0">
              <Button size="large" type="primary" disabled={saveDisable} onClick={onSubmitHandler} style={{ width: 80 }}>
                {loadingProfie ? <LoadingOutlined /> : <b>Save</b>}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default withAuth(ProfileContainer)
