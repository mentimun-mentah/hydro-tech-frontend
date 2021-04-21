import React from 'react'
import './style.css'

/**
 * @class Joystick
 *
 * @classdesc Provides graphical interface for directional temporary X & Y coordinate input.
 *
 * @property {number}  width               - Width of joystick body (full element width) [ Default: 200 ]
 * @property {number}  knobWidth           - Width of joystick knob [ Default: 50 ]
 * @property {string}  backgroundColor     - Background color of Joystick base
 * @property {string}  knobColor           - Background color of Joystick knob
 * @property {string}  borderColor         - Color of joystick base border
 * @property {string}  knobBorderColor     - Color of joystick knob border
 * @property {number}  borderWidth         - Width of joystick base border [ Default: 2 ]
 * @property {number}  knobBorderWidth     - Width of joystick knob border [ Default: 1 ]
 * @property {boolean}  noBorder           - Boolean property for enabling/disabling joystick and knob borders [ Default: false ]
 * @property {boolean}  persistOnExit      - Boolean property for whether joystick should release on mouse/touch exit from window [ Default: true ]
 * @property {boolean}  invertY            - Boolean property for whether joystick should have inverted Y Access [ Default: false ]
 * @property {function}  onActivity        - The function to be run when coordinates change; Function will receive object with coords & intensity props (each including x,y props)
 * @property {ref}     ref                 - React ref handle (React.createRef())
 *
 * @author Eric Nail
 */

class Joystick extends React.Component {
  constructor(props) {
    super(props)
    this.joystick = React.createRef()
    this.state = {
      pos: { x:0, y:0 },
      dragging: false
    }
    this.properties = {
      backgroundColor:props.color||'#dfdfdf',
      knobColor:props.knobColor||'#bfbfbf',
      borderColor:props.borderColor||'#c5c5c5',
      knobBorderColor:props.knobBorderColor||'rgba(255,255,255,0.85)',
      borderWidth:props.borderWidth||2,
      knobBorderWidth:props.knobBorderWidth||1,
      width:props.width||200,
      height:props.width||200,
      knobWidth:props.knobWidth||50,
      radius:(props.width/2)||100,
      knobRadius:(props.knobWidth/2)||25
    }
    this.onActivity = props.onActivity||null
    this.differential = (this.properties.radius - this.properties.knobRadius)
  }

  dragStart = e => {
    e.stopPropagation()
    this.setState({ dragging:true })
  }

  dragEnd = e => {
    e.stopPropagation()
    if (this.onActivity) { this.onActivity({ position:{ x:0, y:0 }, intensity:{ x:0, y:0 } }) }
    this.setState({ dragging:false, pos:{ x:0,y:0 } })
  }

  extractCoords = evnt => {
    let touch = evnt.changedTouches || evnt.originalEvent && evnt.originalEvent.touches || evnt.originalEvent && evnt.originalEvent.changedTouches
    return touch ? { x:touch.clientX, y:touch.clientY }:{ x:evnt.clientX, y:evnt.clientY }
  }

  onMove = e => {
    let { radius, knobWidth } = this.properties
    if (!this.state.dragging) { return }
    let coords = this.extractCoords(e)
    let bounds = this.joystick.current.getBoundingClientRect()
    let pos = {
      x:((coords.x-bounds.left)-((radius/2)*2)),
      y:((coords.y-bounds.top)-((radius/2)*2))
    }
    let vector = Math.sqrt(pos.x * pos.x + pos.y * pos.y)
    if (vector > radius-(knobWidth/2)) {
      pos.x /= vector
      pos.y /= vector
      pos.x *= radius-(knobWidth/2)
      pos.y *= radius-(knobWidth/2)
    }
    coords = this.props.invertY ? pos:{ x:pos.x, y:pos.y-(pos.y*2) }
    let diff = {
      x:coords.x >= 0 ? coords.x/this.differential:(coords.x/this.differential),
      y:coords.y >= 0 ? coords.y/this.differential:(coords.y/this.differential)
    }
    if (this.onActivity) { this.onActivity({ position:coords, intensity:diff }) }
    this.setState({ pos })
  }

  render() {
    let { pos, dragging } = this.state
    let { noBorder, persistOnExit } = this.props
    let { width, height, knobWidth, backgroundColor, knobColor, borderColor, knobBorderColor, borderWidth, knobBorderWidth } = this.properties
    return (
      <div ref={this.joystick} style={{ border:noBorder ? 'none':`${borderWidth}px solid ${borderColor}`, background:backgroundColor, width, height }} className='joystick'>
        <div className={`joystick-touchable${dragging?' active':''}`} onTouchMove={this.onMove} onMouseMove={this.onMove} onMouseOut={!persistOnExit && this.dragEnd} onTouchEnd={this.dragEnd} onMouseUp={this.dragEnd}></div>
        <div
          className={`knob uk-box-shadow-small`}
          style={{
            width:knobWidth,
            height:knobWidth,
            left:`calc(50% - ${knobWidth/2}px)`,
            top:`calc(50% - ${knobWidth/2}px)`,
            border:noBorder ? 'none':`${knobBorderWidth}px solid ${knobBorderColor}`,
            background:knobColor,
            cursor:dragging?'none':'default',
            transform:`translate3d(${pos.x}px,${pos.y}px,0)`,
          }}
          onTouchStart={this.dragStart}
          onMouseDown={this.dragStart}
        />
      </div>
    )
  }
}

export default Joystick
