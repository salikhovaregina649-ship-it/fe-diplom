import clsx from "clsx";
import "./Checkbox.css";
import type React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    label?: string;
    switched?: boolean;
    checkMark?: boolean;
    children?: React.ReactNode;
}

export default function Checkbox({className, name, value, checked, onChange, label, switched = false, checkMark = false, children, ...props}: CheckboxProps) {
    return(
        <label className={clsx("checkbox", className)} >
            {label && <span className="checkbox__label">{label}</span>} 
            <input 
                className="checkbox__input" 
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                {...props}
            />
            {checkMark && <span className="checkbox__check-mark" />}
            {switched && <span className="checkbox__switch" />}
            {children && <span>{children}</span>}
        </label>
    )
}