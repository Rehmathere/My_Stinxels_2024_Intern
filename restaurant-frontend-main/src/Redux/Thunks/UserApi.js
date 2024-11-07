import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signIn,
  signUp,
  getUserInfo,
  forgetPassword,
  verifyOtp,
  createNewPassword,
} from "../../Api/Endpoints/ApiEndpoints";

export const signUpThunk = createAsyncThunk(
  "signUpThunk",
  async (body, { rejectWithValue }) => {
    try {
      console.log(body);

      const res = await signUp(body);
      return {
        navigate: body.navigate,
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
        navigate: body.navigate,
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

export const getUserInfoThunk = createAsyncThunk(
  "getUserInfoThunk",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getUserInfo();

      return {
        data: res.data,
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

export const forgetPasswordThunk = createAsyncThunk(
  "forgetPasswordThunk",
  async (body, { rejectWithValue }) => {
    try {
      const { navigate, ...emailBody } = body;
      console.log(emailBody);

      const res = await forgetPassword(emailBody);

      return {
        email: body.email,
        navigate,
        message: res?.data?.message,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to send OTP`,
      });
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  "verifyOtpThunk",
  async (body, { rejectWithValue }) => {
    try {
      const { navigate } = body;
      const res = await verifyOtp(body);
      console.log(res);

      return {
        passwordResetToken: res?.data,
        navigate,
        message: res?.data?.message ?? "Success",
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed to send OTP`,
      });
    }
  }
);

export const createNewPasswordThunk = createAsyncThunk(
  "createNewPasswordThunk",
  async (body, { rejectWithValue }) => {
    try {
      const { navigate } = body;
      const res = await createNewPassword(body);
      console.log(res);

      return {
        navigate,
        message: res?.data?.message ?? "Success",
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message:
          error?.response?.data?.error ?? `Failed to create new Password`,
      });
    }
  }
);
