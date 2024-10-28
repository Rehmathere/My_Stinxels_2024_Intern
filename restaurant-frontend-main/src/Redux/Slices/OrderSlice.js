import { createSlice } from "@reduxjs/toolkit";
import {
  addOrderThunk,
  getOrdersThunk,
  updateOrderStatusThunk,
} from "../Thunks/OrderApi";

const initialState = {
  status: "initails menu api status",
  message: "",
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    addOrder: (state, action) => {
      state.orders?.push(action.payload);
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      state.orders = state.orders?.map((orders) =>
        orders?._id == orderId ? { ...orders, status } : orders
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload.data;
    });

    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      console.log(action.payload);

      // add show Error toast here
    });
    builder.addCase(addOrderThunk.fulfilled, (state, action) => {});

    builder.addCase(addOrderThunk.rejected, (state, action) => {
      console.log(action.payload);

      // add show Error toast here
    });

    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {});

    builder.addCase(updateOrderStatusThunk.rejected, (state, action) => {
      console.log(action.payload);

      // add show Error toast here
    });
  },
});

export const { defaultReducer, addOrder, updateOrderStatus } =
  orderSlice.actions;

export default orderSlice.reducer;
