import { motion } from "framer-motion";
import { useState, useEffect } from 'react'
import { Modal, Image as AntImage, Row, Col, Button } from "antd";

import Image from "next/image";

const Loader1 = "/static/images/loader-1.gif";
const TestImage = "/static/images/vga.png";

const ModalConfigCam = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  const onRetake = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return(
    <>
      <Modal
        centered
        title={<b>Plant Camera</b>}
        zIndex="1030"
        width={900}
        footer={null}
        maskClosable={false}
        visible={visible}
        bodyStyle={{ paddingTop: "0px" }}
        className="modal-modif noselect"
        onCancel={onClose}
        closeIcon={<i className="fas fa-times" />}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        {loading ? (
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Image width={100} height={100} src={Loader1} alt="loader" />
            <div className="fs-14 m-b-10">Capturing image...</div>
          </motion.div>
        ) : (
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Row gutter={[10, 10]}>
              <Col span={12}>
                <div className="text-center live-img">
                  <AntImage src={TestImage} preview={false} />
                  <p>Original</p>
                </div>
              </Col>
              <Col span={12}>
                <div className="text-center live-img">
                  <AntImage src={TestImage} preview={false} />
                  <p>Measurement</p>
                </div>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Button type="primary" onClick={onRetake}>Retake</Button>
              </Col>
            </Row>
          </motion.div>
        )}
      </Modal>
    </>
  )
}

export default ModalConfigCam
