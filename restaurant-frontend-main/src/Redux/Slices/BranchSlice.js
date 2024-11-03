import { createSlice } from "@reduxjs/toolkit";
import {
  addBranchThunk,
  getBranchThunk,
  updateBranchThunk,
  deleteBranchThunk,
} from "../Thunks/BranchApi";
import {
  showSuccess,
  showError,
  showPending,
  removePending,
} from "../../Components/Toaster/Toaster";

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
    builder.addCase(getBranchThunk.pending, (state, action) => {});

    builder.addCase(getBranchThunk.rejected, (state, action) => {
      showError(action.payload?.message);
    });
    builder.addCase(addBranchThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(addBranchThunk.pending, (state, action) => {
      showPending("Submitting Data ");
    });

    builder.addCase(addBranchThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });
    builder.addCase(updateBranchThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(updateBranchThunk.pending, (state, action) => {
      showPending("Updating Branch Data ");
    });
    builder.addCase(updateBranchThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });
    builder.addCase(deleteBranchThunk.fulfilled, (state, action) => {
      removePending();
    });
    builder.addCase(deleteBranchThunk.pending, (state, action) => {
      showPending("Deleting Branch  ");
    });

    builder.addCase(deleteBranchThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });
  },
});

export const { addBranch, updateBranch, deleteBranch } = branchSlice.actions;

export default branchSlice.reducer;
