import CoachList from "../CoachList/CoachList";
import type { CoachListProps } from "../CoachList/CoachList";

interface CoachSelectorProps extends CoachListProps {
    class_type: string;
}

export default function CoachSelector({
    class_type,
    coaches,
    selectedCoaches,
    handleCoachChange,
}: CoachSelectorProps) {
    const filteredCoaches = coaches.filter(
        (item) => item.coach.class_type === class_type,
    );

    if (!filteredCoaches.length) {
        return (
            <div className="coach-selector__error">
                Неизвестный тип вагона: {class_type}
            </div>
        );
    }

    return (
        <CoachList
            coaches={filteredCoaches}
            selectedCoaches={selectedCoaches}
            handleCoachChange={handleCoachChange}
        />
    );
}
