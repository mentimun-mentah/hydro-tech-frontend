import { Layout, Card, Row, Col } from 'antd'
import moment from 'moment'
import Chart from 'react-apexcharts'
import './Home.css'

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

const Home = () => {
  return(
    <>
      <div className="header-dashboard">
        <h1 className="h1 bold mb0">Dashboard</h1>
        <span className="header-date">{moment().format("dddd, DD MMMM YYYY")}</span>
      </div>

      <Layout>
        <Layout.Content>
          <Row gutter={[20, 20]}>

            <Col lg={14} md={24} sm={24} xs={24}>
              <Card className="radius1rem shadow1 h-100" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">0 pH</h2>
                <span className="header-date">Power of Hydrogen</span>
                <div className="chart">
                  <Chart
                    type="area"
                    series={series}
                    options={options}
                    height={428}
                  />
                </div>
              </Card>
            </Col>

            <Col lg={10} md={24} sm={24} xs={24}>
              <Row gutter={[20, 20]}>
                <Col lg={24} md={12} sm={24} xs={24}>
                  <Card className="radius1rem shadow1 card-dashboard" bordered={false}>
                    <h2 className="h2 bold mb1 line-height-1">Temperature</h2>
                  </Card>
                </Col>

                <Col lg={24} md={12} sm={24} xs={24}>
                  <Card className="radius1rem shadow1 card-dashboard" bordered={false}>
                    <h2 className="h2 bold mb1 line-height-1">Water Tank</h2>
                    asd
                  </Card>
                </Col>
              </Row>
            </Col>

          </Row>

          <Row gutter={[20, 20]} style={{marginTop: "20px"}}>
            <Col lg={8} md={8} sm={24} xs={24}>
              <Card className="radius1rem shadow1" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">Nutrition</h2>
              </Card>
            </Col>

            <Col lg={8} md={8} sm={24} xs={24}>
              <Card className="radius1rem shadow1" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">Light Intensity</h2>
              </Card>
            </Col>

            <Col lg={8} md={8} sm={24} xs={24}>
              <Card className="radius1rem shadow1" bordered={false}>
                <h2 className="h2 bold mb1 line-height-1">Pump</h2>
              </Card>
            </Col>
          </Row>

        </Layout.Content>
      </Layout>
    </>
  )
}

export default Home
