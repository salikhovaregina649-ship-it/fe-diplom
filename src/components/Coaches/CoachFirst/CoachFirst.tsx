import Coach from "../Coach/Coach";
import SingleSeatCell from "../SeatCell/SingleSeatCell";
import type { CoachClassProps } from "../types.ts";
import "./CoachFirst.css";
/**
 * Компонент вагона класса "Люкс"
 */
export default function CoachFirst({
    coach,
    onSeatSelect,
    selectedSeats = [],
    message,
}: CoachClassProps) {
    const seats = coach.seats;

    const handleSeatClick = (index: number, available: boolean) => {
        if (available && onSeatSelect) {
            onSeatSelect(index);
        }
    };

    return (
        <Coach
            className="coach-first"
            message={message}
            coach={coach}
        >
            <div className="coach__row-top">
                {seats.map((seat) => (
                    <SingleSeatCell
                        key={seat.index}
                        seat={seat}
                        selectedSeats={selectedSeats}
                        onSeatClick={handleSeatClick}
                    />
                ))}
            </div>
            <div className="coach__row-bottom" />
        </Coach>
    );
}

