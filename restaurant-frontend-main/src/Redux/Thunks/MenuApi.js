import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addMenu,
  getMenu,
  updateMenu,
  deleteMenu,
} from "../../Api/Endpoints/ApiEndpoints";

export const getMenuThunk = createAsyncThunk(
  "getMenuThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getMenu();

      return { data: res?.data, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Fetch Record`,
      });
    }
  }
);

export const addMenuThunk = createAsyncThunk(
  "addMenuThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await addMenu(body);

      return { res, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
      });
    }
  }
);

export const updateMenuThunk = createAsyncThunk(
  "updateMenuThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await updateMenu(body);

      return { res, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Update Record`,
      });
    }
  }
);

export const deleteMenuThunk = createAsyncThunk(
  "deleteMenuThunk",
  async (body, { rejectWithValue }) => {
    try {
      console.log(body, "body delete");

      const res = await deleteMenu(body);

      return { message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Delete Record`,
      });
    }
  }
);
