import { Divider } from 'antd'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import React from 'react'
import slugify from 'react-slugify'

import {menuItems} from 'components/Layout/docs'

const DataPage = ({ id, title }) => (
  <div id={id} className="section-docs">
    <h1 className="entry-title">
      <b>{title} - Getting Started with VS Code and PlatformIO IDE</b>
    </h1>
    {[...Array(4)].map((_,i) => (
      <div key={i}>
        <p>Learn how to program the ESP32 and ESP8266 NodeMCU boards using VS Code (Microsoft Visual Studio Code) with PlatformIO IDE extension. We cover how to install the software on Windows, Mac OS X or Ubuntu operating systems.</p>
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
    ))}
    <Divider />
  </div>
)

const Documentation = () => {
  const router = useRouter()

  const isDocs = router.pathname.startsWith('/docs')

  useEffect(() => {
    if(isDocs) document.body.classList.add("bg-white")
    else document.body.classList.remove("bg-white")
    return () => document.body.classList.remove("bg-white")
  }, [isDocs])

  return(
    <>
      {menuItems.map(menu => (
        <div key={slugify(menu.category)}>
          {menu.items.map(item => (
            <DataPage id={slugify(item.title)} title={item.title} key={slugify(item.title)} />
          ))}
        </div>
      ))}

      <style jsx>{`
        :global(.section-docs) {
          padding-top: 80px;
          margin-top: -80px;
        }
      `}</style>
    </>
  )
}

export default Documentation
