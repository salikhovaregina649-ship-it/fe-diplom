import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import "./CustomSelect.css";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
    name?: string;
}

export default function CustomSelect({className, options, value, onChange, name}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // выбранный + остальные
    const selected = options.find(opt => opt.value === value) || options[0];

    const listOptions = isOpen ? options : [selected];

    const handleSelect = (option: Option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return(
        <div className={clsx("custom-select", className)} ref={selectRef}>
            {name && <input className="custom-select__input-hidden" type="hidden" name={name} value={value} />}

            {!isOpen ? (
                <div className="custom-select__selected" onClick={() => setIsOpen(true)}>
                    {selected.label}
                </div>
            ) : (
                <ul className="custom-select__list">
                    {listOptions.map(option => (
                        <li
                            key={option.value}
                            className={clsx(
                                "custom-select__option",
                                option.value === selected.value && "custom-select__option--selected"
                            )}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}