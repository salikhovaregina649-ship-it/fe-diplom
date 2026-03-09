import Coach from "../Coach/Coach";
import PairSeatCell from "../SeatCell/PairSeatCell";
import type { CoachClassProps } from "../types";
import "./CoachThird.css";
/**
 * Компонент вагона класса Плацкарт
 * 4 ряда мест (2 сверху, 2 снизу), сгруппированных в ячейки по 2 места
 */
export default function CoachThird({
    coach,
    onSeatSelect,
    selectedSeats = [],
    message,
}: CoachClassProps) {
    const totalSeats = coach.seats.length;

    // Делим места на 4 ряда
    const quarterSize = Math.ceil(totalSeats / 4);

    // Создаем ячейки для каждого ряда
    const createRowCells = (startIndex: number, count: number) => {
        const cells = [];
        for (let i = 0; i < count; i++) {
            const topSeat = coach.seats.find(
                (s) => s.index === startIndex + i * 2 + 1,
            );
            const bottomSeat = coach.seats.find(
                (s) => s.index === startIndex + i * 2 + 2,
            );
            cells.push({
                number: `${startIndex}-${i}`,
                topSeat: topSeat || null,
                bottomSeat: bottomSeat || null,
            });
        }
        return cells;
    };

    // 4 ряда ячеек
    const row1 = createRowCells(0, Math.ceil(quarterSize / 2));
    const row2 = createRowCells(quarterSize, Math.ceil(quarterSize / 2));
    const row3 = createRowCells(quarterSize * 2, Math.ceil(quarterSize / 2));
    const row4 = createRowCells(quarterSize * 3, Math.ceil(quarterSize / 2));

    const handleSeatClick = (seatIndex: number, available: boolean) => {
        if (available && onSeatSelect) {
            onSeatSelect(seatIndex);
        }
    };

    return (
        <Coach
            className="coach-third"
            message={message}
            coach={coach}
        >
            {/* Верхние ряды */}
            <div className="coach__row-top">
                <div className="coach-third__row">
                    {row1.map((cell) => (
                        <PairSeatCell
                            key={cell.number}
                            topSeat={cell.topSeat}
                            bottomSeat={cell.bottomSeat}
                            selectedSeats={selectedSeats}
                            onSeatClick={handleSeatClick}
                            className="coach-third__cell"
                        />
                    ))}
                </div>
                <div className="coach-third__row">
                    {row2.map((cell) => (
                        <PairSeatCell
                            key={cell.number}
                            topSeat={cell.topSeat}
                            bottomSeat={cell.bottomSeat}
                            selectedSeats={selectedSeats}
                            onSeatClick={handleSeatClick}
                            className="coach-third__cell"
                        />
                    ))}
                </div>
            </div>

            {/* Нижние ряды */}
            <div className="coach__row-bottom">
                <div className="coach-third__row">
                    {row3.map((cell) => (
                        <PairSeatCell
                            key={cell.number}
                            topSeat={cell.topSeat}
                            bottomSeat={cell.bottomSeat}
                            selectedSeats={selectedSeats}
                            onSeatClick={handleSeatClick}
                            className="coach-third__cell"
                        />
                    ))}
                </div>
                <div className="coach-third__row">
                    {row4.map((cell) => (
                        <PairSeatCell
                            key={cell.number}
                            topSeat={cell.topSeat}
                            bottomSeat={cell.bottomSeat}
                            selectedSeats={selectedSeats}
                            onSeatClick={handleSeatClick}
                            className="coach-third__cell"
                        />
                    ))}
                </div>
            </div>
        </Coach>
    );
}
