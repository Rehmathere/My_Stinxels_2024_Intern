import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./src/Redux/Slices/MenuSlice";

export const store = configureStore({
  reducer: {
    menuSlice,
  },
});
