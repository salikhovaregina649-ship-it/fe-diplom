import Coach from "../Coach/Coach";
import PairSeatCell from "../SeatCell/PairSeatCell";
import type { CoachClassProps } from "../types.ts";
import "./CoachSecond.css";
/**
 * Компонент вагона класса Купе
 */
export default function CoachSecond({
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

    // Группируем места в пары (верхнее + нижнее)
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
            className="coach-second"
            message={message}
            coach={coach}
        >
            <div className="coach__row-top">{renderSeatsAsPairs()}</div>
            <div className="coach__row-bottom"></div>
        </Coach>
    );
}
