import { Routes, Route } from "react-router-dom";
import { Layout, theme as antdTheme } from "antd";

import ChainLoader from "views/chainLoader";
import Sidebar from "components/sidebar";
import Brand from "components/brand";

const { Sider, Header, Footer, Content } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = antdTheme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Brand theme="dark" />
      </Header>
      <Content style={{ height: "100%" }}>
        <Layout style={{ height: "100%" }}>
          <Sider trigger={null} collapsible style={{ background: colorBgContainer }}>
            <Sidebar />
          </Sider>
          <Content
            style={{
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<ChainLoader />} />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;
