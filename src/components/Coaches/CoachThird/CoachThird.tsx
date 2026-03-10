import Coach from "../Coach/Coach";
import PairSeatCell from "../SeatCell/PairSeatCell";
import SingleSeatCell from "../SeatCell/SingleSeatCell.tsx";
import type { CoachClassProps } from "../types.ts";
import "./CoachThird.css";
/**
 * Компонент вагона класса Плацкарт
 */
export default function CoachThird({
    coach,
    onSeatSelect,
    selectedSeats = [],
    message,
}: CoachClassProps) {
    const seats = coach.seats;
    const totalSeats = seats.length;

    const handleSeatClick = (index: number, available: boolean) => {
        if (available && onSeatSelect) {
            onSeatSelect(index);
        }
    };

    // Верхний ряд: 2/3 мест (обязательно чётное количество, округляем вверх)
    const topRowCount = Math.floor((totalSeats * 2) / 3);
    const topRowSeatsEven = topRowCount % 2 === 0 ? topRowCount : topRowCount + 1;

    // Места для верхнего ряда
    const topSeats = seats.slice(0, topRowSeatsEven);

    // Места для нижнего ряда
    const bottomSeats = seats.slice(topRowSeatsEven);

    // Нечетный индекс = нижнее место, четный = верхнее место
    const renderSeatsAsPairs = (seatsList: typeof seats) => {
        const cells: React.ReactNode[] = [];

        for (let i = 0; i < seatsList.length; i += 2) {
            const firstSeat = seatsList[i];
            const secondSeat = seatsList[i + 1];

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
            } else if (firstSeat) {
                // Осталось одно место
                cells.push(
                    <SingleSeatCell
                        key={`single-${firstSeat.index}`}
                        seat={firstSeat}
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
            className="coach-third"
            message={message}
            coach={coach}
        >
            <div className="coach__row-top">{renderSeatsAsPairs(topSeats)}</div>
            <div className="coach__row-bottom">{renderSeatsAsPairs(bottomSeats)}</div>
        </Coach>
    );
}
