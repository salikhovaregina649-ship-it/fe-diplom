import clsx from "clsx";
import LastTicket from "../LastTicket/LastTicket";
import Title from "../uikit/Title/Title";
import "./LastTicketList.css";
import last from "../../mocks/lastResponse.json"

const lastTickets = last;

interface LastTicketListProps {
    className?: string;
}

export default function LastTicketList({className}: LastTicketListProps) {
    return(
        <div className={clsx("last-ticket-list", className)}>
            <Title className="last-ticket-list__title" as="h3" uppercase={true}>Последние билеты</Title>
            {lastTickets.map((ticket) => (
                <LastTicket ticket={ticket} />
            ))}
        </div>
    )
}