import { Row, Col } from 'antd'

import Image from 'next/image'

const People = ({ avatar, name }) => {
  return (
    <>
      <Row align="middle" gutter={[10,10]} className="m-b-10" wrap={false}>
        <Col flex="none">
          <Image className="border-radius--5rem" src={avatar} width={30} height={30} alt="user" />
        </Col>
        <Col flex="auto" className="truncate">
          <h4 className="fw-600 truncate">{name}</h4>
        </Col>
      </Row>
    </>
  )
}

export default People
