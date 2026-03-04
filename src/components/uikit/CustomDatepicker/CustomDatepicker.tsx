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
}

interface CustomDatepickerProps {
    value: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    name?: string;
    icon?: "small" | "big" | false;
    modifier?: string;
}

export default function CustomDatepicker({
    value,
    onChange,
    minDate,
    maxDate,
    placeholder,
    name,
    icon = false,
    modifier,
}: CustomDatepickerProps) {
    const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
        ({ value, onClick }, ref) => (
            <div className={clsx("custom-datepicker", `custom-datepicker--${modifier}`)}>
                <input
                    className="custom-datepicker__input"
                    type="text"
                    name={name}
                    value={value}
                    onClick={onClick}
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
        ),
    );

    return (
        <DatePicker
            locale="ru"
            selected={value}
            onChange={(date: Date | null) => onChange(date)}
            dateFormat="dd/MM/yyyy"
            minDate={minDate}
            maxDate={maxDate}
            customInput={<CustomInput />}
            dateFormatCalendar={modifier === "form" ? "LLLL yyyy" : "LLLL"}
        />
    );
}