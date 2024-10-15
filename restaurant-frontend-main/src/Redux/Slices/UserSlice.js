import { createSlice } from "@reduxjs/toolkit";
import { signInThunk, signUpThunk } from "../Thunks/UserApi";

const initialState = {
  status: "initails menu api status",
  message: "",
  socketId: "",
  _id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    setSocketId: (state, action) => {
      state.socketId = action.payload.socketId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      console.log(action.payload.authToken);
    });

    builder.addCase(signUpThunk.rejected, (state, action) => {
      // add show Error toast here
    });

    builder.addCase(signInThunk.fulfilled, (state, action) => {});

    builder.addCase(signInThunk.rejected, (state, action) => {
      // add show Error toast here
    });
  },
});

export const { setSocketId } = userSlice.actions;

export default userSlice.reducer;
