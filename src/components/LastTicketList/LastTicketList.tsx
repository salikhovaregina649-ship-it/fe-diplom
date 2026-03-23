import clsx from "clsx";
import LastTicket from "../LastTicket/LastTicket";
import Title from "../uikit/Title/Title";
import { useGetLastRoutesQuery } from "../../store/api/api";
import "./LastTicketList.css";


interface LastTicketListProps {
    className?: string;
}

export default function LastTicketList({className}: LastTicketListProps) {
    const { data = [], isLoading, error } = useGetLastRoutesQuery();

    return(
        <div className={clsx("last-ticket-list", className)}>
            <Title className="last-ticket-list__title" as="h3" uppercase={true}>Последние билеты</Title>
            {isLoading ? (
                <div>Загрузка...</div>
            ) : error ? (
                <div>Ошибка загрузки</div>
            ) : data.length === 0 ? (
                <div>Нет доступных билетов</div>
            ) : (
                data.map((ticket) => (
                    <LastTicket key={ticket.departure._id} ticket={ticket} />
                ))
            )}
        </div>
    )
}