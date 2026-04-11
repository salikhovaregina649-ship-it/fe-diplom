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
    totalTickets: 1, // кол-во пассажиров (взрослые + дети с местом)
    price: 0,
    selectedSeatsCount: 0, //кол-во выбранных мест
    selectedSeats: {}, //id вагона: [номера выбранных мест]
};

const initialState: SeatsState = {
    departure: initialSeatInfo,
    arrival: null,
    totalPrice: 0,
};

const seatsSlice = createSlice({
    name: "seats",
    initialState,
    reducers: {
        setCurrentClass(state, action: PayloadAction<{ value: string | null; isArrival: boolean }>) {
            const { value, isArrival } = action.payload;
            if (isArrival) {
                if (!state.arrival) {
                    state.arrival = { ...initialSeatInfo };
                }
                state.arrival.currentClass = value;
                // СБРОС при смене класса:
                state.arrival.selectedCoaches = [];
                state.arrival.selectedSeats = {};
                state.arrival.selectedSeatsCount = 0;
                state.arrival.price = 0;
            } else {
                state.departure.currentClass = value;
                // СБРОС при смене класса:
                state.departure.selectedCoaches = [];
                state.departure.selectedSeats = {};
                state.departure.selectedSeatsCount = 0;
                state.departure.price = 0;
            }

            state.totalPrice = state.departure.price + (state.arrival ? state.arrival.price : 0);
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

                if (target.selectedSeats[coach]) {
                    delete target.selectedSeats[coach];
                }
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
                target.totalTickets = target.tickets.adult + target.tickets.childWithSeat; //  + target.tickets.childWithoutSeat не считается за пассажира
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

            if (!target.selectedCoaches.includes(coachId)) {
                target.selectedCoaches.push(coachId);
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