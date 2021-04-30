import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { Row, Col, Button, Grid } from 'antd'

import Link from 'next/link'
import Image from 'next/image'

const useBreakpoint = Grid.useBreakpoint
const Garden = '/static/images/garden-3.svg'
const BetterFood = '/static/images/better-food.svg'
const GrowthOwn = '/static/images/growth-own.svg'
const AboutUs = '/static/images/about-us-2.svg'
const Analytics = '/static/images/analytics.svg'
const Presentation = '/static/images/presentation.svg'
const Process = '/static/images/process.svg'
const PlantsHand = '/static/images/plants-hand.svg'
const GrowingPlant = '/static/images/growing-plant.svg'

const services_list = [
{ title: "Realtime Monitoring", image: Analytics, label: "Monitoring your garden from our platform with your own device in realtime." },
{ title: "Automated Control", image: Process, label: "We do automated control for maintaining your garden to save your precious time." },
{ title: "Multiple Plants", image: PlantsHand, label: "Using our platform, you can easily select the type of plants you want to grow." },
{ title: "Growth Plant", image: GrowingPlant, label: "We use PlantCV as image processing to determine the height of the plant in your garden." },
{ title: "Automated Report", image: Presentation, label: "Download the report data as you need and you can use it for analytics and much more." },
]

