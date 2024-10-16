import { createSlice } from "@reduxjs/toolkit";
import {
  addBranchThunk,
  getBranchThunk,
  updateBranchThunk,
  deleteBranchThunk,
} from "../Thunks/BranchApi";

const initialState = {
  status: "initails menu api status",
  message: "",
  branches: [],
};

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    addBranch: (state, action) => {
      console.log("in add bracnh slice", action.payload);
      state.branches.push(action.payload);
    },
    updateBranch: (state, action) => {
      state.branches = state.branches?.map((branch) => {
        if (branch._id == action.payload._id) {
          return { ...action.payload };
        }
        return { ...branch };
      });
    },
    deleteBranch: (state, action) => {
      const { _id } = action.payload;

      state.branches = state.branches?.filter((branch) => branch._id != _id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBranchThunk.fulfilled, (state, action) => {
      state.branches = action.payload.data;
    });

    builder.addCase(getBranchThunk.rejected, (state, action) => {
      // add show Error toast here
    });
    builder.addCase(addBranchThunk.fulfilled, (state, action) => {});

    builder.addCase(addBranchThunk.rejected, (state, action) => {
      // add show Error toast here
    });
    builder.addCase(updateBranchThunk.fulfilled, (state, action) => {});

    builder.addCase(updateBranchThunk.rejected, (state, action) => {
      // add show Error toast here
    });
    builder.addCase(deleteBranchThunk.fulfilled, (state, action) => {});

    builder.addCase(deleteBranchThunk.rejected, (state, action) => {
      // add show Error toast here
    });
  },
});

export const { addBranch, updateBranch, deleteBranch } = branchSlice.actions;

export default branchSlice.reducer;
