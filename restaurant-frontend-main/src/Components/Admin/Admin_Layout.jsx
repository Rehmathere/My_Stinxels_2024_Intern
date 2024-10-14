import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import My_Menu from "./Menu";
// CSS
import "./Menu_Admin.scss";
// Image
import logo from "../../assets/logo.png";

const Admin_Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className="bg-slate-300">
        <div className="demo-logo-vertical" />
        {/* - Logo Image -  */}
        <div className="menu_logo">
          <img src={logo} alt="logo" />
        </div>
        {/* - Menu Slider - */}
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="bg-slate-300"
          items={[
            {
              key: "1",
              icon: <ShopOutlined />,
              label: "Menu",
              style: { backgroundColor: '#BC0000', color: '#FFFFFF', borderRadius: "5px", fontSize: "15px", letterSpacing: "1px" },
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "10px",
              width: 64,
              height: 64,
              backgroundColor: "white",
              color: "#Bc0000",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            // width: "100%",
            // height: 660,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <My_Menu />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin_Layout;
