import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout, theme as antdTheme } from 'antd'

import ChainLoader from 'views/ChainLazyload'
import Sidebar from 'components/sidebar'
import Brand from 'components/brand'
import ProtectedExtension from 'views/protectedExtension'

const { Sider, Header, Footer, Content } = Layout

function App() {
  const {
    token: { colorBgContainer },
  } = antdTheme.useToken()

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Brand theme="dark" />
      </Header>
      <Content style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <Sider
            trigger={null}
            collapsible
            style={{ background: colorBgContainer }}
          >
            <Sidebar />
          </Sider>
          <Content
            style={{
              padding: 24,
            }}
          >
            <ProtectedExtension>
              <Routes>
                <Route path="/:chain" element={<ChainLoader />} />
                <Route path="*" element={<Navigate to="/evm" />} />
              </Routes>
            </ProtectedExtension>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center', background: colorBgContainer }}>
        Desig Connector ©2023 Created by Desig Labs
      </Footer>
    </Layout>
  )
}

export default App
