import { createSlice } from "@reduxjs/toolkit";
import { signInThunk, signUpThunk, getUserInfoThunk } from "../Thunks/UserApi";

const initialState = {
  status: "initails menu api status",
  message: "",
  socketId: "",
  _id: "",
  cart: [],
  address: "",
  userInfo: {},
  notifications: [
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at  has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "order",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
    // {
    //   icon: "reservation",
    //   message: `Your Reservation at    has been updated `,
    // },
  ],
  unreadNotificationsCounter: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},
    setSocketId: (state, action) => {
      state.socketId = action.payload.socketId;
    },

    addToCart: (state, action) => {
      const index = state.cart?.findIndex(
        (item) => item._id == action.payload._id
      );

      if (index == -1) {
        state.cart?.push({
          ...action.payload,
          qty: 1,
          // total: action.payload.price,
        });
      } else {
        state.cart[index].qty += 1;
        // state.cart[index].total =
        //   state.cart[index].qty * state.cart[index].price;
      }
    },

    decrementQty: (state, action) => {
      const index = state.cart?.findIndex(
        (item) => item._id == action.payload._id
      );
      console.log(state.cart[index].qty);

      if (state.cart[index].qty == 1) {
        state.cart = state.cart?.filter(({ _id }) => _id != action.payload._id);
      } else {
        state.cart[index].qty -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart?.filter(({ _id }) => _id != action.payload._id);
    },

    emptyCart: (state, action) => {
      state.cart = [];
    },

    addNotification: (state, action) => {
      state.notifications?.unshift(action.payload);
      state.unreadNotificationsCounter += 1;
    },
    readAllNotifications: (state, action) => {
      state.unreadNotificationsCounter = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      const { navigate, authToken } = action.payload;
      localStorage.setItem("token", authToken);
      navigate("/admin");
    });

    builder.addCase(signUpThunk.rejected, (state, action) => {
      // add show Error toast here
    });

    builder.addCase(signInThunk.fulfilled, (state, action) => {
      const { navigate, authToken } = action.payload;
      localStorage.setItem("token", authToken);
      navigate("/admin");
    });

    builder.addCase(signInThunk.rejected, (state, action) => {
      // add show Error toast here
    });

    builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
      state.address = action.payload.data.address;
      state.userInfo = action.payload.data;
    });

    builder.addCase(getUserInfoThunk.rejected, (state, action) => {
      // add show Error toast here
    });
  },
});

export const {
  setSocketId,
  addToCart,
  decrementQty,
  removeFromCart,
  emptyCart,
  addNotification,
  readAllNotifications,
} = userSlice.actions;

export default userSlice.reducer;
