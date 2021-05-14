import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Row, Col, Button, Input, Divider } from 'antd'

import Pagination from 'components/Pagination'

import React from 'react'
import dynamic from 'next/dynamic'
import CardLoading from 'components/Card/CardLoading'

const CardLoadingMemo = React.memo(CardLoading)
const CardDocs = dynamic(() => import('components/Card/Docs'), { ssr: false, loading: () => <CardLoadingMemo />  })
const CardDocsMemo = React.memo(CardDocs)

const DataPage = ({ d }) => (
  <div id={d}>
    <h1 className="entry-title">
      <b>{d} Getting Started with VS Code and PlatformIO IDE for ESP32 and ESP8266 (Windows, Mac OS X, Linux Ubuntu)</b>
    </h1>
    {[...Array(4)].map((_,i) => (
      <div key={i}>
        <p><br /></p>
        <p>Learn how to program the ESP32 and ESP8266 NodeMCU boards using VS Code (Microsoft Visual Studio Code) with PlatformIO IDE extension. We cover how to install the software on Windows, Mac OS X or Ubuntu operating systems.</p>
      </div>
    ))}
  </div>


)

const Documentation = () => {
  const router = useRouter()
  const [page, setPage] = useState(2)

  const isDocs = router.pathname.startsWith('/docs')

  useEffect(() => {
    if(isDocs){
      document.body.classList.add("bg-white")
    }
    else{
      document.body.classList.remove("bg-white")
    }
    return () => document.body.classList.remove("bg-white")
  }, [isDocs])

  return(
    <>

      {[...Array(40)].map((_, i) => (
        <DataPage d={i} key={i} />
      ))}

      <style jsx>{`

      `}</style>
    </>
  )
}

export default Documentation
