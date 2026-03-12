import clsx from "clsx";
import type { SingleSeatCellProps } from "../types.ts";
import "./SeatCell.css";

/**
 * Компонент одиночного места (прижато к низу ячейки)
 */

export default function SingleSeatCell({
    seat,
    selectedSeats = [],
    onSeatClick,
    className,
}: SingleSeatCellProps) {
    const handleClick = () => {
        if (seat.available) {
            onSeatClick(seat.index, seat.available);
        }
    };

    return (
        <div
            className={clsx("seat-cell", "seat-cell--single-bottom", className)}
        >
            {/* Пустое место сверху */}
            <div className="seat-cell__wrapper seat-cell__wrapper--empty" />

            {/* Место снизу */}
            <div className="seat-cell__wrapper">
                <button
                    className={clsx(
                        "seat-cell__seat",
                        "seat-cell__seat--bottom",
                        {
                            "seat-cell__seat--unavailable": !seat.available,
                            "seat-cell__seat--selected": selectedSeats.includes(
                                seat.index,
                            ),
                        },
                    )}
                    onClick={handleClick}
                    disabled={!seat.available}
                >
                    {seat.index}
                </button>
            </div>
        </div>
    );
}
