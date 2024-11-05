import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import socket from "../src/Socket/socket";
import viteLogo from "/vite.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  deleteWholeCategory,
} from "./Redux/Slices/MenuSlice";
import {
  addMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} from "./Redux/Slices/MenuCategorySlice";
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

import { setSocketId, addNotification } from "./Redux/Slices/UserSlice";
import { getUserId } from "./Utils/getUserId";
import { message } from "antd";

function App({ children }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const reservations = useSelector(
    (state) => state.reservationSlice.reservations
  );
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

    socket.on("menu_category_added", (message) => {
      console.log("menu_category_added added socket", message);

      dispatch(addMenuCategory(message));
    });

    socket.on("menu_category_updated", (message) => {
      console.log("menu_category_updated updated socket", message);

      dispatch(updateMenuCategory(message));
    });
    socket.on("menu_category_deleted", (message) => {
      console.log("menu_category_deleted delete socket", message);

      dispatch(deleteMenuCategory(message));
      dispatch(deleteWholeCategory(message));
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
      const { date } = message;

      if (role == "admin") {
        dispatch(addReservation(message));
        dispatch(
          addNotification({
            icon: "reservation",
            message: `A new Reservation has been made at ${date}`,
          })
        );
      } else if (_id == message.customerId) {
        dispatch(addReservation(message));
      }
    });

    socket.on("reservation_updated", (message) => {
      const { date } = message;
      const { role, _id } = getUserId();

      if (_id == message.customerId) {
        dispatch(updateReservation(message));
        dispatch(
          addNotification({
            icon: "reservation",
            message: `Reservation at ${date} has been updated `,
          })
        );
      } else if (role == "admin") {
        dispatch(updateReservation(message));
        dispatch(
          addNotification({
            icon: "reservation",
            message: `Reservation at ${date} has been updated `,
          })
        );
      }

      console.log("reservation_updated socket", message);
    });

    socket.on("reservation_deleted", (message) => {
      console.log("deted reservation ", message);
      const { role, _id } = getUserId();

      if (role == "admin") {
        dispatch(deleteReservation(message));
        dispatch(
          addNotification({
            icon: "reservation",
            message: `Your Reservation at ${message.date} has been updated `,
          })
        );
      } else if (_id == message.customerId) {
        dispatch(deleteReservation(message));
        dispatch(
          addNotification({
            icon: "reservation",
            message: `Your Reservation at ${message.date} has been updated `,
          })
        );
      }
    });

    socket.on("order_added", (message) => {
      console.log("order_added socket", message);
      const { role, _id } = getUserId();

      if (role == "admin") {
        dispatch(addOrder(message));
        dispatch(
          addNotification({
            icon: "order",
            message: `A new Order has been made at ${
              message.createdAt.split("T")[0]
            }`,
          })
        );
      } else if (_id == message.customerId) {
        dispatch(addOrder(message));
      }
    });

    socket.on("order_status_update", (message) => {
      console.log("order_status_update socket", message);
      const { role, _id } = getUserId();

      if (role == "admin") {
        dispatch(updateOrderStatus(message));
        dispatch(
          addNotification({
            icon: "order",
            message: `Order ID: ${message.orderId.slice(-5)} status is ${
              message.status
            }`,
          })
        );
      } else if (_id == message.customerId) {
        dispatch(updateOrderStatus(message));
        dispatch(
          addNotification({
            icon: "order",
            message: `Order ID: ${message.orderId.slice(-5)} status is ${
              message.status
            }`,
          })
        );
      }
    });

    return () => {
      socket.off("menu_item_added");
      socket.off("menu_item_updated");
      socket.off("menu_item_deleted");
      socket.off("menu_category_added");
      socket.off("menu_category_updated");
      socket.off("menu_category_deleted");
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
  return (
    <>
      {children} <ToastContainer />
    </>
  );
}

export default App;
