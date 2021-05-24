import { Row, Col } from 'antd'

import moment from 'moment'
import Image from 'next/image'

const ChatItem = ({ avatar, time, name, message }) => {
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
          <h4 className="bold truncate m-b-0">{name} <span className="text-grey fs-12">{moment(time).format('LT')}</span></h4>
          <p className="m-b-0 message-item" dangerouslySetInnerHTML={{__html: message}}></p>
        </Col>
      </Row>

      <style jsx>{`
        .message-item {
          color: var(--grey-1);
          white-space: pre-line;
        }
        :global(.chat-item) {
          margin-top: 5px!important;
          margin-bottom: 15px!important;
        }
        :global(.message-item > *) {
          margin-bottom: 0!important;
        }
        :global(.message-item img) {
          width: 200px;
        }
      `}</style>
    </>
  )
}

export default ChatItem
