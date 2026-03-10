import { useRef } from "react";
import Popover from "../../uikit/Popover/Popover";
import Checkbox from "../../uikit/Checkbox/Checkbox";
import "./CoachOption.css";

interface CoachOptionProps {
    icon: React.ReactNode;
    label: string;
    checked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
}

export default function CoachOption({
    icon,
    label,
    checked,
    onChange,
    disabled = false,
}: CoachOptionProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref}>
            <Checkbox
                className="coach-option-checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            >
                {icon}

                <Popover
                    className="coach-option-checkbox__popover"
                    anchorRef={ref}
                    trigger="hover"
                >
                    {label}
                </Popover>
            </Checkbox>
        </div>
    );
}
