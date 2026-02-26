import Aside from "../Aside/Aside";
import Filter from "../Filters/Filter";
import LastTicketList from "../LastTicketList/LastTicketList";
import TrainList from "../TrainList/TrainList";
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
                <LastTicketList className="ticket-step__last-tickets" />
                <div className="ticket-step__main">
                    <TrainList />
                </div>
            </div>
        </div>
    )
}
