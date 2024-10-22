import { createSlice } from "@reduxjs/toolkit";
import {
  addReservationThunk,
  updateReservationThunk,
  deleteReservationThunk,
  getReservationThunk,
} from "../Thunks/ReservationApi";

const initialState = {
  status: "initails menu api status",
  message: "",
  reservations: [],
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    defaultReducer: (state, action) => {},

    addReservation: (state, action) => {
      state.reservations?.push(action.payload);
    },
    updateReservation: (state, action) => {
      state.reservations = state.reservations?.map((reservation) =>
        reservation._id == action.payload._id ? action.payload : reservation
      );
    },
    deleteReservation: (state, action) => {
      state.reservations = state.reservations?.filter(
        (reservation) => reservation._id != action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReservationThunk.fulfilled, (state, action) => {
      state.reservations = action.payload.data;
    });

    builder.addCase(getReservationThunk.rejected, (state, action) => {
      console.log(action.payload);

      // add show Error toast here
    });
    builder.addCase(addReservationThunk.fulfilled, (state, action) => {});

    builder.addCase(addReservationThunk.rejected, (state, action) => {
      console.log(action.payload);

      // add show Error toast here
    });
    builder.addCase(updateReservationThunk.fulfilled, (state, action) => {
      const { time, ...restObj } = action.payload.data;
      console.log("in updateThunk Slice Reservation", restObj);

      // state.reservations = state.reservations?.map((reservation) => {
      //   console.log(reservation._id === restObj._id);

      //   if (reservation._id == restObj._id) {
      //     console.log(reservation._id, "      ", restObj._id);

      //     return { ...restObj };
      //   } else {
      //     return { ...reservation };
      //   }
      // });
    });

    builder.addCase(updateReservationThunk.rejected, (state, action) => {
      console.log(action.payload);

      // add show Error toast here
    });

    builder.addCase(deleteReservationThunk.fulfilled, (state, action) => {
      // state.reservations = state.reservations?.filter(
      //   (reservation) => reservation._id != action.payload._id
      // );
    });

    builder.addCase(deleteReservationThunk.rejected, (state, action) => {
      console.log(action.payload);

      // add show Error toast here
    });
  },
});

export const {
  defaultReducer,
  addReservation,
  updateReservation,
  deleteReservation,
} = reservationSlice.actions;

export default reservationSlice.reducer;
