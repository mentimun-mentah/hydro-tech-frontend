import { Card, Row, Col, Button } from 'antd'

import Image from 'next/image'
const Hydro = '/static/images/blog/2.jpeg'

const Blog = () => {
  return (
    <>
      <h1>Blog Image</h1>

      <div className="container-fluid p-t-50">
        <Row gutter={[10, 10]} justify="center">
          <Col xl={22} lg={22} md={24} sm={24} xs={24}>
            <Row gutter={[20, 20]}>
              {[...Array(2)].map((_, i) => (
                <Col xl={8} lg={8} md={8} sm={12} xs={12} key={i}>
                  <Card 
                    className="w-100 card-blog" 
                    bordered={false}
                    cover={<Image alt="blog" src={Hydro} width={350} height={250} />}
                  >
                    <h1 className="h3 bold truncate-2 line-height-3">What Are Hydroponic Systems and How Do They Work?</h1>
                    <p className="truncate-2">
                      Known for being versatile, hydroponics is appropriate for use in developing countries as it efficiently produces food in arid and mountainous regions, on city rooftops, or, in other words, pretty much anywhere.
                    </p>
                    <Button type="primary" ghost><b>Read more</b></Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>

      <style jsx>{`
        :global(body) {
          background-color: white!important;
        }
        :global(.ant-card.card-blog .ant-card-cover img) {
          object-fit: cover;
          border-radius: .5rem;
        }
        :global(.ant-card.card-blog .ant-card-body) {
          padding-top: 0px;
          padding-left: 0px;
          padding-right: 0px;
        }
      `}</style>
    </>
  )
}

export default Blog
