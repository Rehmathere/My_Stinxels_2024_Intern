import { createSlice } from "@reduxjs/toolkit";
import {
  addMenuThunk,
  getMenuThunk,
  updateMenuThunk,
  deleteMenuThunk,
} from "../Thunks/MenuApi";

const initialState = {
  status: "initails menu api status",
  message: "",
  menu: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    addMenuItem: (state, action) => {
      state.menu.push(action.payload);
    },

    updateMenuItem: (state, action) => {
      const { _id } = action.payload;
      state.menu = state.menu?.map((menuItem) => {
        if (menuItem._id == _id) {
          return { ...action.payload };
        }
        return menuItem;
      });
    },

    deleteMenuItem: (state, action) => {
      console.log(action.payload);

      state.menu = state.menu?.filter(
        ({ _id }) => action.payload != _id
        // console.log(_id, " |||||  ", action.payload, action.payload._id == _id)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuThunk.fulfilled, (state, action) => {
      state.menu = action.payload.data;
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
