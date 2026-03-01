import { useState } from "react";
import Flatpickr from "react-flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru";
import "flatpickr/dist/themes/light.css";
import "./InputDate.css";
import clsx from "clsx";

interface InputDateProps {
    className?: string;
    id?: string;
    Icon?: React.ElementType;
    name?: string;
}

export default function InputDate({className, id, Icon, name}: InputDateProps) {
    const [date, setDate] = useState<Date | null>(null);

    // Ограничение: только текущий месяц
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return(
        <>
            <Flatpickr 
                value={date ?? undefined}
                onChange={(selectedDates) => setDate(selectedDates[0] ?? null)}
                options={{
                    dateFormat: "d.m.Y",
                    monthSelectorType: "static",
                    minDate: today,
                    locale: Russian,
                    prevArrow: '<span class="date-picker__custom-prev"></span>',
                    nextArrow: '<span class="date-picker__custom-next"></span>',
                }}
                render={({ ...props }, ref) => (
                    <div className="date-picker">
                        <input
                            {...props} ref={ref} 
                            className={clsx("date-picker__input", className)} 
                            id={id} 
                            type="date" 
                            placeholder="ДД.ММ.ГГ"
                            name={name}
                        />
                        {Icon && <Icon />}
                    </div>
                )}
            />
        </>
    )
}