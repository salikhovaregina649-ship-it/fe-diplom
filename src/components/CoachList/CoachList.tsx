import { useState } from "react";
import type { CoachesData } from "../../types/typeSeat";
import Checkbox from "../uikit/Checkbox/Checkbox";
import Popover from "../uikit/Popover/Popover";
import "./CoachList.css";
// icons
import RubleIcon from "../../assets/icons/small/RubleIcon";
import CoachFourth from "../CoachFourth/CoachFourth";

interface CoachListProps {
    coaches: CoachesData;
    selectedCoaches: string[];
    handleCoachChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CoachList({
    coaches,
    selectedCoaches,
    handleCoachChange,
}: CoachListProps) {
    const fourthCoaches = coaches.filter(
        (c) => c.coach.class_type === "fourth",
    );

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const handleSeatSelect = (seatIndex: number) => {
        setSelectedSeats((prev) =>
            prev.includes(seatIndex)
                ? prev.filter((id) => id !== seatIndex)
                : [...prev, seatIndex],
        );
    };

    return (
        <>
            <div className="ticket-seats__class-item-coaches">
                <div className="ticket-seats__coaches">
                    <div className="ticket-seats__coaches-wrapper">
                        <span className="ticket-seats__coaches-label">
                            Вагоны
                        </span>
                        {/**Вопрос!! coach.name = "ПУВБМ-59" - это номер вагона? На макете норме просто число*/}
                        {coaches.map((item) => {
                            const coachNumber =
                                item.coach.name.match(/\d+/)?.[0] ?? "";
                            return (
                                <Checkbox
                                    key={item.coach._id}
                                    className="ticket-seats__coach-checkbox"
                                    value={coachNumber}
                                    label={coachNumber}
                                    checked={selectedCoaches.includes(
                                        coachNumber,
                                    )}
                                    onChange={handleCoachChange}

                                    checkMark={true}
                                />
                            );
                        })}
                    </div>
                    <p className="ticket-seats__coaches-text">
                        Нумерация вагонов начинается с головы поезда
                    </p>
                </div>
                <div className="ticket-seats__options">
                    {coaches
                        .filter((item) =>
                            selectedCoaches.includes(item.coach.name),
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
                                            {item.coach.available_seats}
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
                                        Обслуживание <span>фпк</span>
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

            <div className="ticket-seats__coach-fourth">
                {fourthCoaches.map((item) => (
                    <CoachFourth
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={handleSeatSelect}
                        selectedSeats={selectedSeats}
                    />
                ))}
            </div>
            <div className="ticket-seats__coach-reservedSeat"></div>
            <div className="ticket-seats__coach-coupe"></div>
            <div className="ticket-seats__coach-luxury"></div>
        </>
    );
}
