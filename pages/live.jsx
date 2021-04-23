import { Image, Button, Modal, Space } from 'antd'
import { motion } from "framer-motion"
import { Joystick } from 'react-joystick-component'
import { useState, useEffect, useRef } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import nookies from 'nookies'

import generatePDF from "lib/reportGenerator";

// let ws = new WebSocket(`ws://localhost:9898/ws`)
const ws = new W3CWebSocket(`ws://192.168.18.37:8000/dashboard/ws`)

const dataSource = [ { key: 0.19777277608656285, report: { sh: "29", tds: "958", ldr: "570", ta: "81", ph: "9.30" }, }, { key: 0.8150942087462312, report: { sh: "30", tds: "881", ldr: "548", ta: "91", ph: "8.72" }, }, { key: 0.5210355778665618, report: { sh: "27", tds: "870", ldr: "592", ta: "86", ph: "11.50" }, }, { key: 0.8165505380731397, report: { sh: "28", tds: "949", ldr: "506", ta: "76", ph: "8.38" }, }, { key: 0.07374130493711961, report: { sh: "28", tds: "870", ldr: "568", ta: "96", ph: "9.52" }, }, { key: 0.4687208647341543, report: { sh: "28", tds: "913", ldr: "538", ta: "93", ph: "13.13" }, }, { key: 0.5665714778124649, report: { sh: "29", tds: "835", ldr: "571", ta: "71", ph: "11.11" }, }, { key: 0.30834060088598214, report: { sh: "28", tds: "834", ldr: "505", ta: "85", ph: "12.59" }, }, { key: 0.7151410357998422, report: { sh: "29", tds: "900", ldr: "510", ta: "91", ph: "10.93" }, }, { key: 0.13392430164420221, report: { sh: "27", tds: "878", ldr: "522", ta: "80", ph: "9.74" }, }, { key: 0.04448957640096296, report: { sh: "29", tds: "808", ldr: "562", ta: "77", ph: "15.79" }, }, { key: 0.46947968474652146, report: { sh: "27", tds: "983", ldr: "561", ta: "74", ph: "13.89" }, }, { key: 0.8939867673632909, report: { sh: "29", tds: "886", ldr: "503", ta: "98", ph: "11.72" }, }, { key: 0.9273474416398337, report: { sh: "30", tds: "941", ldr: "546", ta: "92", ph: "11.64" }, }, { key: 0.6173171154653958, report: { sh: "29", tds: "960", ldr: "510", ta: "76", ph: "12.09" }, }, ];

const max_width_height = 90
const LiveCam = () => {
  const constraintsRef = useRef(null)

  const [image, setImage] = useState("")
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

            <button
              className="btn btn-primary"
              onClick={() => generatePDF(dataSource)}
            >
              Generate monthly report
            </button>
        
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
