import { useState } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import Title from "../uikit/Title/Title";
import Button from "../uikit/Button/Button";
import TravelInfo from "../TravelInfo/TravelInfo";
import Radio from "../uikit/Radio/Radio";
import CoachList from "../CoachList/CoachList";
import { formatTimeLong } from "../../utils/formatTime";
import "./TicketSeats.css";
// icons
import ArrowIconBig from "../../assets/icons/small/ArrowIconBig";
import trainIconSmal from "../../assets/icons/small/trainIconSmall.svg";
import ArrowIconSmall from "../../assets/icons/small/ArrowIconSmall";
import clock from "../../assets/icons/small/clock.svg";
import SedentaryIcon from "../../assets/icons/filter/SedentaryIcon";
import CoupeIcon from "../../assets/icons/filter/CoupeIcon";
import ReservedSeatIcon from "../../assets/icons/filter/ReservedSeatIcon";
import LuxuryIcon from "../../assets/icons/filter/LuxuryIcon";

import routesResponse from "../../mocks/routesResponse.json";
import seatsResponse from "../../mocks/seatsResponse.json";

//Моки
const trainInfo = routesResponse.items[0];
const seatsInfo = seatsResponse;
const classes = [
    {
        icon: SedentaryIcon,
        id: "classFourth",
        value: "fourth",
        label: "Сидячий",
    },
    {
        icon: ReservedSeatIcon,
        id: "classThird",
        value: "third",
        label: "Плацкарт",
    },
    {
        icon: CoupeIcon,
        id: "classSecond",
        value: "second",
        label: "Купе",
    },
    {
        icon: LuxuryIcon,
        id: "classFirst",
        value: "first",
        label: "Люкс",
    },
];

export default function TicketSeats() {
    const [currentClass, setCurrentClass] = useState<string | null>(null);
    const [selectedCoaches, setSelectedCoaches] = useState<string[]>([]);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleThen = () => {
        navigate("/booking/passengers");
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
        <div className="ticket-seats">
            <Title as="h3" className="ticket-seats__title" uppercase={true}>
                Выбор мест
            </Title>

            <div className="ticket-seats__box">
                <div className="ticket-seats__choose-another">
                    <div className="ticket-seats__icon-box">
                        <ArrowIconBig />
                    </div>
                    <Button
                        type="button"
                        className="ticket-seats__btn"
                        variant="light"
                        onClick={handleBack}
                    >
                        Выбрать другой поезд
                    </Button>
                </div>

                <div className="ticket-seats__train">
                    <div className="ticket-seats__train-info">
                        <div className="ticket-seats__train-info-icon-box">
                            <img
                                className="ticket-seats__icon"
                                src={trainIconSmal}
                                alt=""
                            />
                        </div>
                        <div className="ticket-seats__train-info-box">
                            <p className="ticket-seats__number">
                                {trainInfo.departure.train.name}
                            </p>
                            {/** Проверить Train, там вопрос
                                 *  <p className=".ticket-seats__city ticket-seats__starting-city">
                                 *      {Город}
                                            <ArrowIconSmall />    
                                    </p>
                                */}
                            <p className="ticket-seats__city">
                                {trainInfo.departure.from.city.name}
                                <ArrowIconSmall />
                            </p>
                            <p className="ticket-seats__city">
                                {trainInfo.departure.to.city.name}
                            </p>
                        </div>
                    </div>
                    <TravelInfo
                        className="ticket-seats__travel-info"
                        trainInfo={trainInfo}
                    />
                    <div className="ticket-seats__time-way">
                        <img
                            className="ticket-seats__icon"
                            src={clock}
                            alt=""
                        />
                        <time
                            className="ticket-seats__time-way-time"
                            dateTime={new Date(
                                trainInfo.departure.duration * 1000,
                            ).toISOString()}
                        >
                            {formatTimeLong(trainInfo.departure.duration)}
                        </time>
                    </div>
                </div>

                <div className="ticket-seats__tickets-number">
                    <Title
                        as="h3"
                        className="ticket-seats__tickets-number-title"
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

                <div className="ticket-seats__class">
                    <Title as="h3" className="ticket-seats__class-title">
                        Тип вагона
                    </Title>
                    <div className="ticket-seats__class-box">
                        <ul className="ticket-seats__class-list">
                            {classes.map((item) => (
                                <li
                                    className="ticket-seats__class-item"
                                    key={item.id}
                                    onClick={() =>
                                        handleClassChange(item.value)
                                    }
                                >
                                    <item.icon />
                                    <Radio
                                        className="ticket-seats__class-radio"
                                        name="class"
                                        id={item.id}
                                        value={item.value}
                                        label={item.label}
                                        checked={currentClass === item.value}
                                        onChange={handleClassChange}
                                    />
                                </li>
                            ))}
                        </ul>

                        {filteredCoaches.length === 0 ? (
                            <div>Нет доступных вагонов такого класса</div>
                        ) : (
                            <CoachList
                                coaches={filteredCoaches}
                                selectedCoaches={selectedCoaches}
                                handleCoachChange={handleCoachChange}
                            />
                        )}

                        {/**В обратном поезде тоже самое все, но стрелка с другую сторону
                         * и блок ticket-seats__choose-another справа */}
                    </div>
                </div>
            </div>

            <Button
                className="ticket-seats__then-btn"
                type="button"
                variant="yellow"
                onClick={handleThen}
                uppercase={true}
            >
                Далее
            </Button>
        </div>
    );
}
