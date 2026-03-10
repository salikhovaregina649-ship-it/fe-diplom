import Coach from "../Coach/Coach";
import PairSeatCell from "../SeatCell/PairSeatCell";
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

    const renderSeatsAsPairs = () => {
        const cells: React.ReactNode[] = [];

        for (let i = 0; i < seats.length; i += 2) {
            const firstSeat = seats[i];
            const secondSeat = seats[i + 1];

            if (firstSeat && secondSeat) {
                cells.push(
                    <PairSeatCell
                        key={`pair-${firstSeat.index}-${secondSeat.index}`}
                        topSeat={secondSeat}
                        bottomSeat={firstSeat}
                        selectedSeats={selectedSeats}
                        onSeatClick={handleSeatClick}
                    />
                );
            }
        }

        return cells;
    };

    return (
        <Coach
            className="coach-first"
            message={message}
            coach={coach}
        >
            <div className="coach__row-top">{renderSeatsAsPairs()}</div>
            <div className="coach__row-bottom"></div>
        </Coach>
    );
}

