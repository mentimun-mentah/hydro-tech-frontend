import { Image } from 'antd'
import { useState, useEffect } from 'react'
import { Joystick } from 'react-joystick-component'
import { w3cwebsocket as W3CWebSocket } from 'websocket'


const LiveCam = () => {
  const [wsClient, setWsClient] = useState()
  const [position, setPosition] = useState({})

  const { vertical, horizontal } = position


  const onJoyStickMoved = ({ x, y }) => {
    setPosition({ vertical: y*4, horizontal: x*4 })
  }

  useEffect(() => {
    const wsConnect = () => {
      const ws = new W3CWebSocket(`ws://192.168.18.81:8000/ws`)
      console.log(ws)
      setWsClient(ws)
      ws.onopen = () => ws.send("Connected")

      ws.onclose = e => {
        console.log('Disconected.\nReconnect will be attempted in 1 second.', e.reason);
        setTimeout(() => {
          wsConnect();
        }, 1000);
      };
    }
    wsConnect()
  }, [])

  useEffect(() => {
    let v = vertical
    let h = horizontal
    if(vertical < 0) v = Math.abs(v)
    if(vertical > 0) v = 0
    if(horizontal < 0) h = 0
    const data = `kind:set_value_servo,sh:${h},sv:${v}`
    if(wsClient && wsClient.send) {
      wsClient.send(data)
      console.log(data)
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
