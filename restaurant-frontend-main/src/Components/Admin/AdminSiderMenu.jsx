import { CoffeeOutlined, ShopOutlined, CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminSiderMenu() {
  const navigate = useNavigate();
  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="bg-green-950"
        // style={{ backgroundColor: "#0a4621", }}
        items={[
          {
            key: "0",
            icon: <HomeOutlined />,
            label: "Dashboard",
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
            // Add navigation for "Menu" label
            onClick: () => navigate("/admin/HomeDash"),
          },
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
              margin: "10px auto 0px auto",
              width: "92%",
            },
            // Add navigation for "Menu" label
            onClick: () => navigate("/admin/menu"),
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
          {
            key: "3",
            icon: <CheckCircleOutlined />,
            label: "Reservations",
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
            onClick: () => navigate("/admin/reservations"),
          },
        ]}
      />
    </>
  );
}

export default AdminSiderMenu;
