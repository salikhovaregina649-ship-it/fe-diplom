import { useState } from "react";
import type { JSX } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import Title from "../uikit/Title/Title";
import Button from "../uikit/Button/Button";
import TravelInfo from "../TravelInfo/TravelInfo";
import Radio from "../uikit/Radio/Radio";
import CoachList from "../CoachList/CoachList";
import { formatTimeLong } from "../../utils/formatTime";
import type Train from "../../types/typeTrain";
import type { CoachesData } from "../../types/typeSeat";

// icons
import ArrowIconBig from "../../assets/icons/small/ArrowIconBig";
import trainIconSmall from "../../assets/icons/small/trainIconSmall.svg";
import ArrowIconSmall from "../../assets/icons/small/ArrowIconSmall";
import clock from "../../assets/icons/small/clock.svg";
import "./TicketSeatsBox.css";

interface Class {
    icon: () => JSX.Element;
    id: string;
    value: string;
    label: string;
}

interface TicketSeatsBoxProps {
    trainInfo: Train;
    seatsInfo: CoachesData;
    classes: Class[];
    arrival?: boolean;
}

export default function TicketSeatsBox({
    trainInfo,
    seatsInfo,
    classes,
    arrival = false,
}: TicketSeatsBoxProps) {
    const [currentClass, setCurrentClass] = useState<string | null>(null);
    const [selectedCoaches, setSelectedCoaches] = useState<string[]>([]);

    const radioName = arrival ? "class-arrival" : "class-departure";

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const handleClassChange = (value: string) => {
        setCurrentClass(value);
    };

    const handleCoachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedCoaches((prev) => [...prev, value]);
        } else {
            setSelectedCoaches((prev) => prev.filter((name) => name !== value));
        }
    };

    const filteredCoaches = seatsInfo.filter(
        (item) => item.coach.class_type === currentClass,
    );

    return (
        <div
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
                            {trainInfo.departure.train.name}
                        </p>
                        <p className="ticket-seats-box__city">
                            {trainInfo.departure.from.city.name}
                            <ArrowIconSmall />
                        </p>
                        <p className="ticket-seats-box__city">
                            {trainInfo.departure.to.city.name}
                        </p>
                    </div>
                </div>
                <TravelInfo
                    className="ticket-seats-box__travel-info"
                    trainInfo={trainInfo}
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
                            trainInfo.departure.duration * 1000,
                        ).toISOString()}
                    >
                        {formatTimeLong(trainInfo.departure.duration)}
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
                {/**Вопрос!! Что за блок такой, не понимаю что он делает. Это форма? Инпуты должны быть или кнопки?*/}
                <form className="form-ticket-category">
                    <div className="form-ticket-category__box">
                        <label className="form-ticket-category__label">
                            <span>Взрослых — </span>
                            <input
                                className="form-ticket-category__input"
                                type="number"
                                placeholder="0"
                                name="adult"
                                value="3"
                            />
                        </label>
                        <p className="form-ticket-category__text">
                            Можно добавить еще 3 пассажиров
                        </p>
                    </div>
                    <div className="form-ticket-category__box">
                        <label className="form-ticket-category__label">
                            <span>Детских — </span>
                            <input
                                className="form-ticket-category__input"
                                type="number"
                                placeholder="0"
                                name="childlike-with-seat"
                                value="1"
                            />
                        </label>
                        <p
                            className={clsx(
                                "form-ticket-category__text",
                                "form-ticket-category__text--ligth",
                            )}
                        >
                            Можно добавить еще 3 детей
                            <br />
                            до 10 лет. Свое место в вагоне,
                            <br />
                            как у взрослых, но дешевле
                            <br />в среднем на 50-65%
                        </p>
                    </div>
                    <div className="form-ticket-category__box">
                        <label className="form-ticket-category__label">
                            <span>Детских «без места» — </span>
                            <input
                                className="form-ticket-category__input"
                                type="number"
                                placeholder="0"
                                name="childlike-not-seat"
                                value="0"
                            />
                        </label>
                    </div>
                </form>
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
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
