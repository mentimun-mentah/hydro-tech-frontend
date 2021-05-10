import { Comment, Avatar, Popconfirm, Form, Input, Button } from 'antd'

import moment from 'moment'

const REPLY = "reply"
const MESSAGE = "message"

const CommentsContainer = ({ children, head, body, content }) => {
  let images = `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 100) + 1}`

  const author = (
    <div className="w-100">
      <b>Okky Shanty</b>
      <span className="comment-date m-l-5">&bull; {moment().startOf('seconds').fromNow()}</span>
      <Popconfirm
        title={`${head ? "Delete Discussion?" : "Delete Comment?"}`}
        okText="Delete"
        cancelText="Cancel"
        placement="bottomRight"
        cancelButtonProps={{ className: "btn-white" }}
        arrowPointAtCenter
      >
        <span className="hover-pointer float-right">
          <i className="fal fa-ellipsis-h-alt" />
        </span>
      </Popconfirm>
    </div>
  )

  const bodyReply = (
    <Form name="comment-form">
      <Form.Item className="m-b-10">
        <Input.TextArea 
          autoSize={{ minRows: 1, maxRows: 2 }}
          placeholder="Write your replies here..."
        />
      </Form.Item>
      <Form.Item className="m-b-0">
        <Button type="primary">Send</Button>
      </Form.Item>
    </Form>
  )

  const bodyMessage = (
    <p>{content}</p>
  )


  return (
    <>
      <Comment
        className="comment-edit"
        avatar={ <Avatar src={images} alt="Han Solo" /> }
        author={body === MESSAGE ? author : body === REPLY && <></>}
        content={body === MESSAGE ? bodyMessage : body === REPLY && bodyReply}
      >
        {children}
      </Comment>
    </>
  )
}

export default CommentsContainer
