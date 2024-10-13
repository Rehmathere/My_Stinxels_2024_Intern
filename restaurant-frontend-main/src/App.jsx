import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import socket from "../src/Socket/socket";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "./Redux/Slices/MenuSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/home";

function App({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("connection", (message) => {
      // add socket ID to redux  state for personalized notifications after frontend
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

    return () => {
      socket.off("menu_item_added");
      socket.off("menu_item_updated");
      socket.off("menu_item_deleted");
    };
  }, []);
  return (
    <>
      {children}
    </>
  );
}

export default App;
