import { CoffeeOutlined, ShopOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSiderMenu() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("1"); // Track the selected key

  const handleClick = (key, path) => {
    setSelectedKey(key);
    navigate(path);
  };

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        className="bg-green-950"
        items={[
          {
            key: "1",
            icon: <CoffeeOutlined />,
            label: "Menu",
            style: {
              backgroundColor: selectedKey === "1" ? "#052E16" : "#e7f0e7",
              color: selectedKey === "1" ? "white" : "#0a4621",
              borderRadius: "5px",
              fontSize: "15px",
              letterSpacing: "1px",
              display: "block",
              margin: "0px auto 0px auto",
              width: "92%",
            },
            onClick: () => handleClick("1", "/admin"),
          },
          {
            key: "2",
            icon: <ShopOutlined />,
            label: "Branch",
            style: {
              backgroundColor: selectedKey === "2" ? "#052E16" : "#e7f0e7",
              color: selectedKey === "2" ? "white" : "#0a4621",
              borderRadius: "5px",
              fontSize: "15px",
              letterSpacing: "1px",
              display: "block",
              margin: "10px auto 0px auto",
              width: "92%",
            },
            onClick: () => handleClick("2", "/admin/branch"),
          },
        ]}
      />
    </>
  );
}

export default AdminSiderMenu;
