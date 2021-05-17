import { Row, Col, Card } from 'antd'

import Image from 'next/image'

import pageStyle from "components/Dashboard/pageStyle.js";

const Chats = () => {
  return(
    <>
      <Card className="radius1rem shadow1 card-h-100" bordered={false}>
        <Row gutter={[0,0]} className="h-100">
          <Col xl={18} lg={18} md={18} sm={24} xs={24} className="border-right">
            <div className="chat-wrapper">
              dsadsadasd
            </div>
          </Col>
          <Col xl={6} lg={6} md={6} sm={24} xs={24}>
            <div className="chat-user-wrapper">
              <h1 className="bold">People</h1>
              <div className="user-wrapper">
                {[...Array(30)].map((_,i) => (
                  <Row key={i} align="middle" gutter={[10,10]} className="m-b-10" wrap={false}>
                    <Col flex="none">
                      <Image className="border-radius--5rem" src={`https://i.pravatar.cc/50?u=${i}`} width={30} height={30} alt="user" />
                    </Col>
                    <Col flex="auto" className="truncate">
                      <h4 className="fw-600 truncate">Okkuy Okkuy Okkuy Suardhana {i}</h4>
                    </Col>
                  </Row>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <style jsx>{pageStyle}</style>
      <style jsx>{`
        :global(.card-h-100, .card-h-100 .ant-card-body) {
          height: calc(100vh - 25px - 25px);
        }
        :global(.border-right) {
          border-color: #edeff2;
        }
        .chat-wrapper {
          overflow: hidden;
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .chat-user-wrapper {
          padding-left: 24px;
          height: calc(100vh - 25px - 25px - 40px - 0.5em);
        }
        .user-wrapper {
          overflow-y: scroll;
          overflow-x: hidden;
          height: calc(100% - 35px);
        }
      `}</style>
    </>
  )
}

export default Chats
