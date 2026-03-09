import clsx from "clsx";
import RubleIcon from "../../../assets/icons/small/RubleIcon";
import WiFiIcon from "../../../assets/icons/filter/WiFiIcon";
import ConditioningIcon from "../../../assets/icons/options/ConditioningIcon";
import LinenIcon from "../../../assets/icons/options/LinenIcon";
import FoodIcon from "../../../assets/icons/options/FoodIcon";
import CoachOption from "../CoachOption/CoachOption";

import type { CoachProps } from "../types";
import "./Coach.css";


/**
 * Общий компонент для классов
 */
export default function Coach({
    children,
    className,
    message,
    coach,
}: CoachProps) {
    const coachNumber = coach.coach.name.match(/\d+/)?.[0];
    let bottomSeats = 0; // четные доступные
    let topSeats = 0; // нечетные

    coach.seats.forEach((seat) => {
        if (!seat.available) return;
        if (seat.index % 2 === 0) {
            bottomSeats++;
        } else {
            topSeats++;
        }
    });

    return (
        <div className={clsx("coach", className)}>
            <div className="coach__info">
                <div className="coach__main-number">
                    {coachNumber}
                    <span>вагон</span>
                </div>
                <div className="coach__seat-box">
                    <p
                        className={clsx(
                            "coach__title",
                            "coach__available-seats",
                        )}
                    >
                        Места <span>{coach.coach.available_seats}</span>
                    </p>
                    <p className="coach__available-seats-top">
                        Верхние <span>{topSeats}</span>
                    </p>
                    <p className="coach__available-seats-bottom">
                        Нижние <span>{bottomSeats}</span>
                    </p>
                </div>
                <div className="coach__price-box">
                    <p className="coach__title">Стоимость</p>
                    <p className="coach__price-top">
                        {coach.coach.top_price} <RubleIcon />
                    </p>
                    <p className="coach__price-bottom">
                        {coach.coach.bottom_price} <RubleIcon />
                    </p>
                </div>
                <div className="coach__options-box">
                    <p className="coach__title">
                        Обслуживание
                        <span>фпк</span>
                    </p>
                    <div className="coach__options">
                        <CoachOption icon={<ConditioningIcon />} label="кондиционер" />
                        <CoachOption icon={<WiFiIcon />} label="Wi-Fi" />
                        <CoachOption icon={<LinenIcon />} label="белье" />
                        <CoachOption icon={<FoodIcon />} label="питание" />
                    </div>
                </div>
            </div>
            <div className="coach__message-box">
                <p className="coach__message">{message}</p>
            </div>
            <div className="coach__scheme">
                <div className="coach__number">{coachNumber}</div>
                <div className="coach__center">
                    <div
                        className={clsx("coach__cabin", "coach__cabin--left")}
                    />
                    <div className="coach__body">{children}</div>
                    <div
                        className={clsx("coach__cabin", "coach__cabin--right")}
                    />
                </div>
            </div>
        </div>
    );
}
