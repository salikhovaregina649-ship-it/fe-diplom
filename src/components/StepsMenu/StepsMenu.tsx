import clsx from "clsx";
import "./StepsMenu.css";

interface StepsMenuProps {
    currentStep: number;
}

const steps = [
    "Билеты",
    "Пассажиры",
    "Оплата",
    "Проверка",
];

export default function StepsMenu({currentStep}: StepsMenuProps) {
    return(
        <nav className="steps-menu">
            <div className="container">
                <ul className="steps-menu__list">
                    {steps.map((label, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber === currentStep;
                        const isCompleted = stepNumber < currentStep;
                        return(
                            <li 
                                key={index}
                                className={
                                    clsx(
                                        "steps-menu__step",
                                        isActive && "steps-menu__step--active",
                                        isCompleted && "steps-menu__step--completed"
                                    )
                                }
                            >
                                <div className="steps-menu__number">{stepNumber}</div>
                                <div className="steps-menu__label">{label}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}