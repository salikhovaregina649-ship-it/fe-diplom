import { useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { CoachesData } from "../../types/typeSeat";
import Checkbox from "../uikit/Checkbox/Checkbox";
import CoachFirst from "../Coaches/CoachFirst/CoachFirst";
import CoachSecond from "../Coaches/CoachSecond/CoachSecond";
import CoachThird from "../Coaches/CoachThird/CoachThird";
import CoachFourth from "../Coaches/CoachFourth/CoachFourth";
import type { CoachWithSeats } from "../../types/typeSeat";
import RubleIcon from "../../assets/icons/small/RubleIcon";
import { setPrice, setSelectedSeatsCount, updateTickets, setSelectedSeats } from "../../store/seatsSlice/seatsSlice";
import type { RootState } from "../../store/store";
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
    arrival = false,
}: CoachListProps) {
    const dispatch = useDispatch();
    const seatsData = useSelector((state: RootState) => state.seats);

    const currentSeatInfo = arrival ? seatsData.arrival : seatsData.departure;
    const tickets = currentSeatInfo?.tickets || { adult: 1, childWithSeat: 0, childWithoutSeat: 0 };

    const prevCountRef = useRef(0);

    const selectedSeats = useMemo(() => {
        return currentSeatInfo?.selectedSeats || {};
    }, [currentSeatInfo?.selectedSeats])

    const handleSeatSelect = (coachId: string, seatIndex: number) => {
        dispatch(setSelectedSeats({coachId, seatIndex, isArrival: !!arrival}));
    };

    const getSeatPrice = (coachId: string, seatIndex: number) => {
        const coach = coaches.find(c => c.coach._id === coachId);
        if (!coach) return 0;
        if (coach.coach.class_type === "fourth") {
            return coach.coach.bottom_price; // Для сидячих вагонов все места имеют одинаковую цену
        }
        if (coach.coach.class_type === "first") {
            return coach.coach.price; // Для первого класса все места имеют одинаковую цену
        }
        const isBottom = seatIndex % 2 === 1; // Нечетные индексы — нижние места
        return isBottom ? coach.coach.bottom_price : coach.coach.top_price;
    };

    let totalPrice = 0;
    for (const [coachId, seats] of Object.entries(selectedSeats)) {
        for (const seatIndex of seats) {
            totalPrice += getSeatPrice(coachId, seatIndex);
        }
    }

    useEffect(() => {
        dispatch(setPrice({price: totalPrice, isArrival: !!arrival}));
    }, [arrival, dispatch, totalPrice]);

    useEffect(() => {
        const count = Object.values(selectedSeats).flat().length;
        dispatch(setSelectedSeatsCount({count, isArrival: !!arrival}));

        const requiredSeats = tickets.adult + tickets.childWithSeat;
        if (count > requiredSeats && count > prevCountRef.current) {
            dispatch(updateTickets({tickets: {adult: tickets.adult + 1}, isArrival: !!arrival}));
        }
        prevCountRef.current = count;
    }, [arrival, dispatch, selectedSeats, tickets.adult, tickets.childWithSeat]);

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
                    />
                );

            case "second":
                return (
                    <CoachSecond
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={(seat) => handleSeatSelect(item.coach._id, seat)}
                        selectedSeats={selectedSeats[item.coach._id] || []}
                    />
                );

            case "third":
                return (
                    <CoachThird
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={(seat) => handleSeatSelect(item.coach._id, seat)}
                        selectedSeats={selectedSeats[item.coach._id] || []}
                    />
                );

            case "fourth":
                return (
                    <CoachFourth
                        key={item.coach._id}
                        coach={item}
                        onSeatSelect={(seat) => handleSeatSelect(item.coach._id, seat)}
                        selectedSeats={selectedSeats[item.coach._id] || []}
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
                            const coachNumber = item.coach.name.match(/\d+/)?.[0] ?? "";

                            return (
                                <Checkbox
                                    key={item.coach._id}
                                    className="coach-list__checkbox"
                                    value={item.coach._id}
                                    label={coachNumber}
                                    checked={selectedCoaches.includes(
                                        item.coach._id,
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
                            // const coachNumber = item.coach.name.match(/\d+/)?.[0] ?? "";
                            return selectedCoaches.includes(item.coach._id);
                        })
                        .map(renderCoach)
                    }
                </div> 
                {totalPrice > 0 && (
                    <div className="coach__checked-total-price">
                        {totalPrice.toLocaleString()} <RubleIcon />
                    </div>
                )}
            </div>
        </div>
    );
}
