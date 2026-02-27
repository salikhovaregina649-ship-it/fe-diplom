import Aside from "../Aside/Aside";
import Filter from "../Filters/Filter";
import LastTicketList from "../LastTicketList/LastTicketList";
// import TicketSeats from "../TicketSeats/TicketSeats";
import TrainList from "../TrainList/TrainList";
import "./TicketStep.css";

// interface TicketStepProps{
//     onNext: () => void;
// }

export default function TicketStep() {

    return(
        <div className="ticket-step">
            <div className="container">
                    <div className="ticket-step__aside-wrapper">
                    <Aside className="ticket-step__aside">
                        <Filter />
                    </Aside>
                    <LastTicketList className="ticket-step__last-tickets" />
                </div>
                <div className="ticket-step__main">
                    <TrainList />
                    {/* <TicketSeats /> */}
                </div>
            </div>
        </div>
    )
}
