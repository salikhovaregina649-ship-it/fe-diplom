import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice/searchSlice";
import routesReducer from "./routesSlice/routesSlice";
import { api } from "./api/api";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        routes: routesReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;