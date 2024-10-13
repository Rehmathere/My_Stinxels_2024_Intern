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

import Menu from "./Components/Admin/Menu.jsx";
import Layout from "./Components/Admin/Layout.jsx";
// Files
import Home from "./Components/Home/home.jsx";
import Login from "./Components/Authenticate/login.jsx";
import Signup from "./Components/Authenticate/signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/admin",
    element: <Layout />,
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
