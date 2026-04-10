import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PassengerInfoState, PassengerState } from "./types";

// person_info {} из ордера + id каждого пассажира
export const initialInfoState: PassengerInfoState = {
    id: "",
    is_valid: false,
    is_adult: true,
    first_name: "",
    last_name: "",
    patronymic: "",
    gender: true,
    birthday: "",
    document_type: "паспорт",
    document_data: "",
};

// seats [{...person_info}]  из ордера. Это массив с информацией о каждом пассажире. 
const initialState: PassengerState = {
    passengers: [],
};

const passengerSlice = createSlice({
    name: "passenger",
    initialState,
    reducers: {
        setPassengers: (state, action: PayloadAction<PassengerInfoState[]>) => {
            state.passengers = action.payload;
        },
        setPassenger: (state, action: PayloadAction<Partial<PassengerInfoState>>) => {
            state.passengers.push({ ...initialInfoState, ...action.payload });
        },
        updatePassenger: (state, action: PayloadAction<{id: string; data: Partial<PassengerInfoState>}>) => {
            const {id, data} = action.payload;
            const passenger = state.passengers.find(p => p.id === id);
            if (passenger) {
                Object.assign(passenger, data);
            }
        },
        removePassenger: (state, action: PayloadAction<string>) => {
            state.passengers = state.passengers.filter(p => p.id !== action.payload);
        },
        clearPassenger: (state, action: PayloadAction<string>) => {
            const passengerId = action.payload;
            const passengerIndex = state.passengers.findIndex(p => p.id === passengerId);
            
            if (passengerIndex !== -1) {
                // Полностью заменяем объект пассажира на начальный, сохраняя только ID
                state.passengers[passengerIndex] = {
                    ...initialInfoState,
                    id: passengerId
                };
            }
        }
    }
});

export const {setPassengers, setPassenger, updatePassenger, removePassenger, clearPassenger} = passengerSlice.actions;
export default passengerSlice.reducer;