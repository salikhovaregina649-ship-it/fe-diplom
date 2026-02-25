import Aside from "../Aside/Aside";
import Filter from "../Filters/Filter";
import LastTicketList from "../LastTicketList/LastTicketList";
import "./TicketStep.css";

interface TicketStepProps{
    onNext: () => void;
}

export default function TicketStep({onNext}: TicketStepProps) {
    return(
        <div className="ticket-step">
            <div className="container">
                <Aside className="ticket-step__aside">
                    <Filter />
                </Aside>
                <LastTicketList />
            </div>
        </div>
    )
}
