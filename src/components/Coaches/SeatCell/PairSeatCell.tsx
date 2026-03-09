import clsx from "clsx";
import type { PairSeatCellProps } from "../types";
import "./SeatCell.css";

/**
 * Компонент пары мест (верхнее + нижнее)
 * Переиспользуется во всех типах вагонов
 */

export default function PairSeatCell({
    topSeat,
    bottomSeat,
    selectedSeats = [],
    onSeatClick,
    className,
}: PairSeatCellProps) {
    const handleTopClick = () => {
        if (topSeat && topSeat.available) {
            onSeatClick(topSeat.index, topSeat.available);
        }
    };

    const handleBottomClick = () => {
        if (bottomSeat && bottomSeat.available) {
            onSeatClick(bottomSeat.index, bottomSeat.available);
        }
    };

    return (
        <div className={clsx("seat-cell", "seat-cell--pair", className)}>
            {/* Верхнее место */}
            <div className="seat-cell__wrapper">
                {topSeat && (
                    <button
                        className={clsx(
                            "seat-cell__seat",
                            "seat-cell__seat--top",
                            {
                                "seat-cell__seat--unavailable":
                                    !topSeat.available,
                                "seat-cell__seat--selected":
                                    selectedSeats.includes(topSeat.index),
                            },
                        )}
                        onClick={handleTopClick}
                        disabled={!topSeat.available}
                    >
                        {topSeat.index}
                    </button>
                )}
            </div>

            {/* Нижнее место */}
            <div className="seat-cell__wrapper">
                {bottomSeat && (
                    <button
                        className={clsx(
                            "seat-cell__seat",
                            "seat-cell__seat--bottom",
                            {
                                "seat-cell__seat--unavailable":
                                    !bottomSeat.available,
                                "seat-cell__seat--selected":
                                    selectedSeats.includes(bottomSeat.index),
                            },
                        )}
                        onClick={handleBottomClick}
                        disabled={!bottomSeat.available}
                    >
                        {bottomSeat.index}
                    </button>
                )}
            </div>
        </div>
    );
}
