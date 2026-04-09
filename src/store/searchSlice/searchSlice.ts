import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { City, SearchState } from "./types";

const initialState: SearchState = {
    from: {
        value: "",
        selectedCity: null,
    },
    to: {
        value: "",
        selectedCity: null,
    },
    dateForth: null,
    dateBack: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setFromValue(state, action: PayloadAction<string>) {
            state.from.value = action.payload;
            state.from.selectedCity = null;
        },
        setToValue(state, action: PayloadAction<string>) {
            state.to.value = action.payload;
            state.to.selectedCity = null;
        },
        setFromCity(state, action: PayloadAction<City>) {
            state.from.selectedCity = action.payload;
            state.from.value = action.payload.name;
        },
        setToCity(state, action: PayloadAction<City>) {
            state.to.selectedCity = action.payload;
            state.to.value = action.payload.name;
        },
        setDateForth(state, action: PayloadAction<string | null>) {
            state.dateForth = action.payload;
        },
        setDateBack(state, action: PayloadAction<string | null>) {
            state.dateBack = action.payload;
        },
        swapCities(state) {
            const temp = state.from;
            state.from = state.to;
            state.to = temp;
        },
    },
});

export const {
    setFromValue,
    setToValue,
    setFromCity,
    setToCity,
    setDateForth,
    setDateBack,
    swapCities,
} = searchSlice.actions;

export default searchSlice.reducer;
