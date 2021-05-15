import { motion } from "framer-motion";
import { Joystick } from "react-joystick-component";
import { Modal, Image as AntImage } from "antd";

import Image from "next/image";

const Loader1 = "/static/images/loader-1.gif";

const ModalLiveCam = ({ visible, onClose, image, onMove, onStart, onStop }) => {
  return(
    <>
      <Modal
        centered
        title={<b>Plant Camera</b>}
        zIndex="1030"
        width={700}
        footer={null}
        maskClosable={false}
        visible={visible}
        bodyStyle={{ paddingTop: "0px" }}
        className="modal-modif noselect"
        onCancel={onClose}
        closeIcon={<i className="fas fa-times" />}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        {image == "" ? (
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Image width={100} height={100} src={Loader1} alt="loader" />
            <div className="fs-14 m-b-10">Connecting to camera...</div>
          </motion.div>
        ) : (
          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center live-img">
              <AntImage src={image} width={640} height={480} preview={false} />
            </div>
            <div className="joystick-container">
              <Joystick
                size={90}
                throttle={100}
                move={onMove}
                start={onStart}
                stop={onStop}
                baseColor="#00000057"
                stickColor="#0000008a"
              />
            </div>
          </motion.div>
        )}
      </Modal>
    </>
  )
}

export default ModalLiveCam
