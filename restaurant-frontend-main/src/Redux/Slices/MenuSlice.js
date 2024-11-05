import { createSlice } from "@reduxjs/toolkit";
import {
  addMenuThunk,
  getMenuThunk,
  updateMenuThunk,
  deleteMenuThunk,
} from "../Thunks/MenuApi";
import {
  showError,
  showPending,
  showSuccess,
  removePending,
} from "../../Components/Toaster/Toaster";
import { act } from "react";

const initialState = {
  status: "initails menu api status",
  message: "",
  menu: {},
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    addMenuItem: (state, action) => {
      if (!state.menu[action.payload.categoryId]) {
        state.menu[action.payload.categoryId] = [action.payload];
      } else {
        state.menu[action.payload.categoryId]?.push(action.payload);
      }
    },

    updateMenuItem: (state, action) => {
      const { _id, categoryId } = action.payload;
      state.menu[categoryId] = state.menu[categoryId]?.map((menuItem) => {
        if (menuItem._id == _id) {
          return { ...action.payload };
        }
        return menuItem;
      });
    },

    deleteMenuItem: (state, action) => {
      console.log(action.payload);
      const { categoryId } = action.payload;

      state.menu[categoryId] = state.menu[categoryId]?.filter(
        ({ _id }) => action.payload._id != _id
        // console.log(_id, " |||||  ", action.payload, action.payload._id == _id)
      );
    },

    deleteWholeCategory: (state, action) => {
      delete state.menu[action.payload._id];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.menu = action.payload.data;
    });
    builder.addCase(getMenuThunk.pending, (state, action) => {});
    builder.addCase(getMenuThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });

    builder.addCase(addMenuThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(addMenuThunk.pending, (state, action) => {
      showPending("Submitting Data ");
    });

    builder.addCase(addMenuThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });

    builder.addCase(updateMenuThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(updateMenuThunk.pending, (state, action) => {
      showPending("Updating Data ");
    });
    builder.addCase(updateMenuThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });

    builder.addCase(deleteMenuThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(deleteMenuThunk.pending, (state, action) => {
      showPending("Deleting Data ");
    });

    builder.addCase(deleteMenuThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });
  },
});

export const {
  defaultReducer,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  deleteWholeCategory,
} = menuSlice.actions;

export default menuSlice.reducer;
