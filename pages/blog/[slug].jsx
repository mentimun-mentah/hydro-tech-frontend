import { Row, Col, Comment, Button, Input, Divider, Space, Avatar, Form } from 'antd'
import { EmailIcon, FacebookIcon, TwitterIcon, TelegramIcon, LineIcon } from 'react-share'
import { EmailShareButton, FacebookShareButton, TwitterShareButton, TelegramShareButton, LineShareButton } from 'react-share'

import Image from 'next/image'
import Pagination from 'components/Pagination'
import Comments from 'components/Comments'

const link = "www.google.com"

const BlogSlug = () => {
  return (
    <>
      <div className="container-fluid p-b-0 p-t-100">

        <Row gutter={[10, 10]} justify="center">
          <Col xl={22} lg={22} md={24} sm={24} xs={24}>
            <Row gutter={[20, 20]} justify="center">
              <Col xl={14} lg={14} md={20} sm={24} xs={24}>
                <div className="text-center">
                  <h2 className="h2 bold mb0 text-purple m-t-30 m-b-10">
                    ARE HYDROPONIC VEGETABLES AS NUTRITIOUS AS THOSE GROWN IN SOIL?
                  </h2>
                  <p>
                    <small className="text-grey">Maret 01, 2021</small>
                  </p>
                  <Space>
                    <EmailShareButton url={link}>
                      <EmailIcon size={32} round={true} />
                    </EmailShareButton>
                    <FacebookShareButton url={link}>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton url={link}>
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                    <TelegramShareButton url={link}>
                      <TelegramIcon size={32} round={true} />
                    </TelegramShareButton>
                    <LineShareButton url={link}>
                      <LineIcon size={32} round={true} />
                    </LineShareButton>
                  </Space>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[10, 10]} justify="center">
          <Col xl={22} lg={22} md={24} sm={24} xs={24}>
            <Row gutter={[20, 20]} justify="center">
              <Col xl={16} lg={16} md={20} sm={24} xs={24}>

                <div className="m-t-30 m-b-30">
                  <Image
                    src="/static/images/blog/2.jpeg"
                    className="border-radius--5rem"
                    alt="Detail Blog"
                    layout="responsive"
                    height={1600}
                    width={2400}
                  />
                </div>

                <h3><em>The Emerging Technique Of Farming</em></h3>
                <p><em>Apart from coming up with the advanced technology-driven environment, something that is raising our concern in the world is the technique of farming. People all around seek healthy food, grown in a healthy environment. This is one of the reasons that is making organic farming more adoptable. In this context, hydroponics is one of the most emerging terms</em></p>
                <p><em>Hydroponics has two terms involved i.e. \&apos;hydro\&apos; means water and phonics is toil. So people have defined hydroponics as the process of growing the plants in water. Photosynthesis is the process through which plants grow, using sunlight. Chlorophyll is present in their leaves and is essential for the growth.</em></p>
                <p><em>This chemical composition helps to convert carbon dioxide (present in the atmosphere) and water (extracted from soil) into glucose and oxygen. Therefore, the presence of soil is not always important because components need by plants for growing are nutrients and water. It is possible to grow plants without soil if these two components get a substitute from any other source.</em></p>
                <h3><em>How Do Roots Get Support ?</em></h3>
                <p><em>Now, as this process doesn\&apos;t have the support of soil, the question arises, how do these plants get the support? Here, the whole system of the roots get support by the medium of an inert such as rockwool, clay pellets, peat moss vermiculite etc. the basic concern lies here is to bring the plant in direct contact with the solution having required nutrients.</em></p>
                <h3><em>Why Should One Choose Hydroponics ?</em></h3>
                <p><em>Hydroponics is good for all types of growers. Scientists have discovered that plants are healthier, juicier and bigger in nature when this process is adopted. Compared to all other techniques, this is more simple, easy and cost-effective when it comes to gardening. Just with the prior basic knowledge of techniques and methods, it is an easy process to adopt.</em></p>

                <Divider />

                <Comment
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <>
                      <Form.Item className="m-b-10">
                        <Input.TextArea rows={4} placeholder="Write your comments here..." />
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType="submit" type="primary">
                          Add Comment
                        </Button>
                      </Form.Item>
                    </>
                  }
                />

                <Comments 
                  head 
                  body="message" 
                  content="We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure)."
                >
                  <Comments 
                    body="message" 
                    content="We supply a series of design principles, practical patterns and high quality design resources."
                  />
                  <Comments 
                    body="reply"
                  />
                </Comments>

                <div className="text-center m-t-20 m-b-20">
                  <Pagination 
                    total={50} 
                    goTo={() => {}} 
                    current={1} 
                    hideOnSinglePage 
                    pageSize={20}
                  />
                </div>

              </Col>

            </Row>
          </Col>
        </Row>

      </div>

      <Divider className="p-b-10" />

      <style jsx>{`
        :global(.comment-edit .ant-comment-actions) {
          margin-top: 5px;
        }
        :global(.ant-comment-content-author-name){
          width: 100%;
        }
      `}</style>

    </>
  )
}

export default BlogSlug
