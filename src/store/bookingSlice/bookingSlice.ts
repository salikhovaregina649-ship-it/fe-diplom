import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BookingState } from "./types";

const initialState: BookingState = {
    selectedRouteId: null,
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setSelectedRouteId(state, action: PayloadAction<string>) {
            state.selectedRouteId = action.payload;
        },
    },
});

export const {setSelectedRouteId} = bookingSlice.actions;
export default bookingSlice.reducer;