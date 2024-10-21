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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store.js";
import App from "../src/App.jsx";
import Menu from "./Components/Admin/Menu/Menu.jsx";
import Signup from "./Components/Authenticate/signup.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/home.jsx";
import About from "./Components/About/about.jsx";
import Contact from "./Components/Contact/contact.jsx";
import Branch from "./Components/Admin/Branch/Branch.jsx";
import Login from "./Components/Authenticate/login.jsx";
import AdminSiderMenu from "./Components/Admin/AdminSiderMenu.jsx";
import UserSiderMenu from "./Components/User/UserSiderMenu.jsx";
import Reservation from "./Components/User/Reservation/Reservation.jsx";

import ProtectedRoutes from "./Components/Routes/ProtectedRoutes.jsx";
import PublicRoutes from "./Components/Routes/PublicRoutes.jsx";

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
    ],
  },

  {
    path: "/admin",
    element: <Layout Menu={AdminSiderMenu} />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
        path: "branch",
        element: <Branch />,
      },
    ],
  },
  {
    path: "/user",
    element: <Layout Menu={UserSiderMenu} />,
    children: [
      {
        index: true,
        element: <Reservation />,
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
