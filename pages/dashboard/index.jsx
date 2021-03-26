import { Layout, Card, Row, Col, Image, Tag, Switch } from 'antd'
import { options, series } from 'components/Dashboard/apexOption'

import moment from 'moment'
import dynamic from 'next/dynamic'

const Pump = '/static/images/pump.svg'
const Camera = '/static/images/camera.svg'
const Sun = '/static/images/sun-outline.gif'
const Plant = '/static/images/leaf-outline.gif'
const WaterTank = '/static/images/water-tank.svg'
const Lecttuce = '/static/images/plant/lecttuce.png'
const Temperature = '/static/images/temperature.gif'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

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
                      <h3 className="h2 bold mb0 mt2">26&#176;<span className="regular header-date">C</span></h3>
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
            <Col xl={5} lg={8} md={12} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">
                  Plant
                  <span className="right">
                    <Image width={25} src={Camera} preview={false} alt="camera" className="hover-pointer" />
                  </span>
                </h2>
                <div className="text-center items-center mt2">
                  <Image width={100} src={Lecttuce} preview={false} alt="plant" />
                  <h4 className="h3 header-date mb0 mt1">Lecttuce</h4>
                </div>
              </Card>
            </Col>

            <Col xl={5} lg={8} md={12} sm={24} xs={24}>
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

            <Col xl={5} lg={8} md={8} sm={24} xs={24}>
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

            <Col xl={9} lg={12} md={16} sm={24} xs={24}>
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

      <style global jsx>{`
        .header-dashboard {
          margin-bottom: 20px;
        }
        .header-date {
          color: #93999E!important;
        }
        .apexcharts-canvas {
          width: 100% !important;
        }
        .apexcharts-canvas, .apexcharts-canvas svg {
          width: 100% !important;
        }
        .chart {
          width: 100% !important;
          height: 100% !important;
        }
        .card-dashboard .ant-card-body {
          height: 100% !important;
        }
        .tag-condition {
          float: right;
          color: #ffffff!important;
          border: 0px !important;
          border-radius: 1rem !important;
          margin-right: 0px !important;
          padding: 1px 10px!important;
        }
        .tag-condition.good{
          background-color: #2ecc71!important;
        }
        .tag-condition.medium{
          background-color: #ffb142!important;
        }
        .tag-condition.bad{
          background-color: #ff3838!important;
        }
      `}</style>
    </>
  )
}

export default Dashboard
