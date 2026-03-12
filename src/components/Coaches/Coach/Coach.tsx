import { useState } from "react";
import clsx from "clsx";
import RubleIcon from "../../../assets/icons/small/RubleIcon";
import WiFiIcon from "../../../assets/icons/options/WiFiOptionIcon";
import ConditioningIcon from "../../../assets/icons/options/ConditioningIcon";
import LinenIcon from "../../../assets/icons/options/LinenIcon";
import FoodIcon from "../../../assets/icons/options/FoodIcon";
import CoachOption from "../CoachOption/CoachOption";

import type { CoachProps } from "../types.ts";
import "./Coach.css";

/**
 * Общий компонент для классов
 */

type Options = {
    conditioning: boolean;
    wifi: boolean;
    linen: boolean;
    food: boolean;
};

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

    const [options, setOptions] = useState({
        conditioning: false,
        wifi: false,
        linen: false,
        food: false,
    });

    const toggleOption = (name: keyof Options) => {
        setOptions((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

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
                    {coach.coach.class_type !== "first" &&
                    coach.coach.class_type !== "fourth" && (
                        <>
                            <p className="coach__available-seats-top">
                            Верхние <span>{topSeats}</span>
                            </p>
                            <p className="coach__available-seats-bottom">
                            Нижние <span>{bottomSeats}</span>
                            </p>
                        </>
                    )}
                </div>
                <div className="coach__price-box">
                    <p className="coach__title">Стоимость</p>
                    {coach.coach.class_type === "first" || coach.coach.class_type === "fourth" ? (
                        <p className="coach__price">
                            {coach.coach.price} <RubleIcon />
                        </p>
                    ) : (
                        <>
                            <p className="coach__price-top">
                            {coach.coach.top_price} <RubleIcon />
                            </p>
                            <p className="coach__price-bottom">
                            {coach.coach.bottom_price} <RubleIcon />
                            </p>
                        </>
                    )}
                </div>
                <div className="coach__options-box">
                    <p className="coach__title">
                        Обслуживание
                        <span>фпк</span>
                    </p>
                    <div className="coach__options">
                        <CoachOption
                            icon={<ConditioningIcon />}
                            label="кондиционер"
                            checked={options.conditioning}
                            onChange={() => toggleOption("conditioning")}
                        />
                        <CoachOption
                            icon={<WiFiIcon />}
                            label="wi-fi"
                            checked={options.wifi}
                            onChange={() => toggleOption("wifi")}
                        />
                        {coach.coach.class_type !== "fourth" &&
                            <CoachOption
                                icon={<LinenIcon />}
                                label="белье"
                                checked={options.linen}
                                onChange={() => toggleOption("linen")}
                            />
                        }
                        <CoachOption
                            icon={<FoodIcon />}
                            label="питание"
                            checked={options.food}
                            onChange={() => toggleOption("food")}
                        />
                    </div>
                </div>
            </div>
            <div className="coach__message-box">
                {/* Вопрос!! Где брать информацию сколько человек выбирают места в этом поезде? */}
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
