import { createSlice } from "@reduxjs/toolkit";
import {
  addReservationThunk,
  updateReservationThunk,
  deleteReservationThunk,
  getReservationThunk,
} from "../Thunks/ReservationApi";
import {
  showError,
  showPending,
  showSuccess,
  removePending,
} from "../../Components/Toaster/Toaster";

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
      showError(action.payload?.message);
    });

    builder.addCase(addReservationThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(addReservationThunk.pending, (state, action) => {
      showPending("Submitting Data");
    });
    builder.addCase(addReservationThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });

    builder.addCase(updateReservationThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(updateReservationThunk.pending, (state, action) => {
      showPending("Updating Reservation");
    });
    builder.addCase(updateReservationThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
    });

    builder.addCase(deleteReservationThunk.fulfilled, (state, action) => {
      removePending();
      showSuccess(action.payload?.message);
    });
    builder.addCase(deleteReservationThunk.pending, (state, action) => {
      showPending("Deleting Reservation");
    });
    builder.addCase(deleteReservationThunk.rejected, (state, action) => {
      removePending();
      showError(action.payload?.message);
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
