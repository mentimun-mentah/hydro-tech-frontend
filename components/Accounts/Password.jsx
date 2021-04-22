import { useState } from 'react'
import { withAuth } from 'lib/withAuth'
import { LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Form, Input, Row, Col, Modal } from 'antd'

import { jsonHeaderHandler, signature_exp, formErrorMessage } from 'lib/axios'
import { formConfigPassword, formVerifyPassword, formConfigPasswordIsValid, formVerifyPasswordIsValid } from 'formdata/configPassword'

import axios from 'lib/axios'
import isIn from 'validator/lib/isIn'
import * as actions from 'store/actions'
import ErrorMessage from 'components/ErrorMessage'

const PasswordContainer = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)

  const isUpdate = user !== null ? user.password : false

  const [loading, setLoading] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formPassword, setFormPassword] = useState(formConfigPassword)
  const [verifyPassword, setVerifyPassword] = useState(formVerifyPassword)

  const { verify_password } = verifyPassword
  const { old_password, password, confirm_password } = formPassword

  /* INPUT CHANGE FUNCTION */
  const onChangeHandler = e => {
    const name = e.target.name
    const value = e.target.value
    const data = {
      ...formPassword,
      [name]: {
        ...formPassword[name],
        value: value, isValid: true, message: null,
      },
    };
    setFormPassword(data)
  }

  const onVerifyChangeHandler = e => {
    const value = e.target.value
    const data = {
      ...verifyPassword,
      verifyPassword: {
        ...verifyPassword["verify_password"],
        value: value, isValid: true, message: null,
      },
    };
    setVerifyPassword(data)
  }
  /* INPUT CHANGE FUNCTION */

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.persist()
    if(formConfigPasswordIsValid(formPassword, setFormPassword, isUpdate)) {
      setLoading(true)
      let url = "/users/add-password"
      let method = "post"
      let data = {
        password: password.value,
        confirm_password: confirm_password.value,
      }

      if(isUpdate) {
        data = { ...data, old_password: old_password.value }
        url = "/users/update-password"
        method = "put"
      }

      axios[method](url, data, jsonHeaderHandler())
        .then((res) => {
          setLoading(false);
          setFormPassword(formConfigPassword)
          formErrorMessage("success", res.data.detail)
        })
        .catch((err) => {
          setLoading(false);
          const errDetail = err.response.data.detail;
          const freshRequired = "Fresh token required";
          if (typeof errDetail === "string" && errDetail === freshRequired) {
            setShowConfirmPassword(true);
          }
          else if (typeof errDetail === "string" && errDetail) {
            const state = JSON.parse(JSON.stringify(formPassword));
            if(isUpdate){
              state.old_password.value = state.old_password.value;
              state.old_password.isValid = false;
              state.old_password.message = errDetail;
              setFormPassword(state);
            } else {
              state.password.value = state.password.value;
              state.password.isValid = false;
              state.password.message = errDetail;
              setFormPassword(state);
            }
          } else {
            const state = JSON.parse(JSON.stringify(formPassword));
            errDetail.map((data) => {
              const key = data.loc[data.loc.length - 1];
              if (state[key]) {
                state[key].value = state[key].value;
                state[key].isValid = false;
                state[key].message = data.msg;
              }
            });
            setFormPassword(state);
          }
        })
      console.log(JSON.stringify(data, null, 2))
    }
  }

  return (
    <>
      <Form layout="vertical">
        <Row gutter={[20, 20]}>
          {isUpdate && (
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item 
                className="mb0"
                label="Old Password"
                validateStatus={!old_password.isValid && old_password.message && "error"}
              >
                <Input.Password
                  size="large"
                  name="old_password"
                  placeholder="Old Password"
                  value={old_password.value}
                  onChange={onChangeHandler}
                />
                <ErrorMessage item={old_password} />
              </Form.Item>
            </Col>
          )}
          <Col lg={24} md={24} sm={24} xs={24}>
            <Form.Item 
              className="mb0"
              label="Password"
              validateStatus={!password.isValid && password.message && "error"}
            >
              <Input.Password
                size="large"
                name="password"
                placeholder="Password"
                value={password.value}
                onChange={onChangeHandler}
              />
              <ErrorMessage item={password} />
            </Form.Item>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Form.Item 
              className="mb0"
              label="Confirmation Password"
              validateStatus={!confirm_password.isValid && confirm_password.message && "error"}
            >
              <Input.Password
                size="large"
                name="confirm_password"
                placeholder="Confirmation Password"
                value={confirm_password.value}
                onChange={onChangeHandler}
              />
              <ErrorMessage item={confirm_password} />
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item className="mb0">
              <Button size="large" block type="primary" onClick={onSubmitHandler}>
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Modal
        centered
        title={<b>Confirm Password</b>}
        width={500}
        zIndex="1030"
        footer={null}
        maskClosable={false}
        className="modal-modif"
        visible={showConfirmPassword}
        bodyStyle={{paddingTop: "0px"}}
        closeIcon={<i className="fas fa-times" />}
        maskStyle={{backgroundColor: "rgba(0, 0, 0, 0.45)"}}
        onOk={() => setShowConfirmPassword(false)}
        onCancel={() => setShowConfirmPassword(false)}
      >
        <p className="text-muted fs-12-s">
          Enter your current password to confirm changing your password.
        </p>
        <Form layout="vertical">
          <Form.Item 
            className="mb0"
            label="Password"
            validateStatus={!verify_password.isValid && verify_password.message && "error"}
          >
            <Input.Password
              size="large"
              name="password"
              placeholder="Password"
              value={verify_password.value}
              onChange={onVerifyChangeHandler}
            />
            <ErrorMessage item={verify_password} />
          </Form.Item>
        </Form>
      </Modal>

      <AnimatePresence>
        {showConfirmPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ".2" }}
            className="overlay-blur"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default withAuth(PasswordContainer)
