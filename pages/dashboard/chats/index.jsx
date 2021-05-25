import { useRouter } from "next/router";
import { withAuth } from "lib/withAuth";
import { useSelector } from 'react-redux'
import { animateScroll } from 'react-scroll'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useContext, useState, useMemo } from 'react'
import { WebSocketContext } from 'components/Layout/dashboard';
import { Row, Col, Card, Grid, Divider, Button, Skeleton, Empty } from 'antd'

import _ from 'lodash'
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
const soundNotif = "/static/sound/chat.mp3"

const per_page = 10
const init_slicing = 20

const Chats = () => {
  const router = useRouter();

  const user = useSelector(state => state.auth.user)

  const { md, lg } = useBreakpoint()
  const { wsChat, activeUser } = useContext(WebSocketContext)

  const [page, setPage] = useState(1)
  const [text, setText] = useState("")
  const [message, setMessage] = useState([])
  const [dataUser, setDataUser] = useState({ total_online: 0, total_offline: 0, online_user: [], offline_user: [] })
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadingInitUser, setLoadingInitUser] = useState(false)
  const [onlineUser, setOnlineUser] = useState([])
  const [offlineUser, setOfflineUser] = useState([])

  const [sliceStart, setSliceStart] = useState(0)
  const [sliceEnd, setSliceEnd] = useState(init_slicing)
  const [sliceStartOffline, setSliceStartOffline] = useState(0)
  const [sliceEndOffline, setSliceEndOffline] = useState(init_slicing)

  const { total_online, total_offline } = dataUser

  useEffect(() => {
    setLoading(true)
    axios.get(`/chats/all-chats?page=1&per_page=${per_page}`)
      .then(res => {
        setLoading(false)
        setPage(res.data.page)
        setMessage(res.data.data.reverse())
      })
      .catch(() => { }) 
    animateScroll.scrollToBottom({containerId: 'chat-content'});
    const timeout = setTimeout(() => {
      animateScroll.scrollToBottom({containerId: 'chat-content'});
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    setDataUser(activeUser)
    setLoadingInitUser(true)

    if(activeUser.online_user && activeUser.online_user.length > 0) {
      const copyUserOnline = [...activeUser.online_user]
      const data = {
        list_id: copyUserOnline.slice(sliceStart, sliceEnd)
      }
      axios.post('/users/get-multiple-user', data)
        .then(res => {
          setLoadingInitUser(false)
          setSliceStart(s => s + init_slicing)
          setSliceEnd(s => s + init_slicing)
          setOnlineUser(s => res.data.concat(s))
        })
        .catch(() => {
          setLoadingInitUser(false)
        })
    }

    if(activeUser.offline_user && activeUser.offline_user.length > 0) {
      const copyUserOffline = [...activeUser.offline_user]
      const data = {
        list_id: copyUserOffline.slice(sliceStartOffline, sliceEndOffline)
      }
      axios.post('/users/get-multiple-user', data)
        .then(res => {
          setLoadingInitUser(false)
          setSliceStartOffline(s => s + init_slicing)
          setSliceEndOffline(s => s + init_slicing)
          setOfflineUser(s => res.data.concat(s))
        })
        .catch(() => {
          setLoadingInitUser(false)
        })
    }

    return () => {
      setLoadingInitUser(false)
    }
  }, [activeUser])

  useEffect(() => {
    const copyUserOnline = [...onlineUser]
    const copyUserOffline = [...offlineUser]

    const idUserOnline = copyUserOnline.map(x => x.id)

    const diffOnline  = _.difference(dataUser.online_user, idUserOnline)
    const diffOffline = _.difference(idUserOnline, dataUser.online_user)
    
    let resOnline = [], resOffline = []
    for(let id of diffOnline) {
      for(let [idx, val] of Object.entries(copyUserOffline)) {
        if(id === val.id) {
          resOnline.push(val)
          copyUserOffline.splice(idx, 1)
          break
        }
      }
    }

    for(let id of diffOffline) {
      for(let [idx, val] of Object.entries(copyUserOnline)) {
        if(id === val.id) {
          resOffline.push(val)
          copyUserOnline.splice(idx, 1)
          break
        }
      }
    }

    resOnline = copyUserOnline.concat(resOnline)
    resOnline = _.uniqBy(resOnline, 'id')
    setOnlineUser(resOnline)

    resOffline = copyUserOffline.concat(resOffline)
    resOffline = _.uniqBy(resOffline, 'id')
    setOfflineUser(resOffline)
  }, [dataUser])

  const playSound = () => {
    const audio = new Audio(soundNotif);
    audio.play();
  }

  if(wsChat && wsChat.readyState == 1) {
    if(router && router.pathname === "/dashboard/chats") {
      wsChat.onmessage = (msg) => {
        if((msg.data.indexOf("total_online") !== -1) && (msg.data.indexOf("total_offline") !== -1)) {
          setDataUser(JSON.parse(msg.data))
        }
        else {
          const dataMessage = JSON.parse(msg.data)
          let newMessage = [...message, dataMessage]
          newMessage = _.uniqBy(newMessage, 'chats_id')
          setMessage(newMessage)
          animateScroll.scrollToBottom({containerId: 'scrollableDiv'});
          if(user.id !== dataMessage.users_id) playSound()
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
      if(text.indexOf('img') !== -1) {
        wsChat.send(text)
        setText("")
      }
      else {
        let plainText = text.replace(/<[^>]+>/g, '');
        let finalText = plainText.replace(/&nbsp;/g, " ");
        if(!isEmpty(finalText)) {
          wsChat.send(text)
          setText("")
        }
      }

    }
  }

  const fetchMessage = () => {
    axios.get(`/chats/all-chats?page=${page+1}&per_page=${per_page}`)
      .then(res => {
        setPage(s => s + 1)
        setPage(res.data.page)
        if(res.data && res.data.length == 0) setHasMore(false)

        let newMessage = [...res.data.data.reverse(), ...message]
        newMessage = _.uniqBy(newMessage, 'chats_id')
        setMessage(newMessage)
      })
      .catch(() => {})
  }

  const fetchUser = () => {
    const copyUserOnline = [...dataUser.online_user]
    const copyUserOffline = [...dataUser.offline_user]

    const dataOnline = {
      list_id: copyUserOnline.slice(sliceStart, sliceEnd)
    }
    const dataOffline = {
      list_id: copyUserOffline.slice(sliceStartOffline, sliceEndOffline)
    }

    if(dataUser.online_user.length === onlineUser.length) {
      axios.post('/users/get-multiple-user', dataOffline)
        .then(res => {
          const copyUserOffline = [...offlineUser]

          setSliceStartOffline(s => s + init_slicing)
          setSliceEndOffline(s => s + init_slicing)

          let result = copyUserOffline.concat(res.data)
          result = _.uniqBy(result, 'id')
          setOfflineUser(result)
        })
        .catch(() => {
        })

    } else {
      axios.post('/users/get-multiple-user', dataOnline)
        .then(res => {
          const copyUserOnline = [...onlineUser]
          setSliceStart(s => s + init_slicing)
          setSliceEnd(s => s + init_slicing)
          let result = copyUserOnline.concat(res.data)
          result = _.uniqBy(result, 'id')
          setOnlineUser(result)
        })
        .catch(() => {
          setSliceStart(0)
          setSliceEnd(init_slicing)
        })
    }
  }

  return(
    <>
      <Card className="radius1rem shadow1 card-h-100 card-chat" bordered={false}>
        <Row gutter={[0,0]} className="h-100">
          <Col xl={18} lg={18} md={20} sm={20} xs={20} className="border-right">
            <div id="chat-content" className="chat-wrapper chat-content">
              <div
                id="scrollableDiv"
                className="chat-wrapper-inner"
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Image width={75} height={75} src={Loader1} alt="loader" />
                      <p className="text-grey">Loading message</p>
                    </motion.div>
                  ) : (
                    <>
                      {message && message.length > 0 ? message.map((msg, i) => (
                        <motion.div key={msg.chats_id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {setDate(i)}
                          <ChatItem 
                            name={msg.users_username}
                            time={msg.chats_created_at}
                            message={msg.chats_message}
                            avatar={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${msg.users_avatar}`}
                          />
                        </motion.div>
                      )) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
                          <Empty className="m-t-150 m-b-150" description={<span className="text-grey">No message</span>} /> 
                        </motion.div>
                      )}
                    </>
                  )}
                </InfiniteScroll>
              </div>
              <small className="display-none">
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

              <div id="scrollablePeople" className="chat-user-wrapper-inner" style={{ height: '100%', overflow: 'auto' }}>
                <InfiniteScroll
                  hasMore={true}
                  next={fetchUser}
                  dataLength={offlineUser.length + onlineUser.length}
                  scrollableTarget="scrollablePeople"
                >
                  {loadingInitUser ? (
                    <>
                      {[...Array(20)].map((_,i) => (
                        <Skeleton active avatar title={{ width: '100%' }} paragraph={{ rows: 0, width: '100%' }} key={i} />
                      ))}
                    </>
                  ) : (
                    <>
                      <h1 className="bold h5 caps ls-0">On{md && 'line'} {lg && `- ${total_online}`}</h1>
                      <AnimatePresence initial={false}>
                        {onlineUser && onlineUser.length > 0 && onlineUser.map(user => (
                          <PeopleChat
                            online
                            key={user.id}
                            name={user.username}
                            avatar={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${user.avatar}`}
                          />
                        ))}
                      </AnimatePresence>
                      <h1 className="bold h5 caps ls-0">Off{md && 'line'} {lg && `- ${total_offline}`}</h1>
                      <AnimatePresence initial={false}>
                        {offlineUser && offlineUser.length > 0 && offlineUser.map(user => (
                          <PeopleChat
                            key={user.id}
                            name={user.username}
                            avatar={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${user.avatar}`}
                          />
                        ))}
                      </AnimatePresence>
                    </>
                  )}
                </InfiniteScroll>
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
        :global(.chat-user-wrapper .infinite-scroll-component) {
          overflow: hidden !important;
        }
        .user-wrapper {
          overflow-y: scroll;
          overflow-x: hidden;
          height: 100%;
        }
        :global(.user-wrapper .infinite-scroll-component__outerdiv) {
          overflow-x: hidden!important;
          width: 100%;
        }
        :global(.infinite-scroll-component) {
          overflow-x: hidden!important;
        }
        :global(.user-wrapper .infinite-scroll-component) {
          overflow-x: hidden!important;
          overflow-y: scroll!important;
        }

        .chat-wrapper {
          overflow-y: scroll;
          overflow-x: hidden;
          height: calc(100vh - 100px - 35px - 100px - 0.5em);
        }

        :global(.chat-wrapper::-webkit-scrollbar, 
                .chat-wrapper-inner::-webkit-scrollbar, 
                .chat-user-wrapper-inner::-webkit-scrollbar,
                .chat-input .ql-toolbar.ql-snow::-webkit-scrollbar
                ) {
          height: 0;
          width: 0;  /* Remove scrollbar space */
          background: transparent;  /* Optional: just make scrollbar invisible */
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
