import React, { useState } from "react";
import {
  CheckCircleOutlined,
  HomeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "../Admin/AdminSiderMenu.scss"; // Import CSS file for hover effect

function UserSiderMenu() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("1");

  const style = {
    color: "white", // Set color for inactive items
    borderRadius: "50px",
    fontSize: "15px",
    letterSpacing: "1px",
    display: "block",
    margin: "10px auto 0px auto",
    width: "90%",
  };

  const activeStyle = {
    ...style,
    color: "#0a4621", // Set color for active item
  };

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[activeKey]}
        className="bg-green-950"
        items={[
          {
            key: "1",
            icon: (
              <HomeOutlined
                style={{
                  color: activeKey === "1" ? "#0a4621" : "white", // Color for active/inactive icon
                }}
              />
            ),
            label: "Dashboard",
            style: activeKey === "1" ? activeStyle : style,
            onClick: () => {
              setActiveKey("1");
              navigate("/user/UserDash");
            },
            className: activeKey !== "1" ? "menu-item-hover" : "",
          },
          {
            key: "2",
            icon: (
              <ShoppingOutlined
                style={{
                  color: activeKey === "2" ? "#0a4621" : "white", // Color for active/inactive icon
                }}
              />
            ),
            label: "Order",
            style: activeKey === "2" ? activeStyle : style,
            onClick: () => {
              setActiveKey("2");
              navigate("/user/order");
            },
            className: activeKey !== "2" ? "menu-item-hover" : "",
          },
          {
            key: "3",
            icon: (
              <CheckCircleOutlined
                style={{
                  color: activeKey === "3" ? "#0a4621" : "white", // Color for active/inactive icon
                }}
              />
            ),
            label: "Reservation",
            style: activeKey === "3" ? activeStyle : style,
            onClick: () => {
              setActiveKey("3");
              navigate("/user/reservation");
            },
            className: activeKey !== "3" ? "menu-item-hover" : "",
          },
          {
            key: "4",
            icon: (
              <CheckCircleOutlined
                style={{
                  color: activeKey === "4" ? "#0a4621" : "white", // Color for active/inactive icon
                }}
              />
            ),
            label: "Menu",
            style: activeKey === "4" ? activeStyle : style,
            onClick: () => {
              setActiveKey("4");
              navigate("/user/menu");
            },
            className: activeKey !== "4" ? "menu-item-hover" : "",
          },
        ]}
      />
    </>
  );
}

export default UserSiderMenu;
