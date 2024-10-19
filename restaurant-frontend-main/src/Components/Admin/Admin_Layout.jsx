import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
const { Header, Sider, Content } = Layout;
import My_Menu from "./Menu/Menu";
import Branch from "./Branch/Branch"; // Import the Branch component
// CSS
import "./Menu/Menu_Admin.scss";
// Image
import logo from "../../assets/logo.png";

const Admin_Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate(); // Initialize navigate function for routing

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-green-950"
        // style={{ backgroundColor: "#CBD5E1", }}
      >
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
          className="bg-green-950"
          // style={{ backgroundColor: "#0a4621", }}
          items={[
            {
              key: "1",
              icon: <CoffeeOutlined />,
              label: "Menu",
              style: {
                backgroundColor: "#e7f0e7",
                color: "#0a4621",
                borderRadius: "5px",
                fontSize: "15px",
                letterSpacing: "1px",
                display: "block",
                margin: "0px auto 0px auto",
                width: "92%",
              },
              // Add navigation for "Menu" label
              onClick: () => navigate("/admin"),
            },
            {
              key: "2",
              icon: <ShopOutlined />,
              label: "Branch",
              style: {
                backgroundColor: "#e7f0e7",
                color: "#0a4621",
                borderRadius: "5px",
                fontSize: "15px",
                letterSpacing: "1px",
                display: "block",
                margin: "10px auto 0px auto",
                width: "92%",
              },
              // Add navigation for "Branch" label
              onClick: () => navigate("/admin/branch"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            // background: "#7aa894",
            background: "white",
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
              // backgroundColor: "#7aa894",
              backgroundColor: "white",
              color: "#0a4621",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin_Layout;
