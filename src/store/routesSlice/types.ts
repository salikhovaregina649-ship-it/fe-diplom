export interface RoutesState {
    // Фильтры
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_express: boolean;
    price_from: number;
    price_to: number;
    // Время (диапазоны)
    start_departure_hour_from: number;
    start_departure_hour_to: number;
    start_arrival_hour_from: number;
    start_arrival_hour_to: number;
    end_departure_hour_from: number;
    end_departure_hour_to: number;
    end_arrival_hour_from: number;
    end_arrival_hour_to: number;
    //сортировка и пагинация
    limit: number;
    offset: number;
    sort: "date" | "price" | "duration";
}

export type TimeRangeKey =
    | "start_departure"
    | "start_arrival"
    | "end_departure"
    | "end_arrival";

export type FilterKey =
    | "have_first_class"
    | "have_second_class"
    | "have_third_class"
    | "have_fourth_class"
    | "have_wifi"
    | "have_express";
