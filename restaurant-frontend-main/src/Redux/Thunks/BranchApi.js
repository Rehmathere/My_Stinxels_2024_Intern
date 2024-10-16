import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBranch,
  getBranch,
  updateBranch,
  deleteBranch,
} from "../../Api/Endpoints/ApiEndpoints";

export const getBranchThunk = createAsyncThunk(
  "getBranchThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getBranch();

      return { data: res?.data, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Fetch Record`,
      });
    }
  }
);

export const addBranchThunk = createAsyncThunk(
  "addBranchThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await addBranch(body);

      return { message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create Record`,
      });
    }
  }
);

export const updateBranchThunk = createAsyncThunk(
  "updateBranchThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await updateBranch(body);

      return { res, message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Update Record`,
      });
    }
  }
);

export const deleteBranchThunk = createAsyncThunk(
  "deleteBranchThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await deleteBranch(body);

      return { message: res?.data?.message };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Delete Record`,
      });
    }
  }
);
