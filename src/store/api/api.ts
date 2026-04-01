import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { City } from "../searchSlice/types";
import type { RouteParams, RoutesResponse, FilterParams } from "./types";
import type { LastTicket } from "../../types/typeLastTicket";
import type { CoachesData } from "../../types/typeSeat";

export const api = createApi({
    reducerPath: "citiesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://students.netoservices.ru/fe-diplom",
    }),
    endpoints: (builder) => ({
        getCities: builder.query<City[], string>({
            query: (name: string) => ({
                url: "/routes/cities",
                params: { name },
            }),
        }),
        getRoutes: builder.query<RoutesResponse, RouteParams>({
            query: (params) => ({
                url: "/routes",
                params: params,
            }),
        }),
        getLastRoutes: builder.query<LastTicket[], void>({
            query: () => ({
                url: "/routes/last",
            })
        }),
        getSeats: builder.query<CoachesData, {id: string; filters: FilterParams}>({
            query: ({ id, filters }) => ({
                url: `/routes/${id}/seats`,
                params: filters,
            }),
        }),
    }),
});

export const { useGetCitiesQuery, useGetRoutesQuery, useLazyGetRoutesQuery, useGetLastRoutesQuery, useGetSeatsQuery } = api;
