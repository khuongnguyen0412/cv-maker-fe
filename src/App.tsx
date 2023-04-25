import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, theme } from "antd";
import HeaderComponent from "./components/header/HeaderComponent";
import MenuComponent from "./components/menu/MenuComponent";
import "./App.css";
import Home from "./pages/home";
import CVList from "./pages/cv";
import LogoComponent from "./components/logo/LogoComponent";

const { Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <LogoComponent />
          <MenuComponent />
        </Sider>
        <Layout>
          <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element=<Home /> />
              <Route path="/my-cv" element=<CVList /> />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
