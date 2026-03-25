import RangeSlider from "../RangeSlider/RangeSlider";
import "./TimeRangeSlider.css";

interface TimeRangeSliderProps {
    value: [number, number];
    step?: number; // в минутах
    onChange: (value: [number, number]) => void;
}

export default function TimeRangeSlider({
    value,
    step = 1,
    onChange
}: TimeRangeSliderProps) {
    const formatTime = (hour: number) => {
        return `${hour}:00`;
    };

    return (
        <RangeSlider
            className="time-range-slider"
            modifier="small"
            min={0}
            max={24}
            step={step}
            value={value}
            onChange={onChange}
            renderValue={formatTime}
        />
    );
}