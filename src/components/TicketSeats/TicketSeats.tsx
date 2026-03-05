import { useState } from "react";
import { useNavigate } from "react-router";
import Title from "../uikit/Title/Title";
import Button from "../uikit/Button/Button";
import TravelInfo from "../TravelInfo/TravelInfo";
import Radio from "../uikit/Radio/Radio";
import Checkbox from "../uikit/Checkbox/Checkbox";
import Popover from "../uikit/Popover/Popover";
import { formatTimeLong } from "../../utils/formatTime";
import "./TicketSeats.css";
// icons
import ArrowIconBig from "../../assets/icons/small/ArrowIconBig";
import RubleIcon from "../../assets/icons/small/RubleIcon";
import trainIconSmal from "../../assets/icons/small/trainIconSmall.svg";
import ArrowIconSmall from "../../assets/icons/small/ArrowIconSmall";
import clock from "../../assets/icons/small/clock.svg";

import routesResponse from "../../mocks/routesResponse.json";
import seatsResponse from "../../mocks/seatsResponse.json";
import clsx from "clsx";

//Моки
const trainInfo = routesResponse.items[0];
const seatsInfo = seatsResponse;
const classes = [
    {
        id: "classSedentary",
        value: "sedentary",
        label: "Сидячий",
    },
    {
        id: "classReservedSeat",
        value: "reservedSeat",
        label: "Плацкарт",
    },
    {
        id: "classCoupe",
        value: "coupe",
        label: "Купе",
    },
    {
        id: "classLuxury",
        value: "luxury",
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
                            <p className={clsx("form-ticket-category__text", "form-ticket-category__text--ligth")}>
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
                        <div className="ticket-seats__class-selection">
                            {classes.map((item, index) => (
                                <Radio
                                    key={index}
                                    className="ticket-seats__class-selection-item"
                                    name="class"
                                    id={item.id}
                                    value={item.value}
                                    label={item.label}
                                    checked={currentClass === item.value}
                                    onChange={handleClassChange}
                                />
                            ))}
                        </div>

                        <div className="ticket-seats__class-item">
                            <div className="ticket-seats__coaches">
                                <div className="ticket-seats__coaches-wrapper">
                                    <span className="ticket-seats__coaches-label">
                                        Вагоны
                                    </span>
                                    {/**Вопрос!! coach.name = "ПУВБМ-59" - это номер вагона? На макете норме просто число*/}
                                    {seatsInfo.map((item, index) => (
                                        
                                        <Checkbox
                                            key={index}
                                            className="ticket-seats__coach-checkbox"
                                            value={item.coach.name}
                                            label={item.coach.name}
                                            checked={selectedCoaches.includes(
                                                item.coach.name,
                                            )}
                                            onChange={handleCoachChange}
                                        />
                                    ))}
                                </div>
                                <p className="ticket-seats__coaches-text">
                                    Нумерация вагонов начинается с головы поезда
                                </p>
                            </div>
                            <div className="ticket-seats__options">
                                {seatsInfo
                                    .filter((item) =>
                                        selectedCoaches.includes(
                                            item.coach.name,
                                        ),
                                    )
                                    .map((item) => (
                                        <div
                                            key={item.coach._id}
                                            className="ticket-seats__coach-info"
                                        >
                                            <div className="ticket-seats__coach-number">
                                                {item.coach.name}
                                                <span>вагон</span>
                                            </div>
                                            <div className="ticket-seats__coach-seats">
                                                <p>
                                                    Места{" "}
                                                    <span>
                                                        {
                                                            item.coach
                                                                .available_seats
                                                        }
                                                    </span>
                                                </p>
                                                {/*Вопрос!! В ответе такой информации нет. Нужно высчитать каждое 2 свободное место?*/}
                                                <p>Верхние 3</p>
                                                <p>Нижние 8</p>
                                            </div>
                                            <div className="ticket-seats__coach-price">
                                                <p>Стоимость</p>
                                                <p>
                                                    {item.coach.top_price}
                                                    <RubleIcon />
                                                </p>
                                                <p>
                                                    {item.coach.bottom_price}
                                                    <RubleIcon />
                                                </p>
                                            </div>
                                            <div className="ticket-seats__coach-service">
                                                <p>
                                                    Обслуживание{" "}
                                                    <span>фпк</span>
                                                </p>
                                                <ul>
                                                    <li>
                                                        {/* Icon кондиционер*/}
                                                        {/* <Popover /> */}
                                                    </li>
                                                    <li>
                                                        {/* Icon wi-fi*/}
                                                        {/* <Popover /> */}
                                                    </li>
                                                    <li>
                                                        {/* Icon белье*/}
                                                        {/* <Popover /> */}
                                                    </li>
                                                    <li>
                                                        {/* Icon питание*/}
                                                        {/* <Popover /> */}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="class-sedentary"></div>
                        <div className="class-reservedSeat"></div>
                        <div className="class-coupe"></div>
                        <div className="class-luxury"></div>

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
