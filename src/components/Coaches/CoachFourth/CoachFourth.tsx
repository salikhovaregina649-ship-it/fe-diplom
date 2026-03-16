import Coach from "../Coach/Coach";
import PairSeatCell from "../SeatCell/PairSeatCell";
import SingleSeatCell from "../SeatCell/SingleSeatCell";
import type { CoachClassProps } from "../types.ts";
import "./CoachFourth.css";
/**
 * Компонент вагона класса Сидячий
 */
export default function CoachFourth({
    coach,
    onSeatSelect,
    selectedSeats = [],
}: CoachClassProps) {
    const seats = coach.seats;
    const totalSeats = seats.length;

    const handleSeatClick = (index: number, available: boolean) => {
        if (available && onSeatSelect) {
            onSeatSelect(index);
        }
    };

    // Верхний ряд: половина мест (обязательно чётное количество, округляем вверх)
    const halfSeats = Math.floor(totalSeats / 2);
    const topRowSeats = halfSeats % 2 === 0 ? halfSeats : halfSeats + 1;

    // Места для верхнего ряда
    const topSeats = seats.slice(0, topRowSeats);

    // Места для нижнего ряда
    const bottomSeats = seats.slice(topRowSeats);

    // Верхний ряд
    const renderTopRow = () => {
        const cells: React.ReactNode[] = [];
        
        for (let i = 0; i < topSeats.length; i += 2) {
            const firstSeat = topSeats[i];
            const secondSeat = topSeats[i + 1];

            cells.push(
                <PairSeatCell
                    key={`top-pair-${i}`}
                    topSeat={secondSeat}
                    bottomSeat={firstSeat}
                    selectedSeats={selectedSeats}
                    onSeatClick={handleSeatClick}
                />
            );
        }

        return cells;
    };

    // Нижний ряд
    const renderBottomRow = () => {
        const cells: React.ReactNode[] = [];

        if (bottomSeats.length === 0) return cells;

        // Первый - всегда одиночный
        cells.push(
            <SingleSeatCell
                key="bottom-single-first"
                seat={bottomSeats[0]}
                selectedSeats={selectedSeats}
                onSeatClick={handleSeatClick}
            />
        );

        // Средние места по 2
        const middleSeats = bottomSeats.slice(1, -1);

        for (let i = 0; i < middleSeats.length; i += 2) {
            const firstSeat = middleSeats[i];
            const secondSeat = middleSeats[i + 1];

            if (secondSeat) {
                cells.push(
                    <PairSeatCell
                        key={`bottom-pair-${i}`}
                        topSeat={firstSeat}
                        bottomSeat={secondSeat}
                        selectedSeats={selectedSeats}
                        onSeatClick={handleSeatClick}
                    />
                );
            } else {
                // Одно место осталось
                cells.push(
                    <SingleSeatCell
                        key={`bottom-single-middle-${i}`}
                        seat={firstSeat}
                        selectedSeats={selectedSeats}
                        onSeatClick={handleSeatClick}
                    />
                );
            }
        }

        // Последний - всегда одиночный
        if (bottomSeats.length > 1) {
            cells.push(
                <SingleSeatCell
                    key="bottom-single-last"
                    seat={bottomSeats[bottomSeats.length - 1]}
                    selectedSeats={selectedSeats}
                    onSeatClick={handleSeatClick}
                />
            );
        }

        return cells;
    };

    return (
        <Coach
            className="coach-fourth"
            coach={coach}
        >
            <div className="coach__row-top">{renderTopRow()}</div>
            <div className="coach__row-bottom">{renderBottomRow()}</div>
        </Coach>
    );
}
