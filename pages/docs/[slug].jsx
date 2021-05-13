import { Row, Col, Layout, Divider } from 'antd'

const DetailDocs = () => {
  return(
    <>
      <div className="container-fluid p-b-0 p-t-100">
        <Row gutter={[10, 10]} justify="center">
          <Col xl={22} lg={22} md={24} sm={24} xs={24}>
            <Row gutter={[20, 20]} justify="center">
              <Col xl={16} lg={16} md={20} sm={24} xs={24}>
                  <div className="docs-container">



                    

                    <div>
  <h1>ESP32-CAM Pan and Tilt Video Streaming Web Server (2 Axis)</h1>
  <p><br />
  </p>
  <p>In this project, we’ll attach the ESP32-CAM to a pan and tilt stand with two SG90 servo motors. With a pan and tilt camera stand, you can move the camera up, down, to the left, and the right— this is great for surveillance. The ESP32-CAM hosts a web server that shows video streaming and buttons to control the servo motors to move the camera.</p>
  <div className="se-component se-image-container __se__float-start" contentEditable="false">
    <figure>
      <img src="https://i1.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/04/ESP32-CAM-Pan-Tilt-Video-Streaming-Web-Server.jpg?resize=828%2C466&quality=100&strip=all&ssl=1" alt="" className="wp-image-103043" srcSet="https://i1.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/04/ESP32-CAM-Pan-Tilt-Video-Streaming-Web-Server.jpg?w=1280&quality=100&strip=all&ssl=1 1280w, https://i1.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/04/ESP32-CAM-Pan-Tilt-Video-Streaming-Web-Server.jpg?resize=300%2C169&quality=100&strip=all&ssl=1 300w, https://i1.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/04/ESP32-CAM-Pan-Tilt-Video-Streaming-Web-Server.jpg?resize=1024%2C576&quality=100&strip=all&ssl=1 1024w, https://i1.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/04/ESP32-CAM-Pan-Tilt-Video-Streaming-Web-Server.jpg?resize=768%2C432&quality=100&strip=all&ssl=1 768w" sizes="(max-width: 828px) 100vw, 828px" data-recalc-dims={1} style={{borderRadius: 'inherit'}} data-proportion="true" data-align="start" data-index={1} data-file-name="ESP32-CAM-Pan-Tilt-Video-Streaming-Web-Server.jpg?resize=828%2C466&quality=100&strip=all&ssl=1" data-file-size={0} data-origin=",auto" data-size="," data-rotate data-rotatex data-rotatey data-percentage="auto,auto" />
    </figure>
  </div>
  <div><br />
  </div>
  <p><strong>Boards compatibility:</strong><span>&nbsp;</span>for this project, you need an ESP32 camera development board with<br />
    access to two GPIOs to control two servo motors. You can use:<span>&nbsp;</span><a href="https://makeradvisor.com/esp32-cam-ov2640-camera/" target="_blank" rel="noreferrer noopener" style={{border: '0px', margin: '0px', padding: '0px', backgroundColor: 'transparent', transition: 'color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s', textDecoration: 'none', color: 'rgb(27, 120, 226)'}}>ESP32-CAM AI-Thinker</a>,<span>&nbsp;</span><a href="https://makeradvisor.com/ttgo-t-journal-esp32-camera-board-review/" target="_blank" rel="noreferrer noopener" style={{border: '0px', margin: '0px', padding: '0px', backgroundColor: 'transparent', transition: 'color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s', textDecoration: 'none', color: 'rgb(27, 120, 226)'}}>T-Journal</a><span>&nbsp;</span>or<span>&nbsp;</span><a href="https://makeradvisor.com/ttgo-t-camera-plus-esp32-review-pinout/" target="_blank" rel="noreferrer noopener" style={{border: '0px', margin: '0px', padding: '0px', backgroundColor: 'transparent', transition: 'color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s', textDecoration: 'none', color: 'rgb(0, 0, 0)'}}>TTGO T-Camera Plus.</a></p>
  <h2><u>Parts Required</u></h2>
  <p>For this project, we’ll use the following parts:</p>
  <ul>
    <li><a href="https://makeradvisor.com/tools/esp32-cam-external-antenna/" target="_blank" rel="noreferrer noopener" style={{border: '0px', margin: '0px', padding: '0px', backgroundColor: 'transparent', transition: 'color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s', textDecoration: 'none', color: 'rgb(27, 120, 226)'}}>ESP32-CAM AI-Thinker with external antenna</a></li>
    <li><a href="https://makeradvisor.com/tools/pan-and-tilt-2-servos/" target="_blank" rel="noreferrer noopener" style={{border: '0px', margin: '0px', padding: '0px', backgroundColor: 'transparent', transition: 'color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s', textDecoration: 'none', color: 'rgb(27, 120, 226)'}}>Pan and tilt stand with SG90 servo motors</a></li>
    <li><a href="https://makeradvisor.com/tools/esp32-cam-external-antenna/" target="_blank" rel="noreferrer noopener" style={{border: '0px', margin: '0px', padding: '0px', backgroundColor: 'transparent', transition: 'color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s', textDecoration: 'none', color: 'rgb(27, 120, 226)'}}>Prototyping circuit board (optional)</a></li>
    <li><a href="https://makeradvisor.com/tools/jumper-wires-kit-120-pieces/" target="_blank" rel="noreferrer noopener" style={{border: '0px', margin: '0px', padding: '0px', backgroundColor: 'transparent', transition: 'color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s', textDecoration: 'none', color: 'rgb(27, 120, 226)'}}>Jumper wires</a></li>
  </ul>
  <h2><u>Pan and Tilt Stand and Motors</u></h2>
  <p>For this project, we’ll use a pan and tilt stand that already comes with two SG90 servo motors. The stand is shown in the following figure.</p>
  <div className="se-component se-image-container __se__float-start" contentEditable="false">
    <figure>
      <img src="https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/01/Pan-and-tilt-with-Servo-Motors.jpg?resize=750%2C421&quality=100&strip=all&ssl=1" alt="Pan and Tilt with SG90 Servo Motors ESP32-CAM" className="wp-image-101499" srcSet="https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/01/Pan-and-tilt-with-Servo-Motors.jpg?w=750&quality=100&strip=all&ssl=1 750w, https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/01/Pan-and-tilt-with-Servo-Motors.jpg?resize=300%2C168&quality=100&strip=all&ssl=1 300w" sizes="(max-width: 750px) 100vw, 750px" data-recalc-dims={1} style={{borderRadius: 'inherit'}} data-proportion="true" data-align="start" data-index={2} data-file-name="Pan-and-tilt-with-Servo-Motors.jpg?resize=750%2C421&quality=100&strip=all&ssl=1" data-file-size={0} data-origin=",auto" data-size="," data-rotate data-rotatex data-rotatey data-percentage="auto,auto" />
    </figure>
  </div>
  <div><br />
  </div>
  <p>We got our stand from Banggood, but you can get yours from any other store.</p>
  <ul>
    <li><a href="https://makeradvisor.com/tools/pan-and-tilt-2-servos/" target="_blank" rel="noreferrer noopener" style={{border: '0px', margin: '0px', padding: '0px', backgroundColor: 'transparent', transition: 'color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s', textDecoration: 'none', color: 'rgb(27, 120, 226)'}}>Pan and Tilt stand with two servo motors</a></li>
  </ul>
  <p>Alternatively, you can get<span>&nbsp;</span><a href="https://makeradvisor.com/tools/micro-servo-motor-tool/" target="_blank" rel="noreferrer noopener" style={{border: '0px', margin: '0px', padding: '0px', backgroundColor: 'transparent', transition: 'color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s', textDecoration: 'none', color: 'rgb(27, 120, 226)'}}>two SG90 servo motors</a><span>&nbsp;</span>and 3D print your own stand.</p>
  <p>Servo motors have three wires with different colors:<br />
    <br />
  </p>
  <table>
    <tbody>
      <tr>
        <td>
          <div><strong>Wire</strong><br />
          </div>
        </td>
        <td>
          <div><strong>Color</strong><br />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>Power</div>
        </td>
        <td>
          <div><span style={{backgroundColor: 'rgb(255, 0, 0)', color: 'rgb(241, 241, 241)'}}>Red</span><br />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>GND<br />
          </div>
        </td>
        <td>
          <div><span style={{backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(241, 241, 241)'}}>Black</span> or <span style={{backgroundColor: 'rgb(153, 56, 0)', color: 'rgb(241, 241, 241)'}}>Brown</span><br />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>Signal<br />
          </div>
        </td>
        <td>
          <div><span style={{backgroundColor: 'rgb(255, 228, 0)'}}>Yellow</span>, <span style={{backgroundColor: 'rgb(242, 150, 97)'}}>orange</span> or white</div>
        </td>
      </tr>
    </tbody>
  </table>
  <p />
  <figure>
    <table>
      <tbody>
        <tr>
          <td>
            <div><strong>Wire</strong></div>
          </td>
          <td>
            <div><strong>Color</strong></div>
          </td>
        </tr>
        <tr>
          <td>
            <div><span>Power</span></div>
          </td>
          <td>
            <div>Red</div>
          </td>
        </tr>
        <tr>
          <td>
            <div><span>GND</span></div>
          </td>
          <td>
            <div>Black or brown</div>
          </td>
        </tr>
        <tr>
          <td>
            <div><span>Signal</span></div>
          </td>
          <td>
            <div>Yellow, orange or white</div>
          </td>
        </tr>
      </tbody>
    </table>
  </figure>
  <p />
  <h2><u>How to Control a Servo?</u></h2>
  <p>You can position the servo’s shaft at various angles from 0 to 180º. Servos are controlled using a pulse width modulation (PWM) signal. This means that the PWM signal sent to the motor determines the shaft’s position.</p>
  <div className="se-component se-image-container __se__float-start" contentEditable="false">
    <figure>
      <img src="https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/05/0-180-degrees.png?resize=500%2C199&quality=100&strip=all&ssl=1" alt="ESP32-CAM servo shaft angles from 0 to 180º" className="wp-image-61336" srcSet="https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/05/0-180-degrees.png?w=500&quality=100&strip=all&ssl=1 500w, https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/05/0-180-degrees.png?resize=300%2C119&quality=100&strip=all&ssl=1 300w, https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/05/0-180-degrees.png?resize=250%2C100&quality=100&strip=all&ssl=1 250w" sizes="(max-width: 500px) 100vw, 500px" style={{borderRadius: 'inherit'}} data-proportion="true" data-align="start" data-index={3} data-file-name="0-180-degrees.png?resize=500%2C199&quality=100&strip=all&ssl=1" data-file-size={0} data-origin=",auto" data-size="," data-rotate data-rotatex data-rotatey data-percentage="auto,auto" />
    </figure>
  </div>
  <div><br />
  </div>
  <p>To control the servo motor, you can use the PWM capabilities of the ESP32 by sending a signal with the appropriate pulse width. Or you can use a library to make the code simpler. We’ll be using the<span>&nbsp;</span><strong>ESP32Servo<span>&nbsp;</span></strong>library.</p>
  <h3>Installing the ESP32Servo Library</h3>
  <p>To control servo motors, we’ll use the<span>&nbsp;</span><strong>ESP32Servo<span>&nbsp;</span></strong>library. Make sure you install that library before proceeding. In your Arduino IDE, go to<span>&nbsp;</span><strong>Sketch<span>&nbsp;</span></strong>&gt;<span>&nbsp;</span><strong>Include Library</strong><span>&nbsp;</span>&gt;<span>&nbsp;</span><strong>Manage Libraries</strong>. Search for<span>&nbsp;</span><strong>ESP32Servo<span>&nbsp;</span></strong>and install the library as shown below.</p>
  <div className="se-component se-image-container __se__float-start" contentEditable="false">
    <figure>
      <img src="https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/01/Install-ESP32Servo-Library-Arduino-IDE.png?resize=786%2C443&quality=100&strip=all&ssl=1" alt="Install ESP32Servo Library Arduino IDE" className="wp-image-101500" srcSet="https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/01/Install-ESP32Servo-Library-Arduino-IDE.png?w=786&quality=100&strip=all&ssl=1 786w, https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/01/Install-ESP32Servo-Library-Arduino-IDE.png?resize=300%2C169&quality=100&strip=all&ssl=1 300w, https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2021/01/Install-ESP32Servo-Library-Arduino-IDE.png?resize=768%2C433&quality=100&strip=all&ssl=1 768w" sizes="(max-width: 786px) 100vw, 786px" style={{borderRadius: 'inherit'}} data-proportion="true" data-align="start" data-index={4} data-file-name="Install-ESP32Servo-Library-Arduino-IDE.png?resize=786%2C443&quality=100&strip=all&ssl=1" data-file-size={0} data-origin=",auto" data-size="," data-rotate data-rotatex data-rotatey data-percentage="auto,auto" />
    </figure>
  </div>
</div>






                  </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <Divider className="p-b-10" />

      <style jsx>{`
        :global(.docs-container img){
          max-width: 100%;
        }

        :global(.docs-container table tr td){
          border: 1px solid var(--grey);
          padding: 5px;
        }
      `}</style>

    </>
  )
}

export default DetailDocs
