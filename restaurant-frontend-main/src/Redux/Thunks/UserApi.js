import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp } from "../../Api/Endpoints/ApiEndpoints";

export const signUpThunk = createAsyncThunk(
  "signUpThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await signUp(body);
      return {
        authToken: res.data,
        message: res?.response?.data?.error,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to Create User`,
      });
    }
  }
);

export const signInThunk = createAsyncThunk(
  "signInThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await signIn(body);

      return {
        authToken: res.data,
        message: res?.response?.data?.error,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed `,
      });
    }
  }
);