const Home = () => {
  const { md } = useBreakpoint()

  const user = useSelector(state => state.auth.user)

  return (
    <>
      <main className={`${md ? 'p-t-88' : 'p-t-40'} site-body`} id="home">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle">
            <Col xl={24} lg={24} md={23} sm={23} xs={23}>
              <Row gutter={[20, 20]} justify="center" align="middle">
                <Col xl={{span: 8, order: 1}} lg={{span: 8, order: 1}} 
                  md={{span: 12, order: 1}} sm={{span: 24, order: 2}} xs={{span: 24, order: 2}}
                >
                  <div>
                    <h1 className="bold h1">Welcome to the future of gardening</h1>
                    <p>
                      Hydro X Tech is an IoT-based platform for monitoring and automated maintaining of your garden, this is useful for helping gardeners to improve the quality of their crops.
                    </p>
                    <Button className="ant-btn-green">
                      <Link href={(user && user.username && user.avatar) ? "/dashboard" : "/auth"}>
                        <a>Get Started</a>
                      </Link>
                    </Button>
                  </div>
                </Col>
                <Col xl={{span: 12, order: 2}} lg={{span: 12, order: 2}}
                  md={{span: 12, order: 2}} sm={{span: 24, order: 1}} xs={{span: 24, order: 1}}
                >
                  <div className="text-center">
                    <Image
                      width="600"
                      height="600"
                      src={Garden}
                      alt="temperature"
                      className="ml5"
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </main>

      <section id="service" className="p-t-80 p-b-40 bg-gradient-2">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle">
            <Col xl={24} lg={24} md={23} sm={23} xs={23}>
              <Row gutter={[20, 20]} justify="center" align="middle">
                <Col span={24}>
                  <div className="text-center">
                    <h2 className="h2 bold">Our Service</h2>
                    <p className="text-justify m-b-30">
                      Explore all the Hydro X Tech services and feel the big impact
                    </p>
                  </div>
                </Col>
                <Col xl={18} lg={18} md={20} sm={24} xs={24}>
                  <Row gutter={[20, 20]} justify="center" align="middle">
                    {services_list.map((data, i) => (
                      <Col xl={8} lg={8} md={12} sm={12} xs={12} key={i}>
                        <div className="text-center">
                          <Image
                            width={90}
                            height={90}
                            src={data.image}
                            alt="temperature"
                            className="ml5"
                          />
                          <h3 className="h3 bold">{data.title}</h3>
                          <p className="text-justify">
                            {data.label}
                          </p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <div id="about" />
        </div>
      </section>

      <section className="m-b-0 bg-gradient-2">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle">
            <Col xl={19} lg={19} md={24} sm={24}xs={24}>
              <Row gutter={[20, 20]} justify="center" align="middle">
                <Col xl={{span: 12, order: 1}} lg={{span: 12, order: 1}}
                  md={{span: 12, order: 1}} sm={{span: 12, order: 1}} xs={{span: 24, order: 1}}
                >
                  <div className="text-center">
                    <Image
                      width="500"
                      height="500"
                      src={AboutUs}
                      alt="temperature"
                      className="ml5"
                    />
                  </div>
                </Col>
                <Col xl={{span: 12, order: 2}} lg={{span: 12, order: 2}} 
                  md={{span: 12, order: 2}} sm={{span: 12, order: 2}} xs={{span: 24, order: 2}}
                >
                  <div className="text-left">
                    <h2 className="h2 bold">About Us</h2>
                    <p>
                      Hydro X Tech is here to help you in maintaining a plantation, especially hydroponics through technology. The existence of technology can save time and space in cultivating hydroponic plants.
                    </p>
                    {/* <p> */}
                    {/*   Hydro X Tech hadir untuk membantu anda dalam pemeliharaan suatu perkebunan khususnya hydroponics melalui teknologi. Adanya teknologi dapat menghemat waktu dan tempat dalam melakukan pembudidayaan tanaman hidroponik. */}
                    {/* </p> */}

                    {/* <h2 className="h2 bold">Hydroponics ?</h2> */}
                    {/* <p> */}
                    {/*   Hydroponics is a type of horticulture and a subset of hydroculture which involves growing plants without soil, by using mineral nutrient solutions in an aqueous solvent. */}
                    {/*   We are a small team, yang bergerak di bidang pertanian khususnya pada hydroponic dengan memanfaatkan sentuhan teknologi untuk mempermudah pemeliharaan tanaman pada suatu perkebunan. */}
                    {/* </p> */}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <svg
          viewBox="0 0 1440 270"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: "-250px", marginBottom: "-7px" }}
        >
          <path
            fill="rgb(180 222 220)"
            d="M0 192l60-10.7c60-10.3 180-32.3 300-26.6C480 160 600 192 720 176c120-16 240-80 360-101.3 120-21.7 240 .3 300 10.6l60 10.7v224H0z"
          ></path>
        </svg>
      </section>

      <main className="bg-gradient-3">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle">
            <Col xl={19} lg={19} md={24} sm={24}xs={24}>
              <Row gutter={[20, 20]} justify="center" align="middle">
                <Col xl={{span: 12, order: 2}} lg={{span: 12, order: 2}}
                  md={{span: 12, order: 2}} sm={{span: 12, order: 2}} xs={{span: 24, order: 1}}
                >
                  <div className="text-center">
                    <Image
                      width="450"
                      height="450"
                      src={BetterFood}
                      alt="temperature"
                      className="ml5"
                    />
                  </div>
                </Col>
                <Col xl={{span: 12, order: 1}} lg={{span: 12, order: 1}}
                  md={{span: 12, order: 1}} sm={{span: 12, order: 1}} xs={{span: 24, order: 2}}
                >
                  <div className="text-left">
                    <h2 className="h2 bold">Creating a Better Hydroponics System</h2>
                    <p>
                      Hydro X Tech comes with all the services that can help you to take care of your garden, from monitoring plant development, nutrition, water content to automatic control to balance the water content in the tank.
                      {/* Hydro X Tech hadir dengan segala layanan yang dapat membantu anda untuk mengurus perkebunan, mulai dari monitoring perkembangan tanaman, nutrisi, kadar air hingga dapat melakukan kontrol otomatis untuk menyeimbangkan kadar air dalam tangki. */}
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </main>

      <main className="bg-gradient-3">
        <div className="container-fluid">
          <Row gutter={[20, 20]} justify="center" align="middle">
            <Col xl={19} lg={19} md={24} sm={24}xs={24}>
              <Row gutter={[20, 20]} justify="center" align="middle">
                <Col xl={{span: 12, order: 1}} lg={{span: 12, order: 1}}
                  md={{span: 12, order: 1}} sm={{span: 12, order: 1}} xs={{span: 24, order: 1}}
                >
                  <div className="text-center">
                    <Image
                      width="450"
                      height="450"
                      src={GrowthOwn}
                      alt="temperature"
                      className="ml5"
                    />
                  </div>
                </Col>
                <Col xl={{span: 12, order: 2}} lg={{span: 12, order: 2}}
                  md={{span: 12, order: 2}} sm={{span: 12, order: 2}} xs={{span: 24, order: 2}}
                >
                  <div className="text-left">
                    <h2 className="h2 bold">Grow your own plant</h2>
                    <p>
                      Gardening is now made easier with Hydro X Tech, with no special knowledge is needed to start a hydroponics plantation, just let Hydro X Tech do the rest to maintain your garden automatically.
                      {/* Berkebun menjadi lebih mudah dengan Hydro X Tech, tidak perlu adanya pengetahuan khusus untuk memulai perkebunan hydroponics, cukup biarkan Hydro X Tech yang melakukan sisanya untuk memelihara kebunmu secara otomatis. */}
                      {/* Tidak perlu pengetahuan khusus untuk memulai perkebunan hydroponics dan dapat memanfaatkan lahan yang sempit untuk melakukan perkebunan hydroponic, dan menggunakan Hydro X Tech untuk melakukan pemeliharaan kebun secara otomatis. */}
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </main>

      <main className="bg-gradient-4">
        <svg 
          viewBox="0 0 1440 250"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: "-80px", marginBottom: "-7px" }}
        >
          <path
            fill="#fafafa"
            d="M0 192l60-10.7c60-10.3 180-32.3 300-26.6C480 160 600 192 720 176c120-16 240-80 360-101.3 120-21.7 240 .3 300 10.6l60 10.7v224H0z"
          ></path>
        </svg>
      </main>

      <style global jsx>{`
        .menu-mobile .ant-menu-item:active, .menu-mobile .ant-menu-submenu-title:active {
          background: #e4f1f1!important;
        }

        .site-body {
          padding-top: 88px;
          background: rgb(3,154,145);
          background: linear-gradient(180deg, rgba(3,154,145,0.31556372549019607) 8%, rgba(250,250,250,1) 84%);
        }

        .site-body-2 {
          padding-top: 88px;
          background: rgb(192 223 220);
        }

        .site-body-3 {
          background: rgba(255,203,93);
          background: linear-gradient(180deg, rgba(255,203,93,0.21192226890756305) 0%, rgba(250,250,250,0.6881127450980392) 77%);
        }

        .bg-gradient-2 {
          background: inherit;
        }

        .bg-gradient-3 {
          background: rgb(180 222 220);
        }

        .bg-gradient-4 {
          background: rgb(180 222 220);
          background: linear-gradient(180deg, rgba(180,222,220,1) 8%, rgba(255,255,255,1) 84%);
        }
      `}</style>

    </>
  )
}

export default Home
