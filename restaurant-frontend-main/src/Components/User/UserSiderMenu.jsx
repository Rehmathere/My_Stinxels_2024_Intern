import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
function UserSiderMenu() {
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
            key: "1",
            icon: <CheckCircleOutlined />,
            label: "Reservation",
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
            onClick: () => navigate("/user"),
          },
          //   {
          //     key: "2",
          //     icon: <ShopOutlined />,
          //     label: "Branch",
          //     style: {
          //       backgroundColor: "#e7f0e7",
          //       color: "#0a4621",
          //       borderRadius: "5px",
          //       fontSize: "15px",
          //       letterSpacing: "1px",
          //       display: "block",
          //       margin: "10px auto 0px auto",
          //       width: "92%",
          //     },
          //     // Add navigation for "Branch" label
          //     onClick: () => navigate("/admin/branch"),
          //   },
        ]}
      />
    </>
  );
}

export default UserSiderMenu;
