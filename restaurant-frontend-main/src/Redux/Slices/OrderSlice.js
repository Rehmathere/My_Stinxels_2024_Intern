import { createSlice } from "@reduxjs/toolkit";
import {
  addOrderThunk,
  getOrdersThunk,
  updateOrderStatusThunk,
} from "../Thunks/OrderApi";

import {
  showError,
  showPending,
  showSuccess,
  removePending,
} from "../../Components/Toaster/Toaster";

const initialState = {
  status: "initails menu api status",
  message: "",
  filter: "inProgress",
  allOrders: [],
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    addOrder: (state, action) => {
      state.allOrders?.push(action.payload);
      state.orders = [...state.allOrders];
      if (state.filter == "inProgress") {
        state.orders = state.orders?.filter(
          (orders) =>
            orders.status == "Pending" || orders.status == "Prepairing"
        );
      } else {
        state.orders = state.orders?.filter(
          (orders) => orders.status == "Ready"
        );
      }
      // state.orders?.push(action.payload);
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      state.allOrders = state.allOrders?.map((orders) =>
        orders?._id == orderId ? { ...orders, status } : orders
      );
      state.orders = [...state.allOrders];
      if (state.filter == "inProgress") {
        state.orders = state.orders?.filter(
          (orders) =>
            orders.status == "Pending" || orders.status == "Prepairing"
        );
      } else {
        state.orders = state.orders?.filter(
          (orders) => orders.status == "Ready"
        );
      }
    },

    inProgressOrders: (state, action) => {
      state.filter = "inProgress";
      state.orders = [...state.allOrders];
      state.orders = state.orders?.filter(
        (orders) => orders.status == "Pending" || orders.status == "Prepairing"
      );
    },
    completedOrders: (state, action) => {
      state.filter = "ready";
      state.orders = [...state.allOrders];
      state.orders = state.orders?.filter((orders) => orders.status == "Ready");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload.data;
      state.allOrders = action.payload.data;
      state.orders = state.orders?.filter(
        (orders) => orders.status == "Pending" || orders.status == "Prepairing"
      );
    });

    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      console.log(action.payload);

      showError(action.payload?.message);
    });
    builder.addCase(addOrderThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(addOrderThunk.pending, (state, action) => {
      showPending("Submitting Data ");
    });

    builder.addCase(addOrderThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });

    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(updateOrderStatusThunk.pending, (state, action) => {
      showPending("Updating Status ");
    });

    builder.addCase(updateOrderStatusThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });
  },
});

export const {
  defaultReducer,
  addOrder,
  updateOrderStatus,
  inProgressOrders,
  completedOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
