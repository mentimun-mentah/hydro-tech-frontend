import { Image } from 'antd'
import { useState, useEffect, useCallback } from 'react'
import { Joystick } from 'react-joystick-component'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

import nookies from 'nookies'

// let ws = new WebSocket(`ws://localhost:9898/ws`)
const ws = new W3CWebSocket(`ws://192.168.18.81:8000/dashboard/ws`)

const LiveCam = () => {
  const [wsClient, setWsClient] = useState()
  const [position, setPosition] = useState({})

  const { vertical, horizontal } = position

  const onJoyStickMoved = ({ x, y }) => {
    setPosition({ vertical: y*4, horizontal: x*4 })
  }

  useEffect(() => {
    const wsConnect = () => {
      setWsClient(ws)
      ws.onopen = () => { 
        ws.send("Connected"); console.log("WS Connected") 
        nookies.set(null, 'wsReadyState', 1, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        })
      }

      ws.onclose = e => {
        console.log('Disconected.\nReconnect will be attempted in 1 second.', e.reason);
        setTimeout(() => {
          wsConnect();
        }, 1000);
      };
    }
    if(ws.readyState == 3 || ws.readyState == 2 || ws.readyState == 0) {
      wsConnect()
    }
  }, [])

  useEffect(() => {
    let v = vertical
    let h = horizontal
    if(vertical < 0) v = Math.abs(v)
    if(vertical > 0) v = 10
    if(horizontal < 0) h = 10
    const data = `kind:set_value_servo,sh:${h ? h : 10},sv:${v ? v : 10}`
    if(ws && ws.send && ws.readyState !== 0) {
      ws.send(data)
      console.log(data)
    }
    if(ws && ws.onmessage || ws.onclose) {
      ws.onmessage = msg => {
        console.log("message", msg.data)
      }
    }
  }, [position])

  return (
    <>
      <div style={{maxHeight: '100vh', maxWidth: '100vw'}}>
        <div className="joystick-container">
          <Joystick size={90} throttle={100} baseColor="#00000057" stickColor="#0000008a" move={onJoyStickMoved} />
        </div>
      </div>


      <style jsx>{`
        :global(.joystick-container > div) {
          margin-left: auto;
          margin-right: auto;

          margin-bottom: 20px;
        }
      `}</style>
    </>
  )
}

export default LiveCam
