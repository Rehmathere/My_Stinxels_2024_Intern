import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import socket from "../src/Socket/socket";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "./Redux/Slices/MenuSlice";
import {
  addBranch,
  updateBranch,
  deleteBranch,
} from "./Redux/Slices/BranchSlice";
import {
  addReservation,
  updateReservation,
  deleteReservation,
} from "./Redux/Slices/ReservationSlice";
import { addOrder, updateOrderStatus } from "./Redux/Slices/OrderSlice";
import { Navigate, useNavigate } from "react-router-dom";

import { setSocketId } from "./Redux/Slices/UserSlice";
import { getUserId } from "./Utils/getUserId";
import { message } from "antd";

function App({ children }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const socketId = useSelector((state) => state.userSlice.socketId);

  useEffect(() => {
    socket.on("connection", (message) => {
      dispatch(setSocketId(message));
    });

    socket.on("sign_up_successfull", () => {
      console.log("sign Up event ran here");

      <Navigate to={"/admin"} />;
    });

    socket.on("menu_item_added", (message) => {
      console.log("new menu  item added server", message);
      dispatch(addMenuItem(message));
    });

    socket.on("menu_item_updated", (message) => {
      console.log(" menu  item updated server", message);
      dispatch(updateMenuItem(message));
    });

    socket.on("menu_item_deleted", (message) => {
      console.log(" menu  item deleted server", message);
      dispatch(deleteMenuItem(message));
    });

    socket.on("branch_added", (message) => {
      console.log("branch added socket", message);

      dispatch(addBranch(message));
    });

    socket.on("branch_updated", (message) => {
      console.log("branch updated socket", message);

      dispatch(updateBranch(message));
    });
    socket.on("branch_deleted", (message) => {
      console.log("branch delete socket", message);

      dispatch(deleteBranch(message));
    });

    socket.on("reservation_added", (message) => {
      console.log("reservation_added socket", message);
      const { role, _id } = getUserId();

      if (role == "admin") {
        dispatch(addReservation(message));
      } else if (_id == message.customerId) {
        dispatch(addReservation(message));
      }
    });

    socket.on("reservation_updated", (message) => {
      console.log("admin trigrred update reservation");

      const { role, _id } = getUserId();

      if (role == "admin") {
        dispatch(updateReservation(message));
      } else if (_id == message.customerId) {
        dispatch(updateReservation(message));
      }
      console.log("reservation_updated socket", message);
    });

    socket.on("reservation_deleted", (message) => {
      console.log("deted reservation ", message);
      const { role, _id } = getUserId();

      if (role == "admin") {
        dispatch(deleteReservation(message));
      } else if (_id == message.customerId) {
        dispatch(deleteReservation(message));
      }
    });

    socket.on("order_added", (message) => {
      console.log("order_added socket", message);
      const { role, _id } = getUserId();

      if (role == "admin") {
        dispatch(addOrder(message));
      } else if (_id == message.customerId) {
        dispatch(addOrder(message));
      }
    });

    socket.on("order_status_update", (message) => {
      console.log("order_status_update socket", message);
      const { role, _id } = getUserId();

      if (role == "admin") {
        dispatch(updateOrderStatus(message));
      } else if (_id == message.customerId) {
        dispatch(updateOrderStatus(message));
      }
    });

    return () => {
      socket.off("menu_item_added");
      socket.off("menu_item_updated");
      socket.off("menu_item_deleted");
      socket.off("branch_added");
      socket.off("branch_updated");
      socket.off("branch_deleted");
      socket.off("reservation_added");
      socket.off("reservation_updated");
      socket.off("reservation_deleted");
      socket.off("order_added");
      socket.off("order_status_update");
    };
  }, []);
  return <>{children}</>;
}

export default App;
