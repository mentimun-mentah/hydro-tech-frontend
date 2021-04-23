import { Image, Button, Modal, Space } from 'antd'
import { motion, useDragControls } from "framer-motion"
import { useDispatch } from 'react-redux'
import { Joystick } from 'react-joystick-component'
import { useState, useEffect, useRef } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import nookies from 'nookies'
import * as actions from 'store/actions'

// let ws = new WebSocket(`ws://localhost:9898/ws`)
const ws = new W3CWebSocket(`ws://192.168.18.37:8000/dashboard/ws`)

const max_width_height = 90
const LiveCam = () => {
  const dragControls = useDragControls()
  const constraintsRef = useRef(null)

  const dispatch = useDispatch()
  const [image, setImage] = useState("")
  const [wsClient, setWsClient] = useState()
  const [tes, settes] = useState({})
  const [position, setPosition] = useState({})

  const { vertical, horizontal } = position

  const onJoyStickMoved = ({ x, y }) => {
    setPosition({ vertical: y*4, horizontal: x*4 })
  }


  const wsConnect = () => {
    // setWsClient(ws)
    ws.onopen = () => { 
      ws.send("Connected"); console.log("WS Connected") 
      nookies.set(null, 'wsReadyState', 1, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
    }

    let urlObject;
    ws.onmessage = msg => {
      console.log("message", msg.data)

      if(urlObject) URL.revokeObjectURL(urlObject)
      urlObject = URL.createObjectURL(new Blob([msg.data]))
      setImage(urlObject)

    }

    ws.onclose = e => {
      console.log('Disconected.\nReconnect will be attempted in 1 second.', e.reason);
      setTimeout(() => {
        wsConnect();
      }, 1000);
    };
  }

  useEffect(() => {
    console.log("mauk")
    if(ws.readyState == 3 || ws.readyState == 2 || ws.readyState == 0) {
      wsConnect()
    }
  }, [ws])

  useEffect(() => {
    let v = vertical
    let h = horizontal
    if(vertical < 0) v = Math.abs(v)
    if(vertical > 0) v = 0
    if(horizontal < 0) h = 0
    const data = `kind:set_value_servo,sh:${h ? h : 0},sv:${v ? v : 0}`
    if(ws && ws.send && ws.readyState !== 0) {
      ws.send(data)
      console.log(data)
    }
  }, [position])

  useEffect(() => {
    return () => {
      if(ws && ws.send && ws.readyState !== 0) {
        ws.send(`kind:live_cam_false`)
      }
    }
  }, [])

  const captureHandler = () => {
    const data = `kind:capture_image`
    if(ws && ws.send && ws.readyState !== 0) {
      ws.send(data)
    }
  }

  const liveCamHandler = () => {
    const data = `kind:live_cam_true`
    if(ws && ws.send && ws.readyState !== 0) {
      ws.send(data)
    }
  }

  const stopLiveCamHandler = () => {
    const data = `kind:live_cam_false`
    if(ws && ws.send && ws.readyState !== 0) {
      ws.send(data)
    }
  }

  const setDataHandler = (e) => {
    // console.log(e)
    let x = e.layerX * 2
    let y = e.layerY * 2
    if(x >= (max_width_height * 2)) x = max_width_height * 2
    if(x <= 0) x = 0
    if(y >= (max_width_height * 2)) y = max_width_height * 2
    if(y <= 0) y = 0

    settes({x: x, y: y})
  }


  return (
    <>
      <p> {JSON.stringify(image)} </p>
      <div style={{maxHeight: '100vh', maxWidth: '100vw'}}>
        <div className="joystick-container">
          <Joystick size={90} throttle={100} baseColor="#00000057" stickColor="#0000008a" move={onJoyStickMoved} />
        </div>

        <div className="text-center m-t-80 display-none">
          <Image width={500} src={image} />
        </div>

        <Space>
          <Button onClick={captureHandler}>Capture</Button>
          <Button onClick={liveCamHandler}>Live</Button>
          <Button onClick={stopLiveCamHandler}>Stop Live</Button>
        </Space>

        <small>
          <pre>{JSON.stringify(tes, null, 2)}</pre>
        </small>


        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
        <div className="example-container">
          <motion.div id="drag-parent" className="drag-area" ref={constraintsRef} />
          <motion.div 
            id="drag-btn"
            drag
            dragElastic={0}
            onDrag={setDataHandler}
            dragMomentum={false} 
            dragConstraints={constraintsRef} 
            whileTap={{ cursor: "grabbing" }}
            style={{cursor: "grab"}}
          />
        </div>
      </div>

      <Modal
        centered
        title={<b>Plant</b>}
        zIndex="1030"
        width={700}
        footer={null}
        maskClosable={false}
        className="modal-modif noselect"
        visible={false}
        bodyStyle={{paddingTop: "0px"}}
        closeIcon={<i className="fas fa-times" />}
        maskStyle={{backgroundColor: "rgba(0, 0, 0, 0.45)"}}
      >
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="drag-container">
            <motion.div className="drag-area" ref={constraintsRef} />
            <motion.div 
              id="drag-btn"
              drag
              dragElastic={0}
              onDrag={setDataHandler}
              dragMomentum={false} 
              dragConstraints={constraintsRef} 
              whileTap={{ cursor: "grabbing", scale: 1.1 }}
              style={{cursor: "grab"}}
              onDirectionLock={axis => console.log(axis)}
            />
          </div>
        </motion.div>
      </Modal>


      <style jsx>{`
        :global(.drag-container) {
          display: flex;
          margin-left: auto;
          margin-right: auto;
          width: ${max_width_height}px;
          height: ${max_width_height}px;
          position: relative;
        }

        :global(.drag-container div#drag-btn) {
          top: calc(50% - 50px / 2);
          left: calc(50% - 50px / 2);
        }

        :global(.drag-container div) {
          background: #0000008a;
          border-radius: 30px;
          width: 50px;
          height: 50px;
          position: absolute;
        }

        :global(.drag-container .drag-area) {
          opacity: 0.2;
          background: #0000008a;
          position: absolute;
          width: ${max_width_height}px;
          height: ${max_width_height}px;
          border-radius: 10px;
        }
      `}</style>
    </>
  )
}

export default LiveCam
