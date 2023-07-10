import "./App.css";
import Rainbowkit from "./providers/evms/rainbowkit";
import { Menu, Layout, theme as antdTheme } from "antd";
import Evms from "./providers/evms";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  NavLink,
} from "react-router-dom";

const { Sider, Content } = Layout;
const CHAINS = [
  {
    key: "1",
    label: "EVMs",
    children: <Evms />,
  },
  {
    key: "2",
    label: "Solana",
    Content: "This is Solana content",
  },
  {
    key: "3",
    label: "SUI",
    Content: "This is SUI content",
  },
  {
    key: "4",
    label: "Aptos",
    Content: "This is Aptos content",
  },
];

function App() {
  const {
    token: { colorBgContainer },
  } = antdTheme.useToken();

  return (
    <Router>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          style={{ background: colorBgContainer }}
        >
          <Menu theme="light" mode="inline" style={{ height: "100%" }}>
            {CHAINS.map((chain) => (
              <Menu.Item key={chain.key}>
                <NavLink to={`/${chain.label.toLowerCase()}`}>
                  {chain.label}
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              background: colorBgContainer,
            }}
          >
            <Routes>
              {CHAINS.map((chain) => (
                <Route
                  key={chain.key}
                  path={`/${chain.label.toLowerCase()}`}
                  element={chain.children}
                />
              ))}
              <Route
                path="/"
                element={<p>Please select a chain from the menu</p>}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
