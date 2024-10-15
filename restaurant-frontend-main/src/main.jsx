import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store.js";

import Menu from "./Components/Admin/Menu/Menu.jsx";
import Signup from "./Components/Authenticate/signup.jsx";
import Login from "./Components/Authenticate/login.jsx";
import Layout from "./Components/Admin/Layout.jsx";
import Home from "./Components/Home/home.jsx";
import Admin_Layout from "./Components/Admin/Admin_Layout.jsx";
import About from "./Components/About/about.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
    // element: <Menu />,
  },
  {
    path: "/signUp",
    element: <Signup />,
  },
  {
    path: "/admin",
    element: <Admin_Layout />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </StrictMode>
);
