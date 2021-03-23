import { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Home from 'pages/Home'
import Drawer from 'components/Drawer'
import Layout from 'components/Layout'
import SettingDrawer from 'components/Drawer/SettingDrawer'


export const HOME = "HOME", REPORT = "REPORT", SETTING = "SETTING", LOGOUT = "LOGOUT"

const App = () => {
  const [wsClient, setWsClient] = useState()
  const [activeMenu, setActiveMenu] = useState(HOME);
  const [showReport, setShowReport] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const onReportClose = () => {
    setActiveMenu(HOME)
    setShowReport(false)
  }

  const onSettingClose = () => {
    setActiveMenu(HOME)
    setShowSetting(false)
  }

  useEffect(() => {
    const wsConnect = () => {
      const ws = new W3CWebSocket(`ws://${process.env.REACT_APP_IP}/ws`);
      setWsClient(ws)

      ws.onopen = () => ws.send("Connected");

      ws.onmessage = msg => {
        console.log(JSON.parse(msg.data))
      }

      // set data from web socket
      //{"kind": "IoT", "sh": "28", "tds": "0", "ldr": "499", "ta": "0", "ph": "6.68"}
      //{"kind": "IoT", "sh": "28", "tds": "0", "ldr": "488", "ta": "0", "ph": "6.70"}
      //
      // set to setting value
      // kind:set_value,pu:8.2,pd:3.2,kp:12,kt:3,st:123

      ws.onclose = e => {
        console.log('Disconected.\nReconnect will be attempted in 1 second.', e.reason);
        setTimeout(() => {
          wsConnect();
        }, 1000);
      };
    }
    wsConnect()
  }, [])

  return (
    <>
      <Layout
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setShowReport={setShowReport}
        setShowSetting={setShowSetting}
      >
        <Home />
      </Layout>

      {/* Drawer for reports */}
      <Drawer 
        show={showReport}
        title="Reports"
        close={onReportClose}
      >
        <p>asd</p>
      </Drawer>
      {/* Drawer for reports */}

      {/* Drawer for Settings */}
      <Drawer 
        show={showSetting}
        title="Settings Value"
        close={onSettingClose}
      >
        <SettingDrawer 
          wsClient={wsClient}
        />
      </Drawer>
      {/* Drawer for Settings */}
    </>
  );
}

export default App;
