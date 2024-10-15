import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./src/Redux/Slices/MenuSlice";
import userSlice from "./src/Redux/Slices/UserSlice";

export const store = configureStore({
  reducer: {
    menuSlice,
    userSlice,
  },
});
