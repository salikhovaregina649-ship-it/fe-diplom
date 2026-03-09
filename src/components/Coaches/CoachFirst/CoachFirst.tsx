import Coach from "../Coach/Coach";
import PairSeatCell from "../SeatCell/PairSeatCell";
import type { CoachClassProps } from "../types";
import "./CoachFirst.css";
/**
 * Компонент вагона класса "Люкс" (СВ)
 */
export default function CoachFirst({
    coach,
    onSeatSelect,
    selectedSeats = [],
    message,
}: CoachClassProps) {
    const totalSeats = coach.seats.length;

    // Группируем места по парам (нечетное + четное = купе)
    const coupeCount = Math.ceil(totalSeats / 2);

    // Создаем массив купе
    const coupes = Array.from({ length: coupeCount }, (_, i) => {
        const leftSeat = coach.seats.find((s) => s.index === i * 2 + 1);
        const rightSeat = coach.seats.find((s) => s.index === i * 2 + 2);
        return {
            number: i + 1,
            leftSeat: leftSeat || null,
            rightSeat: rightSeat || null,
        };
    });

    const handleSeatClick = (seatIndex: number, available: boolean) => {
        if (available && onSeatSelect) {
            onSeatSelect(seatIndex);
        }
    };

    return (
        <Coach
            className="coach-first"
            message={message}
            coach={coach}
        >
            <div className="coach__row-top">
                {coupes.map((coupe) => (
                    <PairSeatCell
                        key={coupe.number}
                        topSeat={coupe.leftSeat}
                        bottomSeat={coupe.rightSeat}
                        selectedSeats={selectedSeats}
                        onSeatClick={handleSeatClick}
                        className="coach-first__coupe"
                    />
                ))}
            </div>
            <div className="coach__row-bottom" />
        </Coach>
    );
}
