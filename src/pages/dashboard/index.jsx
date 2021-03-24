import 'assets/css/Dashboard.css'
import { Layout, Card, Row, Col, Image, Tag, Switch } from 'antd'
import moment from 'moment'
import Chart from 'react-apexcharts'
import Pump from 'assets/images/pump.svg'
import Camera from 'assets/images/camera.svg'
import Sun from 'assets/images/sun-outline.gif'
import Plant from 'assets/images/leaf-outline.gif'
import WaterTank from 'assets/images/water-tank.svg'
import Temperature from 'assets/images/temperature.gif'
import Lecttuce from 'assets/images/plant/lecttuce.png'

const options = {
  colors:['#26de81'],
  stroke: { curve: 'smooth', },
  dataLabels: { enabled: false },
  chart: {
    foreColor: '#93999E',
    zoom: { enabled: false },
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
  },
  grid: {
    borderColor: '#93999e24',
    strokeDashArray: 6,
    position: 'back',
    xaxis: {
      lines: { show: false }
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityTo: 0.2,
      opacityFrom: 0.7,
      shadeIntensity: 1,
      inverseColors: false,
      stops: [20, 90, 100]
    },
    colors: ['#7bed9f']
  },
  yaxis: { min: 0 },
  xaxis: {
    type: 'datetime',
    labels: { show: false },
    categories: [ "01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan" ],
  },
}

const series = [
  {
    name: "series-1",
    data: [2, 4, 3, 6, 4, 9]
  }
]

const Dashboard = () => {
  return(
    <>
      <div className="header-dashboard">
        <h1 className="h1 bold mb0">Dashboard</h1>
        <span className="header-date">{moment().format("dddd, DD MMMM YYYY")}</span>
      </div>

      <Layout>
        <Layout.Content>
          <Row gutter={[20, 20]}>

            <Col lg={16} md={24} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">0 pH</h2>
                <span className="header-date">Power of Hydrogen</span>
                <div className="chart">
                  <Chart type="area" series={series} options={options} height={465} />
                </div>
              </Card>
            </Col>

            <Col lg={8} md={24} sm={24} xs={24}>
              <Row gutter={[20, 20]}>
                <Col lg={24} md={12} sm={24} xs={24}>
                  <Card className="radius1rem shadow1 card-dashboard h-100" bordered={false}>
                    <h2 className="h2 bold mb1 line-height-1">
                      Water Temp
                      <Tag className="right tag-condition good">Good</Tag>
                    </h2>
                    <div className="text-center items-center mt2">
                      <Image width={120} src={Temperature} preview={false} alt="temperature" className="ml5" />
                      <h3 className="h2 bold mb0 mt2">26º<span className="regular header-date">C</span></h3>
                    </div>
                  </Card>
                </Col>

                <Col lg={24} md={12} sm={24} xs={24}>
                  <Card className="radius1rem shadow1 card-dashboard h-100" bordered={false} >
                    <h2 className="h2 bold mb1 line-height-1">
                      Water Tank
                      <Tag className="right tag-condition medium">Medium</Tag>
                    </h2>
                    <div className="text-center items-center mt1">
                      <Image width={140} src={WaterTank} preview={false} alt="water-tank" className="mln1" />
                      <h3 className="h2 bold mb0">80%</h3>
                      <h4 className="h3 header-date mb0">Remaining</h4>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>

          </Row>

          <Row gutter={[20, 20]} style={{marginTop: "20px"}}>
            <Col lg={5} md={12} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  Plant
                  <span className="right">
                    <Image width={25} src={Camera} preview={false} alt="camera" className="hover-pointer" />
                  </span>
                </h2>
                <div className="text-center items-center mt2">
                  <Image width={100} src={Lecttuce} preview={false} alt="plant" />
                  {/* <h3 className="h2 bold mb0">L<span className="regular header-date">ecttuce</span></h3> */}
                  <h4 className="h3 header-date mb0 mt1">Lecttuce</h4>
                </div>
              </Card>
            </Col>

            <Col lg={5} md={12} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  Nutrition
                  <Tag className="right tag-condition bad">Bad</Tag>
                </h2>
                <div className="text-center items-center mt2">
                  <Image width={100} src={Plant} preview={false} alt="plant" />
                  <h3 className="h2 bold mb0">6<span className="regular header-date"> ppm</span></h3>
                </div>
              </Card>
            </Col>

            <Col lg={5} md={8} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  Light Intensity
                </h2>
                <div className="text-center items-center mt2">
                  <Image width={100} src={Sun} preview={false} alt="temperature" />
                  <h3 className="h2 bold mb0">6<span className="regular header-date"> lux</span></h3>
                </div>
              </Card>
            </Col>

            <Col lg={9} md={16} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold line-height-1">Pump</h2>
                <div className="text-center items-center">
                  <Image width={100} src={Pump} preview={false} alt="plant" />
                  <Row justify="space-around">
                    <Col span={8}>
                      <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                      <p className="mb0 mt1">
                        pH Up
                      </p>
                    </Col>
                    <Col span={8}>
                      <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                      <p className="mb0 mt1">
                        pH Down
                      </p>
                    </Col>
                    <Col span={8}>
                      <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                      <p className="mb0 mt1">
                        Nutrition
                      </p>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>

        </Layout.Content>
      </Layout>
    </>
  )
}

export default Dashboard
