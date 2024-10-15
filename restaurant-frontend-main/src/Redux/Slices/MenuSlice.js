import { createSlice } from "@reduxjs/toolkit";
import {
  addMenuThunk,
  getMenuThunk,
  updateMenuThunk,
  deleteMenuThunk,
} from "../Thunks/MenuApi";
import { act } from "react";

const initialState = {
  status: "initails menu api status",
  message: "",
  menu: {
    Chicken: [],
    Burger: [],
    Fries: [],
    Salads: [],
    Drinks: [],
    Sauces: [],
  },
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    addMenuItem: (state, action) => {
      state.menu[action.payload.category]?.push(action.payload);
    },

    updateMenuItem: (state, action) => {
      const { _id, category } = action.payload;
      state.menu[category] = state.menu[category]?.map((menuItem) => {
        if (menuItem._id == _id) {
          return { ...action.payload };
        }
        return menuItem;
      });
    },

    deleteMenuItem: (state, action) => {
      console.log(action.payload);
      const { category } = action.payload;

      state.menu[category] = state.menu[category]?.filter(
        ({ _id }) => action.payload._id != _id
        // console.log(_id, " |||||  ", action.payload, action.payload._id == _id)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);

      for (const [key, value] of Object.entries(action.payload.data)) {
        console.log(`${key}: ${value}`);
        state.menu[key] = value;
      }
    });

    builder.addCase(getMenuThunk.rejected, (state, action) => {
      // add show Error toast here
    });

    builder.addCase(addMenuThunk.fulfilled, (state, action) => {
      state.status = "success";
    });

    builder.addCase(addMenuThunk.rejected, (state, action) => {
      // add show Error toast here
    });

    builder.addCase(updateMenuThunk.fulfilled, (state, action) => {
      state.status = "success";
    });

    builder.addCase(updateMenuThunk.rejected, (state, action) => {
      // add show Error toast here
    });

    builder.addCase(deleteMenuThunk.fulfilled, (state, action) => {
      state.status = "success";
    });

    builder.addCase(deleteMenuThunk.rejected, (state, action) => {
      // add show Error toast here
    });
  },
});

export const { defaultReducer, addMenuItem, updateMenuItem, deleteMenuItem } =
  menuSlice.actions;

export default menuSlice.reducer;
