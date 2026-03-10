import type React from "react";
import clsx from "clsx";
import Button from "../Button/Button";
import WarningSignIcon from "../../../assets/icons/small/WarningSignIcon";
import "./Popup.css";
import Title from "../Title/Title";

interface PopupProps {
    children: React.ReactNode;
    title?: string;
    variant: "error" | "info";
    onClose: () => void;
}

export default function Popup({ children, title, variant, onClose }: PopupProps) {
    return (
        <div className={clsx("popup", `popup--${variant}`)}>
            <div className="popup__wrapper">
                <div className="popup__header">
                    <WarningSignIcon />
                </div>
                <div className="popup__content">
                    <Title as="h4" className="popup__title">{title}</Title>
                    <div className="popup__text">
                        {children}
                    </div>
                </div>
                <div className="popup__confirmation">
                    <Button
                        className="popup__btn"
                        variant="light"
                        type="button"
                        onClick={onClose}
                    >
                        Понятно
                    </Button>
                </div>
            </div>
        </div>
    );
}
