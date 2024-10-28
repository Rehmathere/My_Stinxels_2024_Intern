import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addOrder,
  getOrder,
  updateOrderStatus,
} from "../../Api/Endpoints/ApiEndpoints";

export const addOrderThunk = createAsyncThunk(
  "addOrderThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await addOrder(body);

      return { res, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
      });
    }
  }
);

export const getOrdersThunk = createAsyncThunk(
  "getOrdersThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getOrder();

      return { data: res?.data, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Fetch Record`,
      });
    }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "updateOrderStatusThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await updateOrderStatus(body);

      return { message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
      });
    }
  }
);
