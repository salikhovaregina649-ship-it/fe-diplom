import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RoutesState, TimeRangeKey } from "./types";

const initialState: RoutesState = {
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_express: false,
    price_from: 0,
    price_to: 7000,
    start_departure_hour_from: 0,
    start_departure_hour_to: 24,
    start_arrival_hour_from: 0,
    start_arrival_hour_to: 24,
    end_departure_hour_from: 0,
    end_departure_hour_to: 24,
    end_arrival_hour_from: 0,
    end_arrival_hour_to: 24,
    limit: 5,
    offset: 0,
    sort: "date",
};

const routesSlice = createSlice({
    name: "routes",
    initialState,
    reducers: {
        setSort(state, action: PayloadAction<"date" | "price" | "duration">) {
            state.sort = action.payload;
            state.offset = 0;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
            state.offset = 0;
        },
        setPage(state, action: PayloadAction<number>) {
            state.offset = (action.payload - 1) * state.limit;
        },
        toggleFilter(state, action: PayloadAction<keyof RoutesState>) {
            const key = action.payload;
            if (typeof state[key] === "boolean") {
                (state[key] as boolean) = !state[key];
                state.offset = 0;
            }
        },
        setPriceRange(state, action: PayloadAction<{ 
            from?: number; 
            to?: number;
        }>) {
            if (action.payload.from !== undefined) { 
                state.price_from = action.payload.from; 
            }

            if (action.payload.to !== undefined) { 
                state.price_to = action.payload.to;
            }
        },
        setTimeRange(state, action: PayloadAction<{ 
            key: TimeRangeKey; 
            value: [number, number];
        }>) {
            const {key, value} = action.payload;
            const [from, to] = value;
            const fromKey = `${key}_hour_from` as keyof RoutesState;
            const toKey = `${key}_hour_to` as keyof RoutesState;

            (state[fromKey] as number) = from;
            (state[toKey] as number) = to;
            state.offset = 0;
        },
    },
});

export const { 
    setSort, 
    setLimit, 
    setPage, 
    toggleFilter, 
    setPriceRange, 
    setTimeRange 
} = routesSlice.actions;

export default routesSlice.reducer;
