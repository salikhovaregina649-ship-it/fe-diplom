import Coach from "../Coach/Coach";
import PairSeatCell from "../SeatCell/PairSeatCell";
import SingleSeatCell from "../SeatCell/SingleSeatCell";
import type { CoachClassProps } from "../types";
import "./CoachFourth.css";

/**
 * Компонент вагона класса Сидячий
 */
export default function CoachFourth({
    coach,
    onSeatSelect,
    selectedSeats = [],
    message,
}: CoachClassProps) {
    const totalSeats = coach.seats.length;

    const halfSize = Math.ceil(totalSeats / 2);

    // Верхний ряд - все места парами
    const topRowSeats = coach.seats.slice(0, halfSize);
    const topRowCells = [];
    for (let i = 0; i < topRowSeats.length; i += 2) {
        topRowCells.push({
            type: "pair" as const,
            topSeat: topRowSeats[i] || null,
            bottomSeat: topRowSeats[i + 1] || null,
        });
    }

    // Нижний ряд
    const bottomRowSeats = coach.seats.slice(halfSize);
    const bottomRowCells: Array<{
        type: "pair" | "single-bottom";
        topSeat?: { index: number; available: boolean } | null;
        bottomSeat?: { index: number; available: boolean } | null;
        seat?: { index: number; available: boolean };
    }> = [];

    if (bottomRowSeats.length > 0) {
        // Первое место - одиночное
        bottomRowCells.push({
            type: "single-bottom" as const,
            seat: bottomRowSeats[0],
        });

        // Середина - пары мест
        const middleSeats = bottomRowSeats.slice(1, -1);
        for (let i = 0; i < middleSeats.length; i += 2) {
            bottomRowCells.push({
                type: "pair" as const,
                topSeat: middleSeats[i] || null,
                bottomSeat: middleSeats[i + 1] || null,
            });
        }

        // Последнее место - одиночное
        // Показываем ТОЛЬКО если предыдущая пара ПОЛНАЯ (оба места есть)
        if (bottomRowSeats.length > 1) {
            const lastCell = bottomRowCells[bottomRowCells.length - 1];
            const isLastPairFull =
                lastCell.type === "pair" &&
                lastCell.topSeat !== null &&
                lastCell.bottomSeat !== null;

            if (isLastPairFull) {
                // Предыдущая пара полная - показываем последнюю одиночную
                bottomRowCells.push({
                    type: "single-bottom" as const,
                    seat: bottomRowSeats[bottomRowSeats.length - 1],
                });
            }
            // Иначе - НЕ показываем
        }
    }

    const handleSeatClick = (seatIndex: number, available: boolean) => {
        if (available && onSeatSelect) {
            onSeatSelect(seatIndex);
        }
    };

    return (
        <Coach
            className="coach-fourth"
            message={message}
            coach={coach}
        >
            {/* Верхний ряд */}
            <div className="coach__row-top">
                {topRowCells.map((cell, i) => (
                    <PairSeatCell
                        key={i}
                        topSeat={cell.topSeat}
                        bottomSeat={cell.bottomSeat}
                        selectedSeats={selectedSeats}
                        onSeatClick={handleSeatClick}
                        className="coach-fourth__cell"
                    />
                ))}
            </div>
            {/* Нижний ряд */}
            <div className="coach__row-bottom">
                {bottomRowCells.map((cell, i) => {
                    if (cell.type === "single-bottom" && cell.seat) {
                        return (
                            <SingleSeatCell
                                key={i}
                                seat={cell.seat}
                                selectedSeats={selectedSeats}
                                onSeatClick={handleSeatClick}
                                className="coach-fourth__cell"
                            />
                        );
                    }
                    return (
                        <PairSeatCell
                            key={i}
                            topSeat={cell.topSeat ?? null}
                            bottomSeat={cell.bottomSeat ?? null}
                            selectedSeats={selectedSeats}
                            onSeatClick={handleSeatClick}
                            className="coach-fourth__cell"
                        />
                    );
                })}
            </div>
        </Coach>
    );
}
