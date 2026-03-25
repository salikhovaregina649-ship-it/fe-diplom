import { useState, type JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import CustomDatepicker from "../uikit/CustomDatepicker/CustomDatepicker";
import RangeSlider from "../uikit/RangeSlider/RangeSlider";
import Checkbox from "../uikit/Checkbox/Checkbox";
import Title from "../uikit/Title/Title";
import Button from "../uikit/Button/Button";
import Collapse from "../uikit/Collapse/Collapse";
import TimeRangeSlider from "../uikit/TimeRangeSlider/TimeRangeSlider";
import { setDateForth, setDateBack } from "../../store/searchSlice/searchSlice";
import { toggleFilter, setPriceRange, setTimeRange } from "../../store/routesSlice/routesSlice";
import type { RootState } from "../../store/store";
import type { FilterKey, TimeRangeKey } from "../../store/routesSlice/types";
import "./Filter.css";

//icons
import SedentaryIcon from "../../assets/icons/filter/SedentaryIcon";
import CoupeIcon from "../../assets/icons/filter/CoupeIcon";
import ReservedSeatIcon from "../../assets/icons/filter/ReservedSeatIcon";
import LuxuryIcon from "../../assets/icons/filter/LuxuryIcon";
import WiFiIcon from "../../assets/icons/filter/WiFiIcon";
import ExpressIcon from "../../assets/icons/filter/ExpressIcon";
import SubtractIcon from "../../assets/icons/small/SubtractIcon";

//Моки
type FilterItem = {
    icon: () => JSX.Element;
    value: FilterKey;
    label: string;
}

const filterItems: FilterItem[] = [
    {
        icon: CoupeIcon,
        value: "have_second_class",
        label: "Купе",
    },
    {
        icon: ReservedSeatIcon,
        value: "have_third_class",
        label: "Плацкарт",
    },
    {
        icon: SedentaryIcon,
        value: "have_fourth_class",
        label: "Сидячий",
    },
    {
        icon: LuxuryIcon,
        value: "have_first_class",
        label: "Люкс",
    },
    {
        icon: WiFiIcon,
        value: "have_wifi",
        label: "Wi-Fi",
    },
    {
        icon: ExpressIcon,
        value: "have_express",
        label: "Экспресс",
    },
]

export default function Filter () {
    const [openForth, setOpenForth] = useState(false);
    const [openBack, setOpenBack] = useState(false);
    // const [dateForth, setDateForth] = useState<Date | null>(null);
    // const [dateBack, setDateBack] = useState<Date | null>(null);
    const dispatch = useDispatch();
    const routesState = useSelector((state: RootState) => state.routes);
    const { dateForth, dateBack } = useSelector((state: RootState) => state.search);

    const currentYear = new Date().getFullYear();
    const maxDate = new Date(currentYear, 11, 31);
    const minDate = new Date();



    return(
        <div className="filter">
            <div className="filter__date">
                <div className="filter__date-box">
                    <Title className="filter__title" as="h3">Дата поездки</Title>
                    <CustomDatepicker
                        value={dateForth}
                        onChange={(date) => dispatch(setDateForth(date))}
                        name="date-forth"
                        icon="small"
                        minDate={minDate}
                        maxDate={maxDate}
                        modifier="filter"
                    />
                </div>
                <div className="filter__date-box">
                    <Title className="filter__title" as="h3">Дата возвращения</Title>
                    <CustomDatepicker
                        value={dateBack}
                        onChange={(date) => dispatch(setDateBack(date))}
                        name="date-back"
                        icon="small"
                        minDate={minDate}
                        maxDate={maxDate}
                        modifier="filter"
                    />
                </div>
            </div>
            <ul className="filter__list">
                {filterItems.map((item, index) => (
                    <li className="filter__item" key={index}>
                        <item.icon />
                        <Checkbox 
                            className="filter__checkbox" 
                            name="filter" 
                            value={item.value} 
                            label={item.label} 
                            switched={true}
                            checked={routesState[item.value as FilterKey]}
                            onChange={() => dispatch(toggleFilter(item.value))}
                        />
                    </li>
                ))}
            </ul>
            <div className="filter__price">
                <Title className="filter__title" as="h3">Стоимость</Title>
                <div className="filter__slider-label filter__slider-label--price">
                    <span>от</span>
                    <span>до</span>
                </div>
                <RangeSlider 
                    className="filter__price-slider" 
                    min={0}
                    max={7000}
                    step={10}
                    value={[routesState.price_from, routesState.price_to]}
                    onChange={(value) =>
                        dispatch(setPriceRange({
                            from: value[0],
                            to: value[1]
                        }))
                    }
                    
                />
            </div>
            <div className="filter__direction filter__direction--forth">
                <div className={clsx("filter__direction-box", openForth && "is-open")}>
                    <Title className="filter__title" as="h3">
                        <SubtractIcon />
                        Туда
                    </Title>
                    <Button 
                        className={clsx("filter__collapse-btn", openForth && "active")} 
                        variant="openner" 
                        onClick={() => setOpenForth(prev => !prev)} 
                    />
                </div>
                <Collapse className="filter__collapse" isOpen={openForth}>
                    <div className="filter__collapse-box">
                        <div className="filter__slider-label filter__slider-label--direction">
                            <span>Время отбытия</span>
                        </div>
                        <TimeRangeSlider
                            value={[
                                routesState.start_departure_hour_from,
                                routesState.start_departure_hour_to
                            ]}
                            onChange={(value) =>
                                dispatch(setTimeRange({
                                    key: "start_departure",
                                    value
                                }))
                            }
                        />
                    </div>
                    <div className="filter__collapse-box">   
                        <div className="filter__slider-label filter__slider-label--direction">
                            <span>Время прибытия</span>
                        </div>
                        <TimeRangeSlider
                            value={[
                                routesState.start_arrival_hour_from,
                                routesState.start_arrival_hour_to
                            ]}
                            onChange={(value) =>
                                dispatch(setTimeRange({
                                    key: "start_arrival",
                                    value
                                }))
                            }
                        />
                    </div>
                </Collapse>
            </div>
            <div className="filter__direction filter__direction--back">
                <div className={clsx("filter__direction-box", openForth && "is-open")}>
                    <Title className="filter__title" as="h3">
                        <SubtractIcon />
                        Обратно
                    </Title>
                    <Button 
                        className={clsx("filter__collapse-btn", openBack && "active")} 
                        variant="openner" 
                        onClick={() => setOpenBack(prev => !prev)} 
                    />
                </div>
                <Collapse className="filter__collapse" isOpen={openBack}>
                    <div className="filter__collapse-box">
                        <div className="filter__slider-label filter__slider-label--direction">
                            <span>Время отбытия</span>
                        </div>
                        <TimeRangeSlider
                            value={[
                                routesState.end_departure_hour_from,
                                routesState.end_departure_hour_to
                            ]}
                            onChange={(value) =>
                                dispatch(setTimeRange({
                                    key: "end_departure",
                                    value
                                }))
                            }
                        />
                    </div>
                    <div className="filter__collapse-box">   
                        <div className="filter__slider-label filter__slider-label--direction">
                            <span>Время прибытия</span>
                        </div>
                        <TimeRangeSlider
                            value={[
                                routesState.end_arrival_hour_from,
                                routesState.end_arrival_hour_to
                            ]}
                            onChange={(value) =>
                                dispatch(setTimeRange({
                                    key: "end_arrival",
                                    value
                                }))
                            }
                        />
                    </div> 
                </Collapse>
            </div>
        </div>
    )
}