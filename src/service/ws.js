import { w3cwebsocket as W3CWebSocket } from "websocket";

// create new connection for websocket

const wsConnect = () => {
  const ws = new W3CWebSocket(`ws://${process.env.REACT_APP_IP}/ws`);

  ws.onopen = function() {
    ws.send(JSON.stringify({ "success": "masuk broo" }));
  };

  ws.onmessage = msg => {
    console.log(msg.data)
  }

  ws.onclose = e => {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(() => {
      wsConnect();
    }, 1000);
  };

  return {
    ws,
    messageData: ws.onmessage
  }
}

wsConnect()

export default wsConnect
