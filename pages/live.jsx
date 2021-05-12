import { useState } from 'react'
import dynamic from 'next/dynamic'

const ReactNipple = dynamic(() => import('react-nipple'), { ssr: false })

const MIN = 0
const MAX = 180
const DELAY = 100
const Live = () => {

  const [joyStatus, setJoyStatus] = useState("end")
  const [position, setPosition] = useState({ x: 90, y: 90 })
  const [direction, setDirection] = useState({})

  const { x, y } = position

  // horizontal x
  const onUp = () => {
    const data = { ...position, x: x + 2 }
    if(x < MAX) {
      setTimeout(() => {
        setPosition(data)
      }, DELAY)
    }
  }
  const onDown = () => {
    const data = { ...position, x: x - 2 }
    if(x > MIN) {
      setTimeout(() => {
        setPosition(data)
      }, DELAY)
    }
  }
  const onLeft = () => {
    const data = { ...position, y: y - 2 }
    if(y > MIN) {
      setTimeout(() => {
        setPosition(data)
      }, DELAY)
    }
  }
  const onRight = () => {
    const data = { ...position, y: y + 2 }
    if(y < MAX) {
      setTimeout(() => {
        setPosition(data)
      }, DELAY)
    }
  }

  const onMove = (_, { direction, distance, force }) => {
    if(direction) {
      setDirection(direction)

      switch (direction.angle) {
        case "up":
          return onUp()
        case "down":
          return onDown()
        case "left":
          return onLeft()
        case "right":
          return onRight()
        default: 
          return setPosition(position)
      }

    }

    console.log("direction ->", direction && direction.angle)
    console.log("distance ->", distance + "\n" + "force ->", force)
    console.log("direction ->", JSON.stringify(direction, null, 2))
  }

  return(
    <>
      <h1 className="m-b-100">Live</h1>

      <p>{joyStatus}</p>
      <p>x: {position.x}</p>
      <p>y: {position.y}</p>

      <ReactNipple
        options={{
          color: "blue",
          mode: "static",
          position: { top: "50%", left: "50%" }
        }}
        style={{
          outline: "1px dashed red",
          width: 180,
          height: 180,
          position: "relative"
        }}
        onMove={onMove}
        onEnd={(e) => setJoyStatus(e.type)}
        onStart={(e) => setJoyStatus(e.type)}
        onShown={e => console.log(e)}
      />

      <pre>
        {JSON.stringify(direction, null, 2)}
      </pre>
    </>
  )
}

export default Live
