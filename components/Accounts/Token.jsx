import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { Modal, Button, Form, Card, Divider, Input, Typography } from 'antd'

import { deepCopy, enterPressHandler } from 'lib/utility'
import { jsonHeaderHandler, signature_exp, formErrorMessage } from 'lib/axios'
import { formVerifyPassword, formVerifyPasswordIsValid } from 'formdata/configPassword'

import axios from 'lib/axios'
import ErrorMessage from 'components/ErrorMessage'


const TokenContainer = () => {
  const settingUsers = useSelector(state => state.settingUsers)

  const [iotToken, setIotToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [verifyPassword, setVerifyPassword] = useState(formVerifyPassword)

  const { verify_password } = verifyPassword
  
  /* INPUT CHANGE FUNCTION */
  const onVerifyChangeHandler = e => {
    const value = e.target.value
    const data = {
      ...verifyPassword,
      verify_password: {
        ...verifyPassword["verify_password"],
        value: value, isValid: true, message: null,
      },
    };
    setVerifyPassword(data)
  }
  /* INPUT CHANGE FUNCTION */

  const onUpdateTokenHandler = token => {
    const data = {
      token: token
    }
    axios.put('/setting-users/change-token', data, jsonHeaderHandler())
      .then(res => {
        formErrorMessage("success", res.data.detail)
      })
      .catch(err => {
        setLoading(false)
        const errDetail = err.response.data.detail;
        if(errDetail == signature_exp) {
          formErrorMessage("success", "Successfully change the user token.")
        }
        else if(typeof(errDetail) === "string" && errDetail !== signature_exp) {
          formErrorMessage("error", errDetail)
        }
        else {
          formErrorMessage("error", "Something was wrong!")
        }
      })
  }

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.persist()
    setLoading(true)
    axios.post("/users/create-iot-token", null, jsonHeaderHandler())
      .then(res => {
        setLoading(false)
        setIotToken(res.data.token)
        onUpdateTokenHandler(res.data.token)
      })
      .catch(err => {
        setLoading(false)
        const errDetail = err.response.data.detail;
        const freshRequired = "Fresh token required";
        if(typeof errDetail === "string" && errDetail === freshRequired) {
          setShowConfirmPassword(true)
        }
      })
  }

  const submitVerifyPassword = e => {
    e.persist()
    if(formVerifyPasswordIsValid(verifyPassword, setVerifyPassword)){
      setLoading(true)
      const data = { password: verify_password.value }
      axios.post("/users/fresh-token", data, jsonHeaderHandler())
        .then(() => {
          setLoading(true)
          onSubmitHandler(e)
          setShowConfirmPassword(false)
          setVerifyPassword(formVerifyPassword)
        })
        .catch(err => {
          const state = deepCopy(verifyPassword)
          const errDetail = err.response.data.detail;
          if(typeof errDetail === "string" && errDetail === signature_exp) {
            axios.post("/users/fresh-token", data, jsonHeaderHandler())
              .then(() => {
                setLoading(true)
                onSubmitHandler(e)
                setShowConfirmPassword(false)
                setVerifyPassword(formVerifyPassword)
              })
          }
          if(typeof errDetail === "string" && errDetail !== signature_exp) {
            setLoading(false);
            state.verify_password.value = state.verify_password.value;
            state.verify_password.isValid = false;
            state.verify_password.message = errDetail;
          } 
          if(typeof errDetail !== "string") {
            setLoading(false);
            errDetail.map((data) => {
              let key = data.loc[data.loc.length - 1] === "password" ? "verify_password" : "verify_password";
              if(state[key]) {
                state[key].value = state[key].value;
                state[key].isValid = false;
                state[key].message = data.msg;
              }
            });
          }
          setVerifyPassword(state);
        })
    }
  }
  /* SUBMIT FORM FUNCTION */

  const onCloseConfirmPassword = () => {
    setVerifyPassword(formVerifyPassword)
    setShowConfirmPassword(false)
  }

  useEffect(() => {
    if(settingUsers && settingUsers.mySetting) {
      setIotToken(settingUsers.mySetting.setting_users_token)
    }
  }, [settingUsers])

  return (
    <>
      <h1 className="fs-16 bold">IoT Token</h1>
      <pre></pre>
      {iotToken ? (
        <>
          <p className="mb-0">This is your IoT Token, your personal password for the Hydro X Tech API. Keep it safe!</p>

          <Divider />

          <Card className="card-token">
            <Typography.Paragraph className="m-b-0 text-danger force-select overflow-wrap-anywhere">
              {iotToken}
            </Typography.Paragraph>
          </Card>

          <Divider />

          <h2 className="fs-14 bold m-b-0">Tips:</h2>
          <p>If you feel that your Token is already known to other people, please change your Token using the button below.</p>
          <h2 className="fs-14 bold m-b-0">Note:</h2>
          <p>The old IoT Token doesn't work if you change the Token.</p>
        </>
      ) : (
        <p className="mb-0">It looks like you don't have an IoT Token, please press this button to generate a new token</p>
      )}

      <Button type="primary" onClick={onSubmitHandler}>Generate Token</Button>

      <Modal
        centered
        title={<b>Confirm Change</b>}
        width={500}
        zIndex="1030"
        footer={null}
        maskClosable={false}
        className="modal-modif"
        visible={showConfirmPassword}
        bodyStyle={{paddingTop: "0px"}}
        closeIcon={<i className="fas fa-times" />}
        onOk={onCloseConfirmPassword}
        onCancel={onCloseConfirmPassword}
        afterClose={() => setVerifyPassword(formVerifyPassword)}
        maskStyle={{backgroundColor: "rgba(0, 0, 0, 0.45)"}}
      >
        {iotToken ? (
          <>
            <p className="m-b-0">
              Enter your password to confirm changing your IoT Token.
            </p>
            <p>
              <b>Note: </b>
              The old IoT Token doesn't work if you change the Token.
            </p>
            <p className="fs-14 m-b-0"><b>Old Token:</b></p>
            <p className="text-danger">{iotToken}</p>
          </>
        ) : (
          <p className="m-b-0">
            Enter your password to generate your IoT Token.
          </p>
        )}
        <Form layout="vertical" onKeyUp={e => enterPressHandler(e, submitVerifyPassword)}>
          <Form.Item 
            label="Password"
            className="m-b-15"
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
          <Form.Item className="mb0">
            <Button size="large" block type="primary" onClick={submitVerifyPassword}>
              {showConfirmPassword && loading ? <LoadingOutlined /> : "Change Token"}
            </Button>
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

      <style jsx>{`
        :global(.card-token) {
          margin: 0 auto;
          width: fit-content;
          border-radius: .5rem;
          background-color: var(--light);
        }
        :global(.card-token .ant-card-body) {
          padding: 5px 10px;
        }
        :global(.overflow-wrap-anywhere) {
          overflow-wrap: anywhere;
        }
      `}</style>
    </>
  )
}

export default TokenContainer
