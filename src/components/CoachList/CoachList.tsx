import { useState } from "react";
import type { CoachesData } from "../../types/typeSeat";
import Checkbox from "../uikit/Checkbox/Checkbox";
import CoachFirst from "../Coaches/CoachFirst/CoachFirst";
import CoachSecond from "../Coaches/CoachSecond/CoachSecond";
import CoachThird from "../Coaches/CoachThird/CoachThird";
import CoachFourth from "../Coaches/CoachFourth/CoachFourth";
import type { CoachWithSeats } from "../../types/typeSeat";
import RubleIcon from "../../assets/icons/small/RubleIcon";
import "./CoachList.css";

export interface CoachListProps {
    coaches: CoachesData;
    selectedCoaches: string[];
    handleCoachChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    arrival?: boolean;
}

export default function CoachList({
    coaches,
    selectedCoaches,
    handleCoachChange,
}: CoachListProps) {
    const [selectedSeats, setSelectedSeats] = useState<
        Record<string, number[]>
    >({});

    const handleSeatSelect = (coachId: string, seatIndex: number) => {
        setSelectedSeats((prev) => {
            const coachSeats = prev[coachId] || [];

            return {
                ...prev,
                [coachId]: coachSeats.includes(seatIndex)
                    ? coachSeats.filter((id) => id !== seatIndex)
                    : [...coachSeats, seatIndex],
            };
        });
    };

    const renderCoach = (item: CoachWithSeats) => {
        const type = item.coach.class_type;

        switch (type) {
            case "first":
                return (
                    <CoachFirst
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={(seat) => handleSeatSelect(item.coach._id, seat)}
                        selectedSeats={selectedSeats[item.coach._id] || []}
                        message="11 человек выбирают места в этом поезде"
                    />
                );

            case "second":
                return (
                    <CoachSecond
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={(seat) => handleSeatSelect(item.coach._id, seat)}
                        selectedSeats={selectedSeats[item.coach._id] || []}
                        message="11 человек выбирают места в этом поезде"
                    />
                );

            case "third":
                return (
                    <CoachThird
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={(seat) => handleSeatSelect(item.coach._id, seat)}
                        selectedSeats={selectedSeats[item.coach._id] || []}
                        message="11 человек выбирают места в этом поезде"
                    />
                );

            case "fourth":
                return (
                    <CoachFourth
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={(seat) => handleSeatSelect(item.coach._id, seat)}
                        selectedSeats={selectedSeats[item.coach._id] || []}
                        message="11 человек выбирают места в этом поезде"
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="coach-list">
            <div className="coach-list-row">
                <div className="coach-list__coach-header">
                    <div className="coach-list__wrapper">
                        <span className="coach-list__label">Вагоны</span>

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

            <div className="coach-list__coach-wrapper">
                <div className="coach-list__coach">
                    {coaches
                        .filter((item) => {
                            const coachNumber =
                                item.coach.name.match(/\d+/)?.[0] ?? "";
                            return selectedCoaches.includes(coachNumber);
                        })
                        .map(renderCoach)
                    }
                </div> 
                {/* Должно будет подсчитываться */}
                {Object.values(selectedSeats).flat().length > 0 && (
                    <div className="coach__checked-total-price">
                        8 080 <RubleIcon />
                    </div>
                )}
            </div>
        </div>
    );
}
