import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { seatsFormState, TicketsInfo } from "./types";

const initialState: seatsFormState = {
    currentClass: null,
    selectedCoaches: [],
    tickets: {
        adult: 1,
        childWithSeat: 0,
        childWithoutSeat: 0,
    },
};

const seatsFormSlice = createSlice({
    name: "seatsForm",
    initialState,
    reducers: {
        setCurrentClass(state, action: PayloadAction<string | null>) {
            state.currentClass = action.payload;
        },
        addCoach(state, action: PayloadAction<string>) {
            if (!state.selectedCoaches.includes(action.payload)) {
                state.selectedCoaches.push(action.payload);
            }
        },
        removeCoach(state, action: PayloadAction<string>) {
            state.selectedCoaches = state.selectedCoaches.filter(
                (coach) => coach !== action.payload,
            );
        },
        updateTickets(state, action: PayloadAction<Partial<TicketsInfo>>) {
            state.tickets = {
                ...state.tickets,
                ...action.payload,
            };
        },
        resetSeatsForm(state) {
            state.currentClass = null;
            state.selectedCoaches = [];
            state.tickets = {
                adult: 1,
                childWithSeat: 0,
                childWithoutSeat: 0,
            };
        },
    },
});

export const {
    setCurrentClass,
    addCoach,
    removeCoach,
    updateTickets,
    resetSeatsForm,
} = seatsFormSlice.actions;

export default seatsFormSlice.reducer;