import { Row, Col } from 'antd'

import moment from 'moment'
import Image from 'next/image'

const ChatItem = ({ avatar, name, message }) => {
  return (
    <>
      <Row gutter={[10,10]} className="m-b-10 chat-item" wrap={false}>
        <Col flex="none">
          <Image
            width={30}
            height={30}
            className="border-radius--5rem"
            src={avatar}
            alt="user"
          />
        </Col>
        <Col flex="auto" className="truncate">
          <h4 className="bold truncate m-b-0">{name} <span className="text-grey fs-12">{moment().format('LT')}</span></h4>
          <p className="m-b-0 message-item">{message}</p>
        </Col>
      </Row>

      <style jsx>{`
        .message-item {
          color: var(--grey-1);
          white-space: pre-line;
        }
      `}</style>
    </>
  )
}

export default ChatItem
