import { useRef } from "react";
import Popover from "../../uikit/Popover/Popover";
import Checkbox from "../../uikit/Checkbox/Checkbox";

export default function CoachOption({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Checkbox className="coach-option-checkbox">
      <div ref={ref} className="coach-option-checkbox__icon">
        {icon}
      </div>

      <Popover
        className="coach-option-checkboxn__popover"
        anchorRef={ref}
        trigger="hover"
      >
        {label}
      </Popover>
    </Checkbox>
  );
}