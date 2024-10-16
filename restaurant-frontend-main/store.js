import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./src/Redux/Slices/MenuSlice";
import userSlice from "./src/Redux/Slices/UserSlice";
import branchSlice from "./src/Redux/Slices/BranchSlice";

export const store = configureStore({
  reducer: {
    menuSlice,
    userSlice,
    branchSlice,
  },
});
