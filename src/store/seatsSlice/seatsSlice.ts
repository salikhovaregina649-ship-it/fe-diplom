import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SeatsState, TicketsInfo, SeatInfo } from "./types";

const initialSeatInfo: SeatInfo = {
    currentClass: null,
    selectedCoaches: [],
    tickets: {
        adult: 1,
        childWithSeat: 0,
        childWithoutSeat: 0,
    },
    totalTickets: 1,
    price: 0,
    selectedSeatsCount: 0,
    selectedSeats: {},
};

const initialState: SeatsState = {
    departure: initialSeatInfo,
    arrival: null,
    totalPrice: 0,
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
                target.totalTickets = target.tickets.adult + target.tickets.childWithSeat + target.tickets.childWithoutSeat;
            }
        },
        setPrice(state, action: PayloadAction<{ price: number; isArrival: boolean }>) {
            const { price, isArrival } = action.payload;
            const target = isArrival ? state.arrival : state.departure;
            if (target) {
                target.price = price;
            }
            state.totalPrice = state.departure.price + (state.arrival ? state.arrival.price : 0);
        },
        setSelectedSeatsCount(state, action: PayloadAction<{ count: number; isArrival: boolean }>) {
            const { count, isArrival } = action.payload;
            const target = isArrival ? state.arrival : state.departure;
            if (target) {
                target.selectedSeatsCount = count;
            }
        },
        setSelectedSeats(state, action: PayloadAction<{ coachId: string; seatIndex: number; isArrival: boolean}>) {
            const { coachId, seatIndex, isArrival } = action.payload;
            const target = isArrival ? state.arrival : state.departure;

            if (!target) return;

            const coachSeats = target.selectedSeats[coachId] || [];

            if (coachSeats.includes(seatIndex)) {
                target.selectedSeats[coachId] = coachSeats.filter(
                    (id) => id !== seatIndex
                );
            } else {
                target.selectedSeats[coachId] = [...coachSeats, seatIndex];
            }
        },
        resetSeatsForm(state) {
            state.departure = { ...initialSeatInfo };
            state.arrival = null;
            state.totalPrice = 0;
        }
    },
});

export const {
    setCurrentClass,
    addCoach,
    removeCoach,
    updateTickets,
    setPrice,
    setSelectedSeatsCount,
    setSelectedSeats,
    resetSeatsForm,
} = seatsSlice.actions;

export default seatsSlice.reducer;