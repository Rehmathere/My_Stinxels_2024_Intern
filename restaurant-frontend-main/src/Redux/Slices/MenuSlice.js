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

export const { defaultReducer, addMenuItem, updateMenuItem, deleteMenuItem } =
  menuSlice.actions;

export default menuSlice.reducer;
