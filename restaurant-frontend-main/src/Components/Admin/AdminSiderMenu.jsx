import {
  CoffeeOutlined,
  ShopOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSiderMenu.scss"; // Import CSS file for hover effect

function AdminSiderMenu() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("0");

  const style = {
    borderRadius: "50px",
    fontSize: "15px",
    letterSpacing: "1.5px",
    display: "block",
    margin: "10px auto 0px auto",
    width: "90%",
    color: "white", // default color for inactive items
  };

  const activeStyle = {
    ...style,
    color: "#0a4621", // color for active item
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
            key: "0",
            icon: <HomeOutlined style={{ color: activeKey === "0" ? "#0a4621" : "white" }} />,
            label: "Dashboard",
            style: activeKey === "0" ? activeStyle : style,
            onClick: () => {
              setActiveKey("0");
              navigate("/admin/HomeDash");
            },
            className: activeKey !== "0" ? "menu-item-hover" : "",
          },
          {
            key: "1",
            icon: <CoffeeOutlined style={{ color: activeKey === "1" ? "#0a4621" : "white" }} />,
            label: "Menu",
            style: activeKey === "1" ? activeStyle : style,
            onClick: () => {
              setActiveKey("1");
              navigate("/admin/menu");
            },
            className: activeKey !== "1" ? "menu-item-hover" : "",
          },
          {
            key: "2",
            icon: <ShopOutlined style={{ color: activeKey === "2" ? "#0a4621" : "white" }} />,
            label: "Branch",
            style: activeKey === "2" ? activeStyle : style,
            onClick: () => {
              setActiveKey("2");
              navigate("/admin/branch");
            },
            className: activeKey !== "2" ? "menu-item-hover" : "",
          },
          {
            key: "3",
            icon: <CheckCircleOutlined style={{ color: activeKey === "3" ? "#0a4621" : "white" }} />,
            label: "Reservations",
            style: activeKey === "3" ? activeStyle : style,
            onClick: () => {
              setActiveKey("3");
              navigate("/admin/reservations");
            },
            className: activeKey !== "3" ? "menu-item-hover" : "",
          },
          {
            key: "4",
            icon: <ShoppingOutlined style={{ color: activeKey === "4" ? "#0a4621" : "white" }} />,
            label: "Orders",
            style: activeKey === "4" ? activeStyle : style,
            onClick: () => {
              setActiveKey("4");
              navigate("/admin/orders");
            },
            className: activeKey !== "4" ? "menu-item-hover" : "",
          },
        ]}
      />
    </>
  );
}

export default AdminSiderMenu;
