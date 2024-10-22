import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addReservation,
  updateReservation,
  deleteReservation,
  getReservation,
} from "../../Api/Endpoints/ApiEndpoints";

export const getReservationThunk = createAsyncThunk(
  "getReservationThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getReservation();

      return { data: res?.data, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Fetch Record`,
      });
    }
  }
);

export const addReservationThunk = createAsyncThunk(
  "addReservationThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await addReservation(body);

      return { data: res.data, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
      });
    }
  }
);

export const updateReservationThunk = createAsyncThunk(
  "updateReservationThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await updateReservation(body);

      return { data: body, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
      });
    }
  }
);

export const deleteReservationThunk = createAsyncThunk(
  "deleteReservationThunk",
  async (body, { rejectWithValue }) => {
    try {
      const { _id, customerId } = body;
      const deleteParam = new URLSearchParams({
        _id,
        customerId,
      });
      const res = await deleteReservation(deleteParam);
      console.log("boyd delete", body);

      return { _id, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Delete Record`,
      });
    }
  }
);
