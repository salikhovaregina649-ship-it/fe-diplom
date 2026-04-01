import type { RootState } from "../store/store";
import type { FilterParams } from "../store/api/types";

export function getFiltersParams(
    routesState: RootState["routes"]
): FilterParams | undefined {
    return {
        have_first_class: routesState.have_first_class ? true : undefined,
        have_second_class: routesState.have_second_class ? true : undefined,
        have_third_class: routesState.have_third_class ? true : undefined,
        have_fourth_class: routesState.have_fourth_class ? true : undefined,
        have_wifi: routesState.have_wifi ? true : undefined,
        have_express: routesState.have_express ? true : undefined
    }
}