import { useState } from "react";
import InputDate from "../uikit/InputDate/InputDate";
import CalendarIconSmall from "../../assets/icons/small/CalendarIconSmall";
import RangeSlider from "../uikit/RangeSlider/RangeSlider";
import Checkbox from "../uikit/Checkbox/Checkbox";
import clsx from "clsx";
import Title from "../uikit/Title/Title";
import "./Filter.css";

//icons
import coupeIcon from "../../assets/icons/filter/coupe.svg";
import reservedSeatIcon from "../../assets/icons/filter/reserved-seat.svg";
import sedentaryIcon from "../../assets/icons/filter/sedentary.svg";
import luxuryIcon from "../../assets/icons/filter/luxury.svg";
import wiFiIcon from "../../assets/icons/filter/wi-fi.svg";
import expressIcon from "../../assets/icons/filter/express.svg";
import Button from "../uikit/Button/Button";
import Collapse from "../uikit/Collapse/Collapse";
import TimeRangeSlider from "../uikit/TimeRangeSlider/TimeRangeSlider";

const filterItems = [
    {
        iconUrl: coupeIcon,
        name: "filter",
        value: "coupe",
        label: "Купе",
    },
    {
        iconUrl: reservedSeatIcon,
        name: "filter",
        value: "reservedSeat",
        label: "Плацкарт",
    },
    {
        iconUrl: sedentaryIcon,
        name: "filter",
        value: "sedentary",
        label: "Сидячий",
    },
    {
        iconUrl: luxuryIcon,
        name: "filter",
        value: "luxury",
        label: "Люкс",
    },
    {
        iconUrl: wiFiIcon,
        name: "filter",
        value: "wiFi",
        label: "Wi-Fi",
    },
    {
        iconUrl: expressIcon,
        name: "filter",
        value: "express",
        label: "Экспресс",
    },
]

/**  */

export default function Filter () {
    const [openForth, setOpenForth] = useState(false);
    const [openBack, setOpenBack] = useState(false);

    return(
        <div className="filter">
            <div className="filter__date">
                <div className="filter__date-box">
                    <Title className="filter__title" as="h3">Дата поездки</Title>
                    <InputDate className="filter__input-date" id="dateForthAside" Icon={CalendarIconSmall} />
                </div>
                <div className="filter__date-box">
                    <Title className="filter__title" as="h3">Дата возвращения</Title>
                    <InputDate className="filter__input-date" id="dateBackAside" Icon={CalendarIconSmall} />
                </div>
            </div>
            <ul className="filter__list">
                {filterItems.map((item, index) => (
                    <li className="filter__item" key={index}>
                        <img className="filter__checkbox-icon" src={item.iconUrl} alt="" />
                        <Checkbox className="filter__checkbox" name={item.name} value={item.value} label={item.label} />
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
                    <Title className="filter__title" as="h3">Туда</Title>
                    <Button className={clsx("filter__collapse-btn", openForth && "active")} variant="openner" onClick={() => setOpenForth(prev => !prev)} />
                </div>
                <Collapse className="filter__collapse-box" isOpen={openForth}>
                    <div className="filter__slider-label filter__slider-label--direction">
                        <span>Время прибытия</span>
                    </div>
                    <TimeRangeSlider />
                    <div className="filter__slider-label filter__slider-label--direction">
                        <span>Время отбытия</span>
                    </div>
                    <TimeRangeSlider />
                </Collapse>
            </div>
            <div className="filter__direction filter__direction--back">
                <div className={clsx("filter__direction-box", openForth && "is-open")}>
                    <Title className="filter__title" as="h3">Обратно</Title>
                    <Button className={clsx("filter__collapse-btn", openBack && "active")} variant="openner" onClick={() => setOpenBack(prev => !prev)} />
                </div>
                <Collapse className="filter__collapse-box" isOpen={openBack}>
                    <div className="filter__slider-label filter__slider-label--direction">
                        <span>Время прибытия</span>
                    </div>
                    <TimeRangeSlider />
                    <div className="filter__slider-label filter__slider-label--direction">
                        <span>Время отбытия</span>
                    </div>
                    <TimeRangeSlider />
                </Collapse>
            </div>
        </div>
    )
}