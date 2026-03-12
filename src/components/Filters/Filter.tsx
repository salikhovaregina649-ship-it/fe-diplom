import { useState } from "react";
import CustomDatepicker from "../uikit/CustomDatepicker/CustomDatepicker";
import RangeSlider from "../uikit/RangeSlider/RangeSlider";
import Checkbox from "../uikit/Checkbox/Checkbox";
import clsx from "clsx";
import Title from "../uikit/Title/Title";
import Button from "../uikit/Button/Button";
import Collapse from "../uikit/Collapse/Collapse";
import TimeRangeSlider from "../uikit/TimeRangeSlider/TimeRangeSlider";
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
const filterItems = [
    {
        icon: CoupeIcon,
        name: "filter",
        value: "coupe",
        label: "Купе",
    },
    {
        icon: ReservedSeatIcon,
        name: "filter",
        value: "reservedSeat",
        label: "Плацкарт",
    },
    {
        icon: SedentaryIcon,
        name: "filter",
        value: "sedentary",
        label: "Сидячий",
    },
    {
        icon: LuxuryIcon,
        name: "filter",
        value: "luxury",
        label: "Люкс",
    },
    {
        icon: WiFiIcon,
        name: "filter",
        value: "wiFi",
        label: "Wi-Fi",
    },
    {
        icon: ExpressIcon,
        name: "filter",
        value: "express",
        label: "Экспресс",
    },
]

export default function Filter () {
    const [openForth, setOpenForth] = useState(false);
    const [openBack, setOpenBack] = useState(false);
    const [dateForth, setDateForth] = useState<Date | null>(null);
    const [dateBack, setDateBack] = useState<Date | null>(null);

    const currentYear = new Date().getFullYear();
    const maxDate = new Date(currentYear, 11, 31);
    const minDate = new Date()

    return(
        <div className="filter">
            <div className="filter__date">
                <div className="filter__date-box">
                    <Title className="filter__title" as="h3">Дата поездки</Title>
                    <CustomDatepicker
                        value={dateForth}
                        onChange={setDateForth}
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
                        onChange={setDateBack}
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
                        <Checkbox className="filter__checkbox" name={item.name} value={item.value} label={item.label} switched={true} />
                    </li>
                ))}
            </ul>
            <div className="filter__price">
                <Title className="filter__title" as="h3">Стоимость</Title>
                <div className="filter__slider-label filter__slider-label--price">
                    <span>от</span>
                    <span>до</span>
                </div>
                <RangeSlider className="filter__price-slider" min={1920} max={7000} step={10} />
            </div>
            <div className="filter__direction filter__direction--forth">
                <div className={clsx("filter__direction-box", openForth && "is-open")}>
                    <Title className="filter__title" as="h3">
                        <SubtractIcon />
                        Туда
                    </Title>
                    <Button className={clsx("filter__collapse-btn", openForth && "active")} variant="openner" onClick={() => setOpenForth(prev => !prev)} />
                </div>
                <Collapse className="filter__collapse" isOpen={openForth}>
                    <div className="filter__collapse-box">
                        <div className="filter__slider-label filter__slider-label--direction">
                            <span>Время отбытия</span>
                        </div>
                        <TimeRangeSlider />
                    </div>
                    <div className="filter__collapse-box">   
                        <div className="filter__slider-label filter__slider-label--direction">
                            <span>Время прибытия</span>
                        </div>
                        <TimeRangeSlider />
                    </div>
                </Collapse>
            </div>
            <div className="filter__direction filter__direction--back">
                <div className={clsx("filter__direction-box", openForth && "is-open")}>
                    <Title className="filter__title" as="h3">
                        <SubtractIcon />
                        Обратно
                    </Title>
                    <Button className={clsx("filter__collapse-btn", openBack && "active")} variant="openner" onClick={() => setOpenBack(prev => !prev)} />
                </div>
                <Collapse className="filter__collapse" isOpen={openBack}>
                    <div className="filter__collapse-box">
                        <div className="filter__slider-label filter__slider-label--direction">
                            <span>Время отбытия</span>
                        </div>
                        <TimeRangeSlider />
                    </div>
                    <div className="filter__collapse-box">   
                        <div className="filter__slider-label filter__slider-label--direction">
                            <span>Время прибытия</span>
                        </div>
                        <TimeRangeSlider />
                    </div> 
                </Collapse>
            </div>
        </div>
    )
}