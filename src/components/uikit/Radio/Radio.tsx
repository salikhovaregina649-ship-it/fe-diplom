import clsx from "clsx";
import "./Radio.css";

interface RadioProps {
    className?: string;
    name: string;
    id: string;
    value: string;
    label: string;
    checked: boolean;
    onChange: (value: string) => void;
}

export default function Radio({className, name, id, value, label, checked, onChange}: RadioProps) {
    return(
        <div className={clsx("radio", className)}>
            <input
                className="radio__input"
                id={id}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
            />
            <label className="radio__label" htmlFor={id}>
                {label}
            </label>
        </div>
    )
}