import { useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { Modal, Button, Form, Card, Divider, Input, Typography } from 'antd'

import { deepCopy, enterPressHandler } from 'lib/utility'
import { formConfirmPassword, formConfirmPasswordIsValid } from 'formdata/configPassword'

import ErrorMessage from 'components/ErrorMessage'

const TokenContainer = () => {
  const [loading, setLoading] = useState(false)
  const [formPassword, setFormPassword] = useState(formConfirmPassword)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password } = formPassword
  
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
  /* INPUT CHANGE FUNCTION */

  /* SUBMIT FORM FUNCTION */
  const onSubmitHandler = e => {
    e.persist()
    if(formConfirmPasswordIsValid(formPassword, setFormPassword)){
      const data = { password: password.value }
      console.log(data)
      onCloseConfirmPassword()
    }
  }
  /* SUBMIT FORM FUNCTION */

  const onCloseConfirmPassword = () => {
    setFormPassword(formConfirmPassword)
    setShowConfirmPassword(false)
  }

  return (
    <>
      <h1 className="fs-16 bold">IoT Token</h1>
      <p className="mb-0">This is your IoT Token, your personal password for the Hydro X Tech API. Keep it safe!</p>

      <Divider />

      <Card className="card-token">
        <Typography.Paragraph className="m-b-0 text-danger force-select">
          d0c1c39f8604a6fb7ebf2b76b17b8285
        </Typography.Paragraph>
      </Card>

      <Divider />

      <h2 className="fs-14 bold m-b-0">Tips:</h2>
      <p>If you feel that your Token is already known to other people, please change your Token using the button below.</p>
      <Button type="primary" onClick={() => setShowConfirmPassword(true)}>Generate Token</Button>

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
        afterClose={() => setFormPassword(formPassword)}
        maskStyle={{backgroundColor: "rgba(0, 0, 0, 0.45)"}}
      >
        <p className="m-b-0">
          Enter your password to confirm changing your IoT Token.
        </p>
        <p>
          <b>Note: </b>
          The old IoT Token doesn't work if you change the Token.
        </p>
        <p className="fs-14 m-b-0"><b>Old Token:</b></p>
        <p className="text-danger">d0c1c39f8604a6fb7ebf2b76b17b8285</p>
        <Form layout="vertical" onKeyUp={e => enterPressHandler(e, onSubmitHandler)}>
          <Form.Item 
            label="Password"
            className="m-b-15"
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
          <Form.Item className="mb0">
            <Button size="large" block type="primary" onClick={onSubmitHandler}>
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
      `}</style>
    </>
  )
}

export default TokenContainer
