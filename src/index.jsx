import React from 'react'
import ReactDOM from 'react-dom'
import 'assets/css/index.css'
import 'assets/css/utility.css'
import App from './App'
import 'antd/dist/antd.css'
import 'assets/fontawesome/css/all.min.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
