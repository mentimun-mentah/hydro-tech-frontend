import { Card, Row, Col, Switch } from 'antd'

const PumpOn = '/static/images/pump-on.svg'
const LampOn = '/static/images/lamp-on.svg'
const PumpOff = '/static/images/pump-off.svg'
const LampOff = '/static/images/lamp-off.svg'
const WaterPumpOn = '/static/images/water-pump-on.svg'
const WaterPumpOff = '/static/images/water-pump-off.svg'

const PompLamp = ({ isSending, lamp, phup, phdown, nutrition, onLampChange, onPhupChange, onPhdownChange, onNutritionChange }) => {
  return (
    <>
      <Col xl={7} lg={7} md={{ span: 12, order: 2 }} sm={{ span: 12, order: 2 }} xs={{ span: 24, order: 2 }}>
        <Card className="radius1rem shadow1 h-100" bordered={false}>
          <h2 className="h2 bold mb1 line-height-1">
            Lamp
          </h2>
          <div className="text-center items-center mt2">
            <Image className="p-t-5 p-b-5 p-l-5 p-r-5" width={100} height={100} src={lamp ? LampOn : LampOff} alt="lamp" />
            <Row justify="space-around">
              <Col span={24}>
                <Switch 
                  checked={lamp} 
                  onChange={onLampChange} 
                  disabled={isSending}
                />
                <p className="mb0 mt1">
                  {lamp ? "On" : "Off"}
                </p>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>

      <Col xl={10} lg={{ span: 10, order: 2 }} md={{ span: 24, order: 1 }} sm={24} xs={24}>
        <Card className="radius1rem shadow1 h-100" bordered={false}>
          <h2 className="h2 bold line-height-1">Nutrition Pump</h2>
          <div className="text-center items-center">
            <Image width={100} height={100} src={(phup || phdown || nutrition) ? PumpOn : PumpOff} alt="pomp" />
            <Row justify="space-around">
              <Col span={8}>
                <Switch 
                  checked={phup} 
                  disabled={isSending}
                  onChange={onPhupChange}
                  {...switchInitialProps}
                />
                <p className="mb0 mt1">
                  pH Up
                </p>
              </Col>
              <Col span={8}>
                <Switch
                  checked={phdown}
                  disabled={isSending}
                  onChange={onPhdownChange}
                  {...switchInitialProps}
                />
                <p className="mb0 mt1">
                  pH Down
                </p>
              </Col>
              <Col span={8}>
                <Switch
                  checked={nutrition}
                  disabled={isSending}
                  onChange={onNutritionChange}
                  {...switchInitialProps}
                />
                <p className="mb0 mt1">
                  Nutrition
                </p>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>

      <Col xl={7} lg={7} md={{ span: 12, order: 3 }} sm={{ span: 12, order: 3 }} xs={{ span: 24, order: 3 }}>
        <Card className="radius1rem shadow1 h-100" bordered={false}>
          <h2 className="h2 bold mb1 line-height-1">
            Solenoid valve
          </h2>
          <div className="text-center items-center mt2">
            <Image 
              alt="WaterPump" 
              width={100}
              height={100}
              className="p-t-5 p-b-5 p-l-5 p-r-5"
              src={solenoid ? WaterPumpOn : WaterPumpOff}
            />
            <Row justify="space-around">
              <Col span={24}>
                <Switch 
                  checked={solenoid} 
                  onChange={onSolenoidChange} 
                  disabled={isSending} 
                />
                <p className="mb0 mt1">
                  {solenoid ? "On" : "Off"}
                </p>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </>
  )
}

export default PompLamp
