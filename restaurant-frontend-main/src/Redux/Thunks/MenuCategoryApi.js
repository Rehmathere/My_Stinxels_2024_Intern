import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMenuCategory,
  updateMenuCategory,
  addMenuCategory,
  deleteMenuCategory,
} from "../../Api/Endpoints/ApiEndpoints";

export const getMenuCategoryThunk = createAsyncThunk(
  "getMenuCategoryThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getMenuCategory();

      return { data: res?.data, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Fetch Record`,
      });
    }
  }
);

export const addMenuCategoryThunk = createAsyncThunk(
  "addMenuCategoryThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await addMenuCategory(body);

      return { message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
      });
    }
  }
);

export const updateMenuCategoryThunk = createAsyncThunk(
  "updateMenuCategoryThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await updateMenuCategory(body);

      return { res, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Update Record`,
      });
    }
  }
);

export const deleteMenuCategoryThunk = createAsyncThunk(
  "deleteMenuCategoryThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await deleteMenuCategory(body);

      return { message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Delete Record`,
      });
    }
  }
);
