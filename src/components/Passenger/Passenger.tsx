import { useState } from "react";
import Button from "../uikit/Button/Button";
import Collapse from "../uikit/Collapse/Collapse";
import Title from "../uikit/Title/Title";
import "./Passenger.css";
import clsx from "clsx";
import FormPassenger from "../FormPassenger/FormPassenger";

interface PassengerProps {
    className?: string;
    number: number;
    onDelete: () => void;
}

export default function Passenger({ className, number, onDelete }: PassengerProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className={clsx("passenger", className)}>
            <div className={clsx("passenger__row", open && "active")}>
                <div className="passenger__box">
                    <Button
                        className={clsx(
                            "passenger__collapse-btn",
                            open && "active",
                        )}
                        variant="opennerEllipse"
                        onClick={() => setOpen((prev) => !prev)}
                    />
                    <Title className="passenger__title" as="h3">
                        Пассажир {number}
                    </Title>
                </div>
                {open &&
                    <Button
                        className="passenger_delete-btn"
                        type="button"
                        variant="cross"
                        onClick={onDelete}
                    />
                }
            </div>
            <Collapse className="passenger__collapse" isOpen={open}>
                <div className="passenger__collapse-box">
                    <FormPassenger />
                </div>
            </Collapse>
        </div>
    );
}
