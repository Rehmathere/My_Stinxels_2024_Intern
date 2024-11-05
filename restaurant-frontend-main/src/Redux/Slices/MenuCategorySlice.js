import { createSlice } from "@reduxjs/toolkit";
import {
  getMenuCategoryThunk,
  addMenuCategoryThunk,
  updateMenuCategoryThunk,
  deleteMenuCategoryThunk,
} from "../Thunks/MenuCategoryApi";
import {
  showSuccess,
  showError,
  showPending,
  removePending,
} from "../../Components/Toaster/Toaster";

const initialState = {
  status: "initails menu api status",
  message: "",
  menuCategory: [],
};

const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    addMenuCategory: (state, action) => {
      console.log("in add bracnh slice", action.payload);
      state.menuCategory.push(action.payload);
    },
    updateMenuCategory: (state, action) => {
      state.menuCategory = state.menuCategory?.map((branch) => {
        if (branch._id == action.payload._id) {
          return { ...action.payload };
        }
        return { ...branch };
      });
    },
    deleteMenuCategory: (state, action) => {
      const { _id } = action.payload;

      state.menuCategory = state.menuCategory?.filter(
        (branch) => branch._id != _id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuCategoryThunk.fulfilled, (state, action) => {
      state.menuCategory = action.payload.data;
    });
    builder.addCase(getMenuCategoryThunk.pending, (state, action) => {});

    builder.addCase(getMenuCategoryThunk.rejected, (state, action) => {
      showError(action.payload?.message);
    });
    builder.addCase(addMenuCategoryThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(addMenuCategoryThunk.pending, (state, action) => {
      showPending("Submitting Data ");
    });

    builder.addCase(addMenuCategoryThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });
    builder.addCase(updateMenuCategoryThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(updateMenuCategoryThunk.pending, (state, action) => {
      showPending("Updating Menu Category Data ");
    });
    builder.addCase(updateMenuCategoryThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });
    builder.addCase(deleteMenuCategoryThunk.fulfilled, (state, action) => {
      removePending();
    });
    builder.addCase(deleteMenuCategoryThunk.pending, (state, action) => {
      showPending("Deleting Menu Category  ");
    });

    builder.addCase(deleteMenuCategoryThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });
  },
});

export const { addMenuCategory, updateMenuCategory, deleteMenuCategory } =
  menuCategorySlice.actions;

export default menuCategorySlice.reducer;
