import { useState } from "react";
import { formatDate } from "../../utils/formatTime";
import Collapse from "../uikit/Collapse/Collapse";
import Button from "../uikit/Button/Button";
import Title from "../uikit/Title/Title";
import clsx from "clsx";
import "./TripDetails.css";

import routesResponse from "../../mocks/routesResponse.json";
import SubtractIcon from "../../assets/icons/small/SubtractIcon";
import TravelInfo from "../TravelInfo/TravelInfo";
import PassengerIcon from "../../assets/icons/small/PassengerIcon";
import RubleIcon from "../../assets/icons/small/RubleIcon";

//Моки
const trainInfo = routesResponse.items[0];
const dates = {
    dateStart : "2018-08-30", 
    dateEnd: "2018-09-09",
}
const tickets = {
    adult: 2,
    childlike: 1,
    adultPrice: "5 840",
    childlikePrice: "1 920",
    totalPrice: "7 760",
}

export default function TripDetails() {
    const [openForth, setOpenForth] = useState(true);
    const [openBack, setOpenBack] = useState(true);
    const [openPassenger, setOpenPassenger] = useState(true);

    return (
        <div className="trip-details">
            <Title className="trip-details__header" as="h3" uppercase={true}>
                Детали поездки
            </Title>
            <div className="trip-details__direction trip-details__direction--forth">
                <div
                    className={clsx(
                        "trip-details__box",
                        openForth && "is-open",
                    )}
                >
                    <div className="trip-details__row-wrapper">
                        <Title className="trip-details__title" as="h3">
                            <SubtractIcon />
                            Туда
                        </Title>
                        <p className="trip-details__date">
                            {formatDate(dates.dateStart)}
                        </p>
                    </div>
                    <Button
                        className={clsx(
                            "trip-details__collapse-btn",
                            openForth && "active",
                        )}
                        variant="openner"
                        onClick={() => setOpenForth((prev) => !prev)}
                    />
                </div>

                <Collapse className="trip-details__collapse" isOpen={openForth}>
                    <div className="trip-details__collapse-row">
                        <p className="trip-details__collapse-row-left">
                            № Поезда
                        </p>
                        <p className="trip-details__collapse-row-right">
                            {trainInfo.departure.train.name}
                        </p>
                    </div>
                    <div className="trip-details__collapse-row">
                        <p className="trip-details__collapse-row-left">
                            Название
                        </p>
                        <div
                            className={clsx(
                                "trip-details__collapse-row-right",
                                "trip-details__collapse-cities",
                            )}
                        >
                            {/* Вопрос!! Где взять название поезда? в Train похожий вопрос */}
                            <p>{trainInfo.departure.from.city.name}</p>
                            <p>{trainInfo.departure.to.city.name}</p>
                        </div>
                    </div>
                    <div className="trip-details__collapse-row-big">
                        <TravelInfo
                            className="trip-details__collapse-travel-info"
                            trainInfo={trainInfo}
                            tripDetails={true}
                        />
                    </div>
                </Collapse>
            </div>
            <div className="trip-details__direction trip-details__direction--back">
                <div
                    className={clsx("trip-details__box", openBack && "is-open")}
                >
                    <div className="trip-details__row-wrapper">
                        <Title className="trip-details__title" as="h3">
                            <SubtractIcon />
                            Обратно
                        </Title>
                        <p className="trip-details__date">
                            {formatDate(dates.dateEnd)}
                        </p>
                    </div>
                    <Button
                        className={clsx(
                            "trip-details__collapse-btn",
                            openBack && "active",
                        )}
                        variant="openner"
                        onClick={() => setOpenBack((prev) => !prev)}
                    />
                </div>

                <Collapse className="trip-details__collapse" isOpen={openBack}>
                    <div className="trip-details__collapse-row">
                        <p className="trip-details__collapse-row-left">
                            № Поезда
                        </p>
                        <p className="trip-details__collapse-row-right">
                            {trainInfo.departure.train.name}
                        </p>
                    </div>
                    <div className="trip-details__collapse-row">
                        <p className="trip-details__collapse-row-left">
                            Название
                        </p>
                        <div
                            className={clsx(
                                "trip-details__collapse-row-right",
                                "trip-details__collapse-cities",
                            )}
                        >
                            {/* Вопрос!! Где взять название поезда? в Train похожий вопрос */}
                            <p>{trainInfo.departure.from.city.name}</p>
                            <p>{trainInfo.departure.to.city.name}</p>
                        </div>
                    </div>
                    <div className="trip-details__collapse-row-big">
                        <TravelInfo
                            className="trip-details__collapse-travel-info"
                            trainInfo={trainInfo}
                            tripDetails={true}
                            back={true}
                        />
                    </div>
                </Collapse>
            </div>
            <div className="trip-details__passenger">
                <div
                    className={clsx(
                        "trip-details__box",
                        openPassenger && "is-open",
                    )}
                >
                    <div className="trip-details__row-wrapper">
                        <Title className="trip-details__title" as="h3">
                            <PassengerIcon />
                            Пассажиры
                        </Title>
                    </div>
                    <Button
                        className={clsx(
                            "trip-details__collapse-btn",
                            openPassenger && "active",
                        )}
                        variant="openner"
                        onClick={() => setOpenPassenger((prev) => !prev)}
                    />
                </div>
                <Collapse className="trip-details__collapse" isOpen={openPassenger}>
                    <div className="trip-details__collapse-row">
                        <p className="trip-details__collapse-row-left">
                            {`${tickets.adult} Взрослых`}
                        </p>
                        <p className="trip-details__collapse-row-right">
                            {tickets.adultPrice} <RubleIcon />
                        </p>
                    </div>
                    <div className="trip-details__collapse-row">
                        <p className="trip-details__collapse-row-left">
                            {`${tickets.childlike} Ребенок`}
                        </p>
                        <p className="trip-details__collapse-row-right">
                            {tickets.childlikePrice} <RubleIcon />
                        </p>
                    </div>
                </Collapse>
            </div>
            <div className="trip-details__price">
                <div className="trip-details__box">
                    <p className="trip-details__price-left">Итог</p>
                    <p className="trip-details__price-right">{tickets.totalPrice} <RubleIcon /></p>
                </div>
            </div>
        </div>
    );
}
