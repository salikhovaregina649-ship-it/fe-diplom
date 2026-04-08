import { useState } from "react";
import clsx from "clsx";
import { formatDate } from "../../utils/formatTime";
import Collapse from "../uikit/Collapse/Collapse";
import Button from "../uikit/Button/Button";
import Title from "../uikit/Title/Title";
import type { Ticket } from "../../types/typeTicket";
import type { SeatsState } from "../../store/seatsSlice/types";
import "./TripDetails.css";

import SubtractIcon from "../../assets/icons/small/SubtractIcon";
import TravelInfo from "../TravelInfo/TravelInfo";
import PassengerIcon from "../../assets/icons/small/PassengerIcon";
import RubleIcon from "../../assets/icons/small/RubleIcon";

interface TripDetailsProps {
    ticketInfo: Ticket;
    seatsInfo: SeatsState;
}

export default function TripDetails({ticketInfo, seatsInfo}: TripDetailsProps) {
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
                            {formatDate(ticketInfo.departure.from.datetime)}
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
                            {ticketInfo.departure.train.name}
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
                            <p>{ticketInfo.departure.from.city.name}</p>
                            <p>{ticketInfo.departure.to.city.name}</p>
                        </div>
                    </div>
                    <div className="trip-details__collapse-row-big">
                        <TravelInfo
                            className="trip-details__collapse-travel-info"
                            ticketInfo={ticketInfo}
                            tripDetails={true}
                        />
                    </div>
                </Collapse>
            </div>
            {ticketInfo.arrival && (
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
                                {formatDate(ticketInfo.arrival.to.datetime)}
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
                                {ticketInfo.departure.train.name}
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
                                <p>{ticketInfo.departure.from.city.name}</p>
                                <p>{ticketInfo.departure.to.city.name}</p>
                            </div>
                        </div>
                        <div className="trip-details__collapse-row-big">
                            <TravelInfo
                                className="trip-details__collapse-travel-info"
                                ticketInfo={ticketInfo}
                                tripDetails={true}
                                back={true}
                            />
                        </div>
                    </Collapse>
                </div>
            )}
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
                            {`${seatsInfo.departure.tickets.adult} Взрослых`}
                        </p>
                        {/* <p className="trip-details__collapse-row-right">
                            {seatsInfo.departure.price} <RubleIcon />
                        </p> */}
                    </div>
                    <div className="trip-details__collapse-row">
                        <p className="trip-details__collapse-row-left">
                            {`${seatsInfo.departure.tickets.childWithSeat} Ребенок`}
                        </p>
                        {/* <p className="trip-details__collapse-row-right"> // На бекенде нет цен для детских билетов
                            {seatsInfo.departure.price} <RubleIcon />
                        </p> */}
                    </div>
                </Collapse>
            </div>
            <div className="trip-details__price">
                <div className="trip-details__box">
                    <p className="trip-details__price-left">Итог</p>
                    <p className="trip-details__price-right">{seatsInfo.totalPrice} <RubleIcon /></p>
                </div>
            </div>
        </div>
    );
}
