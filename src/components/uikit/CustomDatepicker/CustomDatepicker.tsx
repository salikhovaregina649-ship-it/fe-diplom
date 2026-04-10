import { forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";

import CalendarIcon from "../../../assets/icons/small/CalendarIcon";
import CalendarIconSmall from "../../../assets/icons/small/CalendarIconSmall";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatepicker.css";
import clsx from "clsx";

registerLocale("ru", ru);

interface CustomInputProps {
    value?: string;
    onClick?: () => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    name?: string;
    placeholder?: string;
    icon?: "small" | "big" | false;
    modifier?: string;
    className?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ value, onClick, onBlur, name, placeholder, icon, modifier, className }, ref) => (
        <div className={clsx("custom-datepicker", modifier && `custom-datepicker--${modifier}`)}>
            <input
                className={clsx("custom-datepicker__input", className)}
                type="text"
                name={name}
                value={value}
                onClick={onClick}
                onBlur={onBlur}
                ref={ref}
                readOnly
                placeholder={placeholder}
            />
            {icon === "small" && (
                <div className="custom-datepicker__icon" onClick={onClick}>
                    <CalendarIconSmall />
                </div>
            )}
            {icon === "big" && (
                <div className="custom-datepicker__icon" onClick={onClick}>
                    <CalendarIcon />
                </div>
            )}
        </div>
    )
);

CustomInput.displayName = "CustomInput";

interface CustomDatepickerProps {
    value: Date | null;
    onChange: (date: Date | null) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    name?: string;
    icon?: "small" | "big" | false;
    modifier?: string;
    className?: string;
}

export default function CustomDatepicker({
    value,
    onChange,
    onBlur,
    minDate,
    maxDate,
    placeholder = "ДД/ММ/ГГ",
    name,
    icon = false,
    modifier,
    className,
}: CustomDatepickerProps) {
    return (
        <DatePicker
            locale="ru"
            selected={value}
            onChange={(date: Date | null) => onChange(date)}
            dateFormat="dd.MM.yyyy"
            minDate={minDate}
            maxDate={maxDate}
            placeholderText={placeholder}
            customInput={
                <CustomInput
                    name={name}
                    placeholder={placeholder}
                    icon={icon}
                    modifier={modifier}
                    className={className}
                    onBlur={onBlur}
                />
            }
            dateFormatCalendar={modifier === "form" ? "LLLL yyyy" : "LLLL"}
        />
    );
}