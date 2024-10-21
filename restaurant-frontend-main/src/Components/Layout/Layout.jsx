import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout as AntdLayout, theme } from "antd";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./layout.scss"; // Import the SCSS file for styles

const { Header, Sider, Content } = AntdLayout;

const Layout = ({ Menu }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false); // To handle media query behavior

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Effect to handle window resize and update mobile view state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setIsMobileView(true);
        setCollapsed(true); // Automatically collapse when screen is <= 1000px
      } else {
        setIsMobileView(false);
        setCollapsed(false); // Ensure Sider is open on larger screens
      }
    };

    handleResize(); // Run on initial load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AntdLayout>
      <Sider
        trigger={null}
        collapsible
        collapsed={isMobileView ? true : collapsed} // Automatically collapse on mobile
        className={`bg-green-950 ${collapsed ? "sider-collapsed" : ""}`} // Add class for media query handling
      >
        <div className="demo-logo-vertical" />
        <div className="menu_logo">
          <img src={logo} alt="logo" />
        </div>
        <Menu />
      </Sider>
      <AntdLayout>
        <Header
          style={{
            padding: 0,
            background: "white",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)} // Toggle collapse on click
            className="collapsed-button"
            style={{
              fontSize: "10px",
              width: 64,
              height: 64,
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
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
