// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "../src/index.css";
// import {
//   createBrowserRouter,
//   Navigate,
//   RouterProvider,
// } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "../store.js";

// import Menu from "./Components/Admin/Menu/Menu.jsx";
// import Signup from "./Components/Authenticate/signup.jsx";
// import Layout from "./Components/Admin/Layout.jsx";
// import Home from "./Components/Home/home.jsx";
// import About from "./Components/About/about.jsx";
// import Branch from "./Components/Admin/Branch/Branch.jsx";
// import Admin_Layout from "./Components/Admin/Admin_Layout.jsx";
// import Login from "./Components/Authenticate/login.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/about",
//     element: <About />,
//   },
//   {
//     path: "/menu",
//     element: <Menu />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signUp",
//     element: <Signup />,
//   },
//   {
//     path: "/admin",
//     element: <Admin_Layout />,
//     children: [
//       {
//         index: true,
//         element: <Menu />,
//       },
//       {
//         path: "branch",
//         element: <Branch />,
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <App>
//         <RouterProvider router={router} />
//       </App>
//     </Provider>
//   </StrictMode>
// );

// ------------------------------------------------------

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../store.js";
import App from "../src/App.jsx";
import Menu from "./Components/Admin/Menu/Menu.jsx";
import Signup from "./Components/Authenticate/signup.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/home.jsx";
import ForgetPassword from "./Components/Authenticate/ForgetPassword/ForgetPassword.jsx";
import EnterOtp from "./Components/Authenticate/ForgetPassword/EnterOtp.jsx";
import About from "./Components/About/about.jsx";
import Contact from "./Components/Contact/contact.jsx";
import Branch from "./Components/Admin/Branch/Branch.jsx";
import Login from "./Components/Authenticate/login.jsx";
import AdminSiderMenu from "./Components/Admin/AdminSiderMenu.jsx";
import UserSiderMenu from "./Components/User/UserSiderMenu.jsx";
import Reservation from "./Components/User/Reservation/Reservation.jsx";
import Reservations from "./Components/Admin/Reservations/Reservations.jsx";
import MenuCategory from "./Components/Admin/MenuCategory/MenuCategory.jsx";

import ProtectedRoutes from "./Components/Routes/ProtectedRoutes.jsx";
import PublicRoutes from "./Components/Routes/PublicRoutes.jsx";
import HomeDash from "./Components/Admin/HomeDash/HomeDash.jsx";
import UserDash from "./Components/User/UserDash/UserDash.jsx";
import UserMenu from "./Components/User/Menu/Menu.jsx";

import Orders from "./Components/Admin/Orders/Orders.jsx";
import Order from "./Components/User/Order/Order.jsx";
import CreateNewPassword from "./Components/Authenticate/ForgetPassword/CreateNewPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <Signup />,
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "enterOtp",
        element: <EnterOtp />,
      },
      {
        path: "createNewPassword",
        element: <CreateNewPassword />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoutes allowedRole={["admin"]}>
        <Layout Menu={AdminSiderMenu} />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={"/admin/HomeDash"} />,
      },
      {
        path: "HomeDash",
        element: <HomeDash />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "menuCategory",
        element: <MenuCategory />,
      },
      {
        path: "branch",
        element: <Branch />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoutes allowedRole={["user"]}>
        <Layout Menu={UserSiderMenu} User={true} />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={"/user/UserDash"} />,
      },
      {
        path: "UserDash",
        element: <UserDash />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "menu",
        element: <UserMenu />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </Provider>
  </StrictMode>
);
