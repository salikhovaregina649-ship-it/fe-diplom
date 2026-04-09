import type { RootState } from "../store/store";
import type { RouteParams } from "../store/api/types";

export function getRouteParams(
    searchState: RootState["search"],
    routesState: RootState["routes"],
): RouteParams | undefined {
    if (!searchState.from.selectedCity || !searchState.to.selectedCity) {
        return undefined;
    }

    return {
        from_city_id: searchState.from.selectedCity._id,
        to_city_id: searchState.to.selectedCity._id,
        date_start: searchState.dateForth
            ? searchState.dateForth.split("T")[0]
            : undefined,
        date_end: searchState.dateBack
            ? searchState.dateBack.split("T")[0]
            : undefined,
        // date_start_arrival?: string; //Вопрос! неоткуда получить
        // date_end_arrival?:string; //Вопрос! неоткуда получить
        have_first_class: routesState.have_first_class ? true : undefined,
        have_second_class: routesState.have_second_class ? true : undefined,
        have_third_class: routesState.have_third_class ? true : undefined,
        have_fourth_class: routesState.have_fourth_class ? true : undefined,
        have_wifi: routesState.have_wifi ? true : undefined,
        // have_air_conditioning: boolean; //Вопрос! неоткуда получить
        have_express: routesState.have_express ? true : undefined,
        price_from:
            routesState.price_from > 0 ? routesState.price_from : undefined,
        price_to:
            routesState.price_to < 7000 ? routesState.price_to : undefined,
        start_departure_hour_from:
            routesState.start_departure_hour_from > 0
                ? routesState.start_departure_hour_from
                : undefined,
        start_departure_hour_to:
            routesState.start_departure_hour_to < 24
                ? routesState.start_departure_hour_to
                : undefined,
        start_arrival_hour_from:
            routesState.start_arrival_hour_from > 0
                ? routesState.start_arrival_hour_from
                : undefined,
        start_arrival_hour_to:
            routesState.start_arrival_hour_to < 24
                ? routesState.start_arrival_hour_to
                : undefined,
        end_departure_hour_from:
            routesState.end_departure_hour_from > 0
                ? routesState.end_departure_hour_from
                : undefined,
        end_departure_hour_to:
            routesState.end_departure_hour_to < 24
                ? routesState.end_departure_hour_to
                : undefined,
        end_arrival_hour_from:
            routesState.end_arrival_hour_from > 0
                ? routesState.end_arrival_hour_from
                : undefined,
        end_arrival_hour_to:
            routesState.end_arrival_hour_to < 24
                ? routesState.end_arrival_hour_to
                : undefined,
        limit: routesState.limit,
        offset: routesState.offset,
        sort: routesState.sort,
    };
}