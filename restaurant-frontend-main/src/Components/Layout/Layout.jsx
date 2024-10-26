import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CoffeeOutlined,
  ShopOutlined,
  CheckCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout as AntdLayout, theme } from "antd";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./layout.scss"; // Import the SCSS file for styles
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = AntdLayout;

const Layout = ({ Menu }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false); // To handle media query behavior
  const [showMyData, setShowMyData] = useState(false); // State to control My_Data visibility

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

  const handleToggle = () => {
    // Prevent Sider from opening if in mobile view (screen width <= 1000px)
    if (!isMobileView) {
      setCollapsed(!collapsed);
    }
    // Toggle the My_Data visibility
    setShowMyData(!showMyData);
  };

  // The My_Data function to display content
  const My_Data = () => {
    if (showMyData) {
      return (
        <div className="My_ShowData_Whole">
          <div className="My_ShowData_Whole_Sub">
            <div className="ShowData_Box">
              <div className="ShowData_Box_Part_0">
                <i
                  class="fa fa-times-circle"
                  onClick={() => {
                    setShowMyData(false);
                  }}
                ></i>
              </div>
              <div className="ShowData_Box_Part_1">
                <img src={logo} alt="NA" />
              </div>
              <div className="ShowData_Box_Part_2">
                <ul>
                  <li
                    onClick={() => {
                      navigate("/admin/menu");
                      setShowMyData(false);
                    }}
                  >
                    <CoffeeOutlined /> Menu
                  </li>
                  <li
                    onClick={() => {
                      navigate("/admin/branch");
                      setShowMyData(false);
                    }}
                  >
                    <ShopOutlined /> Branch
                  </li>
                  <li
                    onClick={() => {
                      navigate("/admin/reservations");
                      setShowMyData(false);
                    }}
                  >
                    <CheckCircleOutlined /> Reservations
                  </li>
                </ul>
              </div>
              {/* <div className="ShowData_Box_Part_3">
                <ul>
                  <li>
                    <LogoutOutlined /> Logout
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      );
    }
    return null; // Return null if not visible
  };

  return (
    <AntdLayout>
      <Sider
        trigger={null}
        collapsible
        collapsed={isMobileView ? true : collapsed}
        className={`bg-green-950 ${collapsed ? "sider-collapsed" : ""}`}
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
            onClick={handleToggle} // Toggle collapse and My_Data visibility
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
          {/* Call My_Data to display its content conditionally */}
          {My_Data()}
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
