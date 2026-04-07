import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { seatsState, TicketsInfo, SeatInfo } from "./types";

const initialSeatInfo: SeatInfo = {
    currentClass: null,
    selectedCoaches: [],
    tickets: {
        adult: 1,
        childWithSeat: 0,
        childWithoutSeat: 0,
    },
    price: 0,
    selectedSeatsCount: 0,
};

const initialState: seatsState = {
    departure: initialSeatInfo,
    arrival: null,
};

const seatsSlice = createSlice({
    name: "seatsForm",
    initialState,
    reducers: {
        setCurrentClass(state, action: PayloadAction<{ value: string | null; isArrival: boolean }>) {
            const { value, isArrival } = action.payload;
            if (isArrival) {
                if (!state.arrival) {
                    state.arrival = { ...initialSeatInfo };
                }
                state.arrival.currentClass = value;
            } else {
                state.departure.currentClass = value;
            }
        },
        addCoach(state, action: PayloadAction<{ coach: string; isArrival: boolean }>) {
            const { coach, isArrival } = action.payload;
            const target = isArrival ? state.arrival : state.departure;
            if (target && !target.selectedCoaches.includes(coach)) {
                target.selectedCoaches.push(coach);
            }
        },
        removeCoach(state, action: PayloadAction<{ coach: string; isArrival: boolean }>) {
            const { coach, isArrival } = action.payload;
            const target = isArrival ? state.arrival : state.departure;
            if (target) {
                target.selectedCoaches = target.selectedCoaches.filter(
                    (c) => c !== coach,
                );
            }
        },
        updateTickets(state, action: PayloadAction<{ tickets: Partial<TicketsInfo>; isArrival: boolean }>) {
            const { tickets, isArrival } = action.payload;
            const target = isArrival ? state.arrival : state.departure;
            if (target) {
                target.tickets = {
                    ...target.tickets,
                    ...tickets,
                };
            }
        },
        setPrice(state, action: PayloadAction<{ price: number; isArrival: boolean }>) {
            const { price, isArrival } = action.payload;
            const target = isArrival ? state.arrival : state.departure;
            if (target) {
                target.price = price;
            }
        },
        setSelectedSeatsCount(state, action: PayloadAction<{ count: number; isArrival: boolean }>) {
            const { count, isArrival } = action.payload;
            const target = isArrival ? state.arrival : state.departure;
            if (target) {
                target.selectedSeatsCount = count;
            }
        },
        resetSeatsForm(state, action: PayloadAction<{ isArrival: boolean }>) {
            const { isArrival } = action.payload;
            if (isArrival) {
                state.arrival = null;
            } else {
                state.departure = { ...initialSeatInfo };
            }
        },
    },
});

export const {
    setCurrentClass,
    addCoach,
    removeCoach,
    updateTickets,
    setPrice,
    setSelectedSeatsCount,
    resetSeatsForm,
} = seatsSlice.actions;

export default seatsSlice.reducer;