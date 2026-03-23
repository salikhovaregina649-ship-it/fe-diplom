import { useNavigate } from "react-router";
import OptionsIcons from "../../assets/icons/small/OptionsIcons";
import RubleIcon from "../../assets/icons/small/RubleIcon";
import type { LastTicket } from "../../types/typeLastTicket";
import "./LastTicket.css";

interface LastTicketProps {
    ticket: LastTicket;
}

export default function LastTicket({ticket}: LastTicketProps) {
    const id = ticket.departure._id;
    const navigate = useNavigate();

    const handle = () => {
        navigate(`seats/${id}`);
    }

    return(
        <div className="last-ticket" onClick={handle}>
            <div className="last-ticket__city">
                <span>{ticket.departure.from.city.name}</span>
                <span>{ticket.departure.to.city.name}</span>
            </div>  
            <div className="last-ticket__station">
                <span>{ticket.departure.from.railway_station_name}</span>
                <span>{ticket.departure.to.railway_station_name}</span>
            </div>
            <div className="last-ticket__grid-box">
                <div className="last-ticket__icons">
                    <OptionsIcons />
                </div>
                <div className="last-ticket__price">
                    от <span>{ticket.min_price}</span> <RubleIcon />
                </div>
            </div>     
        </div>
    )
}