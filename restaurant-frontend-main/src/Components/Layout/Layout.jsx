import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CoffeeOutlined,
  ShopOutlined,
  CheckCircleOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdTableRestaurant } from "react-icons/md";
import {
  Button,
  Dropdown,
  Badge,
  Divider,
  Avatar,
  Layout as AntdLayout,
  theme,
  Menu as AntdMenu,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./layout.scss"; // Import the SCSS file for styles
import { useNavigate, useLocation } from "react-router-dom";
import CartDrawer from "../User/CartDrawer/CartDrawer";
import { readAllNotifications } from "../../Redux/Slices/UserSlice";
import {
  inProgressOrders,
  completedOrders,
} from "../../Redux/Slices/OrderSlice";

const { Header, Sider, Content } = AntdLayout;

const Layout = ({ Menu, User = false }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cart = useSelector((state) => state.userSlice.cart);
  const notifications = useSelector((state) => state.userSlice.notifications);
  const unReadNotifications = useSelector(
    (state) => state.userSlice.unreadNotificationsCounter
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false); // To handle media query behavior
  const [showMyData, setShowMyData] = useState(false); // State to control My_Data visibility

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const notificationIcon = {
    order: <IoFastFoodOutline />,
    reservation: <MdTableRestaurant />,
  };

  console.log(location.pathname);

  const items = [
    {
      key: "1",
      label: (
        <div className="flex flex-col gap-3 ">
          {notifications?.map((notification) => (
            <>
              <div className="flex items-center gap-2 ">
                <Avatar icon={notificationIcon[notification?.icon]} />
                <p className="break-words max-w-[170px]">
                  {notification?.message}
                </p>
              </div>
              <hr />
            </>
          ))}
        </div>
      ),
    },
  ];
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
              <Menu />
              <div className="ShowData_Box_Part_3">
                <button>
                  <LogoutOutlined /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null; // Return null if not visible
  };

  const orderMenu = [
    {
      label: "In Progress Orders",
      key: "inProgress",
      onClick: () => dispatch(inProgressOrders()),
    },
    {
      label: "Completed Orders",
      key: "completed",
      onClick: () => dispatch(completedOrders()),
    },
  ];

  return (
    <>
      <CartDrawer open={openDrawer} setOpen={setOpenDrawer} />
      <AntdLayout>
        <Sider
          trigger={null}
          collapsible
          collapsed={isMobileView ? true : collapsed}
          className={`bg-green-950 ${collapsed ? "sider-collapsed" : ""}`}
        >
          <div className="demo-logo-vertical" />
          {/* Bottom */}

          {/* Bottom */}
          <div className="menu_logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="menu_content_wrapper">
            <Menu />
            <div
              className={
                collapsed
                  ? "MyBtnParent_Collapsed"
                  : "ShowData_Box_Part_3_Footer"
              }
            >
              <button>
                <LogoutOutlined /> Logout
              </button>
            </div>
          </div>
        </Sider>
        <AntdLayout>
          <Header
            style={{
              padding: 0,
              background: "white",
            }}
          >
            <div className="flex justify-between">
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
              <div className="flex gap-4 items-center pr-4">
                <Dropdown
                  onOpenChange={() => dispatch(readAllNotifications())}
                  menu={{ items }}
                  overlayStyle={{
                    maxHeight: "440px",
                    overflowY: "scroll",
                    maxWidth: "250px",
                    overflowX: "hidden",
                  }}
                >
                  <Badge count={unReadNotifications} color="green">
                    <Avatar
                      style={{ backgroundColor: "#0a4621", cursor: "pointer" }}
                      icon={<BellOutlined />}
                    />
                  </Badge>
                </Dropdown>
                {User && (
                  <Badge count={cart?.length} color="green">
                    <Avatar
                      style={{ backgroundColor: "#0a4621", cursor: "pointer" }}
                      onClick={() => setOpenDrawer(true)}
                      icon={<ShoppingCartOutlined />}
                    />
                  </Badge>
                )}
              </div>
            </div>
          </Header>
          {(location.pathname == "/admin/orders" ||
            location.pathname == "/user/order") && (
            <div className="border-2 border-t-stone-100">
              <AntdMenu
                mode="horizontal"
                items={orderMenu}
                defaultSelectedKeys={["inProgress"]}
              />
            </div>
          )}
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* <div className="max-h-[100vh] overflow-scroll"> */}
            <Outlet />
            {/* </div> */}
            {/* Call My_Data to display its content conditionally */}
            {My_Data()}
          </Content>
        </AntdLayout>
      </AntdLayout>
    </>
  );
};

export default Layout;
