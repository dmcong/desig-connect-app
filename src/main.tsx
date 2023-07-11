import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'

import App from './App.tsx'
import 'index.css'

import { generateTheme } from 'styles/themes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={generateTheme('light')}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
