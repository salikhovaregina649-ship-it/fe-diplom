import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomSelect from "../uikit/CustomSelect/CustomSelect";
import Radio from "../uikit/Radio/Radio";
import Train from "../Train/Train";
import Pagination from "../uikit/Pagination/Pagination";
import { setSort, setLimit, setPage } from "../../store/routesSlice/routesSlice";
import { useGetRoutesQuery } from "../../store/api/api";
import type { RootState } from "../../store/store";
import type { RouteParams } from "../../store/api/types";
import "./TrainList.css";

const sortOptions = [
    { value: "date", label: "времени" },
    { value: "price", label: "стоимости" },
    { value: "duration", label: "длительности" },
];

export default function TrainList() {
    const dispatch = useDispatch();
    const searchState = useSelector((state: RootState) => state.search);
    const routesState = useSelector((state: RootState) => state.routes);

    const routeParams: RouteParams | undefined = useMemo(() => {
        if (!searchState.from.selectedCity || !searchState.to.selectedCity) {
            return undefined;
        }

        return {
            from_city_id: searchState.from.selectedCity._id,
            to_city_id: searchState.to.selectedCity._id,
            date_start: searchState.dateForth ? searchState.dateForth.toISOString().split("T")[0] : undefined,
            date_end: searchState.dateBack ? searchState.dateBack.toISOString().split("T")[0] : undefined,
            // date_start_arrival?: string; //неоткуда получить
            // date_end_arrival?:string; //неоткуда получить
            have_first_class: routesState.have_first_class ? true : undefined,
            have_second_class: routesState.have_second_class ? true : undefined,
            have_third_class: routesState.have_third_class ? true : undefined,
            have_fourth_class: routesState.have_fourth_class ? true : undefined,
            have_wifi: routesState.have_wifi ? true : undefined,
            // have_air_conditioning: boolean; //неоткуда получить
            have_express: routesState.have_express ? true : undefined,
            price_from: routesState.price_from > 0 ? routesState.price_from : undefined,
            price_to: routesState.price_to < 7000 ? routesState.price_to : undefined,
            start_departure_hour_from: routesState.start_departure_hour_from > 0 ? routesState.start_departure_hour_from : undefined,
            start_departure_hour_to: routesState.start_departure_hour_to < 24 ? routesState.start_departure_hour_to : undefined,
            start_arrival_hour_from: routesState.start_arrival_hour_from > 0 ? routesState.start_arrival_hour_from : undefined,
            start_arrival_hour_to: routesState.start_arrival_hour_to < 24 ? routesState.start_arrival_hour_to : undefined,
            end_departure_hour_from: routesState.end_departure_hour_from > 0 ? routesState.end_departure_hour_from : undefined,
            end_departure_hour_to: routesState.end_departure_hour_to < 24 ? routesState.end_departure_hour_to : undefined,
            end_arrival_hour_from: routesState.end_arrival_hour_from > 0 ? routesState.end_arrival_hour_from : undefined,
            end_arrival_hour_to: routesState.end_arrival_hour_to < 24 ? routesState.end_arrival_hour_to : undefined,
            limit: routesState.limit,
            offset: routesState.offset,
            sort: routesState.sort,
        }
    }, [searchState.from.selectedCity, searchState.to.selectedCity, searchState.dateForth, searchState.dateBack, routesState]);

    const { data, isLoading, error } = useGetRoutesQuery(routeParams!,
        {skip: !routeParams}
    );

    const currentPage = Math.floor(routesState.offset / routesState.limit) + 1;
    const totalPages = data ? Math.ceil(data.total_count / routesState.limit) : 0;

    //сортировка
    const handleSortChange = (value: string) => {
        dispatch(setSort(value as "date" | "price" | "duration"));
    }
    //пагинация
    const handlePerPageChange = (value: string) => {
        dispatch(setLimit(Number(value)));
    };

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
    };

    return(
        <div className="train-list">
            <div className="train-list__row">
                <div className="train-list__found-result">найдено {data?.total_count ?? 0}</div>
                <div className="train-list__controls">
                    <div className="train-list__sorting">
                        <span className="train-list__sorting__label">сортировать по:</span>
                        <CustomSelect className="train-list__sorting-select" options={sortOptions} value={routesState.sort} onChange={handleSortChange} />
                    </div>
                    
                    <div className="train-list__per-page">
                        <span className="train-list__per-page-label">показывать по:</span>
                        <Radio className="train-list__per-page-item" name="per-page" id="perPage5" value="5" label="5" checked={routesState.limit === 5} onChange={handlePerPageChange} />
                        <Radio className="train-list__per-page-item" name="per-page" id="perPage10" value="10" label="10" checked={routesState.limit === 10} onChange={handlePerPageChange} />
                        <Radio className="train-list__per-page-item" name="per-page" id="perPage20" value="20" label="20" checked={routesState.limit === 20} onChange={handlePerPageChange} />
                    </div>
                </div>
            </div>
            <div className="train-list__wrapper">
                <ul className="train-list__list">
                    {!data || data.items.length === 0 ? (
                        <li>По вашему запросу ничего не найдено.</li>
                    ) : (
                        data.items.map((item) => (
                            <li className="train-list__item" key={item.departure._id}>
                                <Train ticketInfo={item} />
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="train-list__pagination">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />           
            </div>
        </div>
    )
}