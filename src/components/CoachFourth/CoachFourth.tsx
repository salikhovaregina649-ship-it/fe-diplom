import clsx from "clsx";
import "./CoachFourth.css";

import type { CoachWithSeats } from "../../types/typeSeat";

interface CoachProps {
    coach: CoachWithSeats;
    onSeatSelect?: (seatIndex: number) => void;
    selectedSeats?: number[];
}

export default function CoachFourth({
    coach,
    onSeatSelect,
    selectedSeats = [],
}: CoachProps) {
    const totalSeats = coach.seats.length;
    const halfSize = Math.ceil(totalSeats / 2);
    const coachNumber = coach.coach.name.match(/\d+/)?.[0];

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

    // Рендер пары мест
    const renderPairCell = (
        cell: {
            topSeat: { index: number; available: boolean } | null;
            bottomSeat: { index: number; available: boolean } | null;
        },
        key: number,
    ) => {
        const topSeat = cell.topSeat;
        const bottomSeat = cell.bottomSeat;

        return (
            <div key={key} className="coach-fourth__cell">
                <div className="coach-fourth__seat-wrapper">
                    {topSeat && (
                        <button
                            className={`coach-fourth__seat coach-fourth__seat--top ${
                                !topSeat.available
                                    ? "coach-fourth__seat--unavailable"
                                    : ""
                            } ${
                                selectedSeats.includes(topSeat.index)
                                    ? "coach-fourth__seat--selected"
                                    : ""
                            }`}
                            onClick={() =>
                                handleSeatClick(topSeat.index, topSeat.available)
                            }
                            disabled={!topSeat.available}
                        >
                            {topSeat.index}
                        </button>
                    )}
                </div>
                <div className="coach-fourth__seat-wrapper">
                    {bottomSeat && (
                        <button
                            className={`coach-fourth__seat coach-fourth__seat--bottom ${
                                !bottomSeat.available
                                    ? "coach-fourth__seat--unavailable"
                                    : ""
                            } ${
                                selectedSeats.includes(bottomSeat.index)
                                    ? "coach-fourth__seat--selected"
                                    : ""
                            }`}
                            onClick={() =>
                                handleSeatClick(bottomSeat.index, bottomSeat.available)
                            }
                            disabled={!bottomSeat.available}
                        >
                            {bottomSeat.index}
                        </button>
                    )}
                </div>
            </div>
        );
    };

    // Рендер одиночного места
    const renderSingleBottomCell = (
        cell: { seat: { index: number; available: boolean } },
        key: number,
    ) => (
        <div
            key={key}
            className="coach-fourth__cell coach-fourth__cell--single-bottom"
        >
            <div className="coach-fourth__seat-wrapper coach-fourth__seat-wrapper--empty"></div>
            <div className="coach-fourth__seat-wrapper">
                <button
                    className={`coach-fourth__seat coach-fourth__seat--bottom ${
                        !cell.seat.available
                            ? "coach-fourth__seat--unavailable"
                            : ""
                    } ${
                        selectedSeats.includes(cell.seat.index)
                            ? "coach-fourth__seat--selected"
                            : ""
                    }`}
                    onClick={() =>
                        handleSeatClick(cell.seat.index, cell.seat.available)
                    }
                    disabled={!cell.seat.available}
                >
                    {cell.seat.index}
                </button>
            </div>
        </div>
    );

    return (
        <div className="coach-fourth">
            <div className="coach-fourth__message-box">
                <p className="coach-fourth__message"></p>
            </div>
            <div className="coach-fourth__number">{coachNumber}</div>
            <div className="coach-fourth__scheme">
                <div
                    className={clsx(
                        "coach-fourth__cabin",
                        "coach-fourth__cabin--left",
                    )}
                ></div>

                <div className="coach-fourth__body">
                    <div className="coach-fourth__row-top">
                        {topRowCells.map((cell, i) => renderPairCell(cell, i))}
                    </div>
                    <div className="coach-fourth__aisle-divider"></div>
                    <div className="coach-fourth__row-bottom">
                        {bottomRowCells.map((cell, i) => {
                            if (cell.type === "single-bottom") {
                                return renderSingleBottomCell(
                                    cell as { seat: { index: number; available: boolean } },
                                    i
                                );
                            }
                            return renderPairCell(
                                cell as {
                                    topSeat: { index: number; available: boolean } | null;
                                    bottomSeat: { index: number; available: boolean } | null;
                                },
                                i
                            );
                        })}
                    </div>
                </div>

                <div
                    className={clsx(
                        "coach-fourth__cabin",
                        "coach-fourth__cabin--right",
                    )}
                ></div>
            </div>
        </div>
    );
}