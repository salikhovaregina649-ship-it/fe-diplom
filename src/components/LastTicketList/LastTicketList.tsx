import clsx from "clsx";
import LastTicket from "../LastTicket/LastTicket";
import Title from "../uikit/Title/Title";
import "./LastTicketList.css";

const tickets = [
    {
        cityForth: "Санкт-Петербург",
        cityBack: "Самара",
        stationForth: "Курский вокзал",
        stationBack: "Московский вокзал",
        minPrice: "2 500",
    },
    {
        cityForth: "Москва",
        cityBack: "Казань",
        stationForth: "Курский вокзал",
        stationBack: "Московский вокзал",
        minPrice: "3 500",
    },
    {
        cityForth: "Казань",
        cityBack: "Нижний новгород",
        stationForth: "Курский вокзал",
        stationBack: "Московский вокзал",
        minPrice: "3 800",
    },
];

interface LastTicketListProps {
    className?: string;
}

export default function LastTicketList({className}: LastTicketListProps) {
    return(
        <div className={clsx("last-ticket-list", className)}>
            <Title className="last-ticket-list__title" as="h3" uppercase={true}>Последние билеты</Title>
            {tickets.map((ticket) => (
                <LastTicket ticket={ticket} />
            ))}
        </div>
    )
}