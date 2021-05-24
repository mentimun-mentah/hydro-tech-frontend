import { useRouter } from "next/router";
import { withAuth } from "lib/withAuth";
import { animateScroll } from 'react-scroll'
import { Row, Col, Card, Grid, Divider, Button } from 'antd'
import { useEffect, useContext, useState, useMemo } from 'react'
import { WebSocketContext } from 'components/Layout/dashboard';

import moment from 'moment'
import axios from 'lib/axios'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import isEmpty from 'validator/lib/isEmpty'
import PeopleChat from 'components/Chats/People'
import ChatItem from 'components/Chats/ChatItem'
import pageStyle from "components/Dashboard/pageStyle.js";
import InfiniteScroll from 'react-infinite-scroll-component'

import { toolbarOptions } from 'components/Editor/toolbarOptions'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const useBreakpoint = Grid.useBreakpoint

const Loader1 = "/static/images/loader-1.gif";

const per_page = 10
const Chats = () => {
  const router = useRouter();
  const { md, lg } = useBreakpoint()
  const { wsChat } = useContext(WebSocketContext)

  const [page, setPage] = useState(1)
  const [text, setText] = useState("")
  const [message, setMessage] = useState([])
  const [dataUser, setDataUser] = useState({ total_online: 0, total_offline: 0, online_user: [], offline_user: [] })
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [onlineUser, setOnlineUser] = useState([])
  const [offlineUser, setOfflineUser] = useState([])
  const [sliceStart, setSliceStart] = useState(0)
  const [sliceEnd, setSliceEnd] = useState(2)

  const { total_online, total_offline } = dataUser

  useEffect(() => {
    setLoading(true)
    axios.get(`/chats/all-chats?page=1&per_page=${per_page}`)
      .then(res => {
        setLoading(false)
        setPage(res.data.page)
        setMessage(res.data.data.reverse())
      })
      .catch(err => {
        console.log(err.response)
      })

    animateScroll.scrollToBottom({containerId: 'chat-content'});
    const timeout = setTimeout(() => {
      animateScroll.scrollToBottom({containerId: 'chat-content'});
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  if(wsChat && wsChat.readyState == 1) {
    if(router && router.pathname === "/dashboard/chats") {
      wsChat.onmessage = (msg) => {
        if((msg.data.indexOf("total_online") !== -1) && (msg.data.indexOf("total_offline") !== -1)) {
          setDataUser(JSON.parse(msg.data))
          console.log("Data", JSON.parse(msg.data))
        }
        else {
          const newMessage = [...message, JSON.parse(msg.data)]
          setMessage(newMessage)
          animateScroll.scrollToBottom({containerId: 'chat-content'});
        }
      }
    }
  }

  const setDate = idx => {
    try {
      if(idx == 0) {
        return moment(message[idx].chats_created_at).isSame(moment(), 'day') ? 
          <Divider className="date-divider" plain>Today</Divider>
          : 
          <Divider className="date-divider" plain>{moment(message[idx].chats_created_at).format('ll')}</Divider>
      } 
      else {
        if(!moment(message[idx].chats_created_at).isSame(moment(message[idx - 1].chats_created_at), 'day')) {
          return moment(message[idx].chats_created_at).isSame(moment(), 'day') ? 
            <Divider className="date-divider" plain>Today</Divider>
            : 
            <Divider className="date-divider" plain>{moment(message[idx].chats_created_at).format('ll')}</Divider>
        }
      }
    } catch(err) {}

    return false
  }

  const bindings = {
    send: {
      key: 'Enter',
      shiftKey: false,
      handler: () => {
        document.getElementById("send-msg-btn").click()
      }
    }
  }

  const modules = useMemo(() => ({ 
    toolbar: toolbarOptions.toolbar,
    keyboard: { bindings: bindings },
  })
  ,[]);

  const sendMessage = () => {
    if(wsChat && wsChat.send && wsChat.readyState == 1) {
      let plainText = text.replace(/<[^>]+>/g, '');
      let finalText = plainText.replace(/&nbsp;/g, " ");
      if(!isEmpty(finalText)) {
        wsChat.send(text)
        setText("")
      }
    }
  }

  const fetchMessage = () => {
    axios.get(`/chats/all-chats?page=${page+1}&per_page=${per_page}`)
      .then(res => {
        setPage(s => s + 1)
        setPage(res.data.page)
        if(res.data && res.data.length == 0) setHasMore(false)
        setMessage(s => res.data.data.reverse().concat(s))
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  const getOfflineUser = () => {
    const copyUserOffline = [...dataUser.offline_user]
    const data = {
      list_id: copyUserOffline.slice(sliceStart, sliceEnd)
    }
    axios.post('/users/get-multiple-user', data)
      .then(res => {
        setSliceStart(s => s + sliceEnd)
        setSliceEnd(s => s + sliceEnd)
        setOfflineUser(s => res.data.concat(s))
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  return(
    <>
      <Card className="radius1rem shadow1 card-h-100 card-chat" bordered={false}>
        <Row gutter={[0,0]} className="h-100">
          <Col xl={18} lg={18} md={20} sm={20} xs={20} className="border-right">
            <div id="chat-content" className="chat-wrapper chat-content">
              <div
                id="scrollableDiv"
                style={{
                  height: '100%',
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  justifyContent: loading ? 'center' : 'unset',
                  textAlign: loading ? 'center' : 'unset'
                }}
              >
                <InfiniteScroll 
                  inverse={true}
                  hasMore={hasMore}
                  next={fetchMessage}
                  dataLength={message.length}
                  scrollableTarget="scrollableDiv"
                >
                  {loading ? (
                    <>
                      <Image width={75} height={75} src={Loader1} alt="loader" />
                      <p className="text-grey">Loading message</p>
                    </>
                  ) : (
                    <>
                      {message && message.length > 0 && message.map((msg, i) => (
                        <div key={msg.chats_id}>
                          {setDate(i)}
                          <ChatItem 
                            name={msg.users_username}
                            time={msg.chats_created_at}
                            message={msg.chats_message}
                            avatar={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${msg.users_avatar}`}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </InfiniteScroll>
              </div>
              <small>
                {JSON.stringify(dataUser, null, 2)}
              </small>
            </div>
            <div className="chat-input-wrapper">
              <ReactQuill 
                theme="snow"
                className="chat-input"
                value={text}
                modules={modules}
                onChange={val => setText(val)}
                placeholder="Press enter to send message"
              />
            </div>
            <Button className="display-none" id="send-msg-btn" onClick={sendMessage}>Send</Button>
          </Col>


          <Col xl={6} lg={6} md={4} sm={4} xs={4}>
            <div className="chat-user-wrapper">
              <div className="user-wrapper">
                <div
                  id="scrollablePeople"
                  style={{
                    height: 100,
                    display: 'flex',
                    overflowX: 'auto',
                  }}
                >
                  <InfiniteScroll 
                    hasMore={true}
                    next={getOfflineUser}
                    dataLength={offlineUser.length}
                    scrollableTarget="scrollablePeople"
                  >
                    <h1 className="bold h5 caps ls-0">Off{md && 'line'} {lg && `- ${total_offline}`}</h1>
                    {offlineUser && offlineUser.length > 0 && offlineUser.map(user => (
                      <PeopleChat
                        key={user.id}
                        name={user.username}
                        avatar={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${user.avatar}`}
                      />
                    ))}
                  </InfiniteScroll>
                </div>

                <div className="display-none">
                <h1 className="bold h5 caps ls-0">On{md && 'line'} {lg && `- ${total_online}`}</h1>
                {[...Array(5)].map((_,i) => (
                  <PeopleChat
                    key={i}
                    online
                    name={"asdsadsad"}
                    avatar={`https://i.pravatar.cc/50?u=${i}`}
                  />
                ))}
                <h1 className="bold h5 caps ls-0">Off{md && 'line'} {lg && `- ${total_offline}`}</h1>
                {[...Array(30)].map((_,i) => (
                  <PeopleChat
                    key={i}
                    name={"asddsa"}
                    avatar={`https://i.pravatar.cc/50?u=${i}`}
                  />
                ))}
                </div>

              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <style jsx>{pageStyle}</style>
      <style jsx>{`
        :global(body .card-chat) {
          font-weight: normal;
        }
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
          height: 100%;
        }
        .chat-wrapper {
          overflow-y: scroll;
          overflow-x: hidden;
          height: calc(100vh - 100px - 35px - 100px - 0.5em);
        }

        :global(.chat-content) {
          overflow-y: auto;
          flex-grow: 1;
          flex-shrink: 1;
          background-color: #fff;
          padding-right: 20px;
        }
        :global(.chat-content .chat-item) {
          transition: background-color 0.2s linear;
          background-color: transparent;
          border-radius: 2rem 0 0 0;
        }
        :global(.chat-content .chat-item:hover) {
          background-color: rgba(240, 240, 240, 0.9);
          border-radius: 2rem 0 0 0;
        }

        .chat-input-wrapper {
          margin-top: 10px;
          margin-right: 20px;
        }
        :global(.chat-input .ql-toolbar.ql-snow .ql-formats) {
          font-size: 12px;
        }
        :global(.chat-input .ql-toolbar.ql-snow) {
          padding: 5px;
          overflow: hidden;
          overflow-x: scroll;
          white-space: nowrap;
          border-top-left-radius: .5rem;
          border-top-right-radius: .5rem;
        }
        :global(.chat-input .ql-container.ql-snow) {
          border-bottom-left-radius: .5rem;
          border-bottom-right-radius: .5rem;
        }
        :global(.chat-input .ql-editor) {
          padding: 8px 10px;
          height: 100px;
          max-height: 100px;
          overflow: auto;
        }
        :global(.ql-snow .ql-picker-options .ql-picker-item) {
          padding: 0;
        }
        :global(.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before) {
          font-size: 1.4em;
        }
        :global(.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before) {
          font-size: 1.2em;
        }
        :global(.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before) {
          font-size: 1em;
        }
        :global(.ql-snow .ql-picker.ql-header .ql-picker-item::before) {
          font-size: .9em;
        }

        :global(.ant-divider.date-divider) {
          margin-top: 0;
          font-size: 12px;
          font-weight: bold;
          color: var(--grey);
        }
        :global(.ant-divider.date-divider::before, .ant-divider.date-divider::after) {
          top: 0%;
        }
        :global(.ant-divider-horizontal.ant-divider-with-text) {
          margin-top: 0px;
          margin-bottom: 8px;
        }
      `}</style>
    </>
  )
}

export default withAuth(Chats)
