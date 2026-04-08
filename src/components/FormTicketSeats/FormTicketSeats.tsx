import type { JSX } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import Title from "../uikit/Title/Title";
import Button from "../uikit/Button/Button";
import TravelInfo from "../TravelInfo/TravelInfo";
import Radio from "../uikit/Radio/Radio";
import CoachList from "../CoachList/CoachList";
import { formatTimeLong } from "../../utils/formatTime";
import type { Ticket } from "../../types/typeTicket";
import type { CoachesData } from "../../types/typeSeat";
import { setCurrentClass, addCoach, removeCoach, updateTickets } from "../../store/seatsSlice/seatsSlice";
import type { RootState } from "../../store/store";
// icons
import ArrowIconBig from "../../assets/icons/small/ArrowIconBig";
import trainIconSmall from "../../assets/icons/small/trainIconSmall.svg";
import ArrowIconSmall from "../../assets/icons/small/ArrowIconSmall";
import clock from "../../assets/icons/small/clock.svg";
import "./FormTicketSeats.css";

interface Class {
    icon: () => JSX.Element;
    id: string;
    value: string;
    label: string;
}

interface FormTicketSeatsProps {
    ticketInfo: Ticket;
    seatsInfo: CoachesData;
    classes: Class[];
    arrival?: boolean;
}

export default function FormTicketSeats({
    ticketInfo,
    seatsInfo,
    classes,
    arrival = false,
}: FormTicketSeatsProps) {
    const dispatch = useDispatch();
    const seatsData = useSelector((state: RootState) => state.seats);
    const currentSeatInfo = arrival ? seatsData.arrival : seatsData.departure;
    
    const { currentClass, selectedCoaches, tickets } = currentSeatInfo || {
        currentClass: null,
        selectedCoaches: [],
        tickets: { adult: 1, childWithSeat: 0, childWithoutSeat: 0 },
    };
    
    console.log(`${arrival ? "ARRIVAL" : "DEPARTURE"} состояние:`, { currentClass, selectedCoaches, tickets }); // удалить потом

    const radioName = arrival ? "class-arrival" : "class-departure";

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const handleClassChange = (value: string) => {
        dispatch(setCurrentClass({ value, isArrival: arrival }));
    };

    const handleCoachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (checked) {
            dispatch(addCoach({ coach: value, isArrival: arrival }));
        } else {
            dispatch(removeCoach({ coach: value, isArrival: arrival }));
        }
    };

    const filteredCoaches = seatsInfo.filter(
        (item) => item.coach.class_type === currentClass,
    );

    const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let number = Number(value);

        if (name === "childWithoutSeat") {
            // ограничение по числу взрослых
            number = Math.min(number, tickets.adult);
        }

        if (number > 6) return;

        dispatch(updateTickets({
            tickets: { [name]: number } as Partial<typeof tickets>,
            isArrival: arrival,
        }));
    };

    return (
        <form
            className={clsx(
                "ticket-seats-box",
                arrival && "ticket-seats-box--arrival",
            )}
        >
            <div className="ticket-seats-box__choose-another">
                <div className="ticket-seats-box__icon-box">
                    <ArrowIconBig />
                </div>
                <Button
                    type="button"
                    className="ticket-seats-box__btn"
                    variant="light"
                    onClick={handleBack}
                >
                    Выбрать другой поезд
                </Button>
            </div>

            <div className="ticket-seats-box__train">
                <div className="ticket-seats-box__train-info">
                    <div className="ticket-seats-box__train-info-icon-box">
                        <img
                            className="ticket-seats-box__icon"
                            src={trainIconSmall}
                            alt=""
                        />
                    </div>
                    <div className="ticket-seats-box__train-info-box">
                        <p className="ticket-seats-box__number">
                            {ticketInfo.departure.train.name}
                        </p>
                        <p className="ticket-seats-box__city">
                            {ticketInfo.departure.from.city.name}
                            <ArrowIconSmall />
                        </p>
                        <p className="ticket-seats-box__city">
                            {ticketInfo.departure.to.city.name}
                        </p>
                    </div>
                </div>
                <TravelInfo
                    className="ticket-seats-box__travel-info"
                    ticketInfo={ticketInfo}
                />
                <div className="ticket-seats-box__time-way">
                    <img
                        className="ticket-seats-box__icon"
                        src={clock}
                        alt=""
                    />
                    <time
                        className="ticket-seats-box__time-way-time"
                        dateTime={new Date(
                            ticketInfo.departure.duration * 1000,
                        ).toISOString()}
                    >
                        {formatTimeLong(ticketInfo.departure.duration)}
                    </time>
                </div>
            </div>

            <div className="ticket-seats-box__tickets-number">
                <Title
                    as="h3"
                    className="ticket-seats-box__tickets-number-title"
                >
                    Количество билетов
                </Title>
                <div className="ticket-seats-box__ticket-category">
                    <div className="ticket-seats-box__ticket-category__box">
                        <label className="ticket-seats-box__ticket-category__label">
                            <span>Взрослых — </span>
                            <input
                                className="ticket-seats-box__ticket-category__input"
                                type="number"
                                name="adult"
                                min={1}
                                max={6}
                                value={tickets.adult}
                                onChange={handleTicketChange}
                            />
                        </label>
                        <p className="ticket-seats-box__ticket-category__text">
                            Можно добавить еще
                            <br />
                            3 пассажиров
                        </p>
                    </div>
                    <div className="ticket-seats-box__ticket-category__box">
                        <label className="ticket-seats-box__ticket-category__label">
                            <span>Детских — </span>
                            <input
                                className="ticket-seats-box__ticket-category__input"
                                type="number"
                                name="childWithSeat"
                                min={0}
                                max={6}
                                value={tickets.childWithSeat}
                                onChange={handleTicketChange}
                                disabled={tickets.adult === 0}
                            />
                        </label>
                        <p className="ticket-seats-box__ticket-category__text">
                            Можно добавить еще 3 детей
                            <br />
                            до 10 лет. Свое место в вагоне,
                            <br />
                            как у взрослых, но дешевле
                            <br />в среднем на 50-65%
                        </p>
                    </div>
                    <div className="ticket-seats-box__ticket-category__box">
                        <label className="ticket-seats-box__ticket-category__label">
                            <span>Детских «без места» — </span>
                            <input
                                className="ticket-seats-box__ticket-category__input"
                                type="number"
                                name="childWithoutSeat"
                                min={0}
                                max={tickets.adult}
                                disabled={tickets.adult === 0}
                                value={tickets.childWithoutSeat}
                                onChange={handleTicketChange}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="ticket-seats-box__class">
                <Title as="h3" className="ticket-seats-box__class-title">
                    Тип вагона
                </Title>
                <div className="ticket-seats-box__class-box">
                    <ul className="ticket-seats-box__class-list">
                        {classes.map((item) => (
                            <li
                                className="ticket-seats-box__class-item"
                                key={item.id}
                                onClick={() => handleClassChange(item.value)}
                            >
                                <item.icon />
                                <Radio
                                    className="ticket-seats-box__class-radio"
                                    name={radioName}
                                    id={item.id}
                                    value={item.value}
                                    label={item.label}
                                    checked={currentClass === item.value}
                                    onChange={handleClassChange}
                                />
                            </li>
                        ))}
                    </ul>

                    {currentClass && (
                        <CoachList
                            coaches={filteredCoaches}
                            selectedCoaches={selectedCoaches}
                            handleCoachChange={handleCoachChange}
                            arrival={arrival}
                        />
                    )}
                </div>
            </div>
        </form>
    );
}
