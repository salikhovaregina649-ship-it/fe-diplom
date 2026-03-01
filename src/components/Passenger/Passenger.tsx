import { useState } from "react";
import Button from "../uikit/Button/Button";
import Collapse from "../uikit/Collapse/Collapse";
import Title from "../uikit/Title/Title";
import "./Passenger.css";
import clsx from "clsx";
import FormPassenger from "../FormPassenger/FormPassenger";

interface PassengerProps {
    number: number;
    onDelete: () => void;
}

export default function Passenger({ number, onDelete }: PassengerProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="passenger">
            <div className={clsx("passenger__box", open && "active")}>
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
                <Button
                    className="passenger_delete-btn"
                    type="button"
                    variant="transparent"
                    onClick={onDelete}
                >
                    +
                </Button>
            </div>
            <Collapse className="passenger__collapse" isOpen={open}>
                <div className="passenger__collapse-box">
                    <FormPassenger />
                </div>
            </Collapse>
        </div>
    );
}
