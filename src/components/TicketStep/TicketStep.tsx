import Aside from "../Aside/Aside";
import Filter from "../Filters/Filter";
import "./TicketStep.css";

interface TicketStepProps{
    onNext: () => void;
}

export default function TicketStep({onNext}: TicketStepProps) {
    return(
        <div className="ticket-step">
            <div className="container">
                <Aside>
                    <Filter />
                </Aside>
            </div>
        </div>
    )
}
