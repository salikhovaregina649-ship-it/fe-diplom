import Coach from "../Coach/Coach";
import PairSeatCell from "../SeatCell/PairSeatCell";
import type { CoachClassProps } from "../types";
import "./CoachSecond.css";

/**
 * Компонент вагона класса Купе
 * Места сгруппированы в ячейки по 2 (верх + низ)
 */
export default function CoachSecond({
    coach,
    onSeatSelect,
    selectedSeats = [],
    message,
}: CoachClassProps) {
    const totalSeats = coach.seats.length;

    // Группируем места в ячейки по 2 (нечетное - нижнее, четное - верхнее)
    const cellsCount = Math.ceil(totalSeats / 2);

    const cells = Array.from({ length: cellsCount }, (_, i) => {
        const bottomSeat = coach.seats.find((s) => s.index === i * 2 + 1); // нечетное - низ
        const topSeat = coach.seats.find((s) => s.index === i * 2 + 2); // четное - верх
        return {
            number: i + 1,
            bottomSeat: bottomSeat || null,
            topSeat: topSeat || null,
        };
    });

    const handleSeatClick = (seatIndex: number, available: boolean) => {
        if (available && onSeatSelect) {
            onSeatSelect(seatIndex);
        }
    };

    return (
        <Coach
            className="coach-second"
            message={message}
            coach={coach}
        >
            <div className="coach__row-top">
                {cells.map((cell) => (
                    <PairSeatCell
                        key={cell.number}
                        topSeat={cell.topSeat}
                        bottomSeat={cell.bottomSeat}
                        selectedSeats={selectedSeats}
                        onSeatClick={handleSeatClick}
                        className="coach-second__cell"
                    />
                ))}
            </div>
            <div className="coach__row-bottom" />
        </Coach>
    );
}
