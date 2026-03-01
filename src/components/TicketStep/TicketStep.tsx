import { Outlet } from "react-router";
import Aside from "../Aside/Aside";
import Filter from "../Filters/Filter";
import LastTicketList from "../LastTicketList/LastTicketList";
import "./TicketStep.css";

export default function TicketStep() {
    return (
        <div className="ticket-step">
            <div className="container">
                <div className="ticket-step__aside-wrapper">
                    <Aside className="ticket-step__aside">
                        <Filter />
                    </Aside>
                    <LastTicketList className="ticket-step__last-tickets" />
                </div>
                <div className="ticket-step__main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
