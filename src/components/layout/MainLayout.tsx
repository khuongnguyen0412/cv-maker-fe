import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import "../../App.css";
import LogoComponent from "../logo/LogoComponent";
import MenuComponent from "../menu/MenuComponent";
import HeaderComponent from "../header/HeaderComponent";

const { Sider, Content } = Layout;

function MainLayout(props: any) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    setIsAdmin(localStorage.getItem("token") ? true : false);
    console.log("isAdmin", isAdmin);
  });

  return (
    <Layout style={{minHeight:"100vh"}}>
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
          {props?.children}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
