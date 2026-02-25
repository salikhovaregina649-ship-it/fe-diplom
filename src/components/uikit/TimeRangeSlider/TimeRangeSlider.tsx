import { useState } from "react";
import RangeSlider from "../RangeSlider/RangeSlider";
import "./TimeRangeSlider.css";

interface TimeRangeSliderProps {
    step?: number; // в минутах
    onChange?: (value: [number, number]) => void;
}

export default function TimeRangeSlider({
    step = 1,
    onChange
}: TimeRangeSliderProps) {

    const [value, setValue] = useState<[number, number]>([0, 1440]);

    const formatTime = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    };

    const handleChange = (val: [number, number]) => {
        if (onChange) {
            onChange(val);
        } else {
            setValue(val);
        }
    };

    return (
        <RangeSlider
            className="time-range-slider"
            modifier="small"
            min={0}
            max={1440}
            step={step}
            value={value}
            onChange={handleChange}
            renderValue={formatTime}
        />
    );
}