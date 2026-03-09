import { useState } from "react";
import type { CoachesData } from "../../types/typeSeat";
import Checkbox from "../uikit/Checkbox/Checkbox";
import CoachFirst from "../Coaches/CoachFirst/CoachFirst";
import CoachSecond from "../Coaches/CoachSecond/CoachSecond";
import CoachThird from "../Coaches/CoachThird/CoachThird";
import CoachFourth from "../Coaches/CoachFourth/CoachFourth";
import "./CoachList.css";

export interface CoachListProps {
    coaches: CoachesData;
    selectedCoaches: string[];
    handleCoachChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CoachList({
    coaches,
    selectedCoaches,
    handleCoachChange,
}: CoachListProps) {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const handleSeatSelect = (seatIndex: number) => {
        setSelectedSeats((prev) =>
            prev.includes(seatIndex)
                ? prev.filter((id) => id !== seatIndex)
                : [...prev, seatIndex],
        );
    };

    const renderCoach = (item: any) => {
        const type = item.coach.class_type;

        switch (type) {
            case "first":
                return (
                    <CoachFirst
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={handleSeatSelect}
                        selectedSeats={selectedSeats}
                    />
                );

            case "second":
                return (
                    <CoachSecond
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={handleSeatSelect}
                        selectedSeats={selectedSeats}
                    />
                );

            case "third":
                return (
                    <CoachThird
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={handleSeatSelect}
                        selectedSeats={selectedSeats}
                    />
                );

            case "fourth":
                return (
                    <CoachFourth
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={handleSeatSelect}
                        selectedSeats={selectedSeats}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <>
            <div className="coach-list">
                <div className="coach-list__coach-header">
                    <div className="coach-list__wrapper">
                        <span className="coach-list__label">
                            Вагоны
                        </span>

                        {coaches.map((item) => {
                            const coachNumber =
                                item.coach.name.match(/\d+/)?.[0] ?? "";

                            return (
                                <Checkbox
                                    key={item.coach._id}
                                    className="coach-list__checkbox"
                                    value={coachNumber}
                                    label={coachNumber}
                                    checked={selectedCoaches.includes(
                                        coachNumber,
                                    )}
                                    onChange={handleCoachChange}
                                />
                            );
                        })}
                    </div>

                    <p className="coach-list__text">
                        Нумерация вагонов начинается с головы поезда
                    </p>
                </div>
            </div>

            <div className="coach-list__coach">
                {coaches
                    .filter((item) => {
                        const coachNumber =
                            item.coach.name.match(/\d+/)?.[0] ?? "";
                        return selectedCoaches.includes(coachNumber);
                    })
                    .map(renderCoach)}
            </div>
        </>
    );
}
