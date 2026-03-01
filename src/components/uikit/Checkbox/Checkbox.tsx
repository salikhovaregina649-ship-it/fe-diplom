import clsx from "clsx";
import "./Checkbox.css";

interface CheckboxProps {
    className?: string;
    name?: string;
    value: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    switched?: boolean;
}

export default function Checkbox({className, name, value, checked, onChange, label, switched = false}: CheckboxProps) {
    return(
        <label className={clsx("checkbox", className)} >
            <span className="checkbox__label">{label}</span>
            <input 
                className="checkbox__input" 
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {switched && <span className="checkbox__switch" />}
        </label>
    )
}