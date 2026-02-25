import OptionsIcons from "../../assets/icons/small/OptionsIcons";
import RubleIcon from "../../assets/icons/small/RubleIcon";
import "./LastTicket.css";

interface LastTicketProps {
    ticket: {
        cityForth: string;
        cityBack: string;
        stationForth: string;
        stationBack: string;
        minPrice: string;
    };
}

export default function LastTicket({ticket}: LastTicketProps) {
    const {cityForth, cityBack, stationForth, stationBack, minPrice} = ticket;

    return(
        <div className="last-ticket">
            <div className="last-ticket__city">
                <span>{cityForth}</span>
                <span>{cityBack}</span>
            </div>  
            <div className="last-ticket__station">
                <span>{stationForth}</span>
                <span>{stationBack}</span>
            </div>
            <div className="last-ticket__grid-box">
                <div className="last-ticket__icons">
                    <OptionsIcons />
                </div>
                <div className="last-ticket__price">
                    от <span>{minPrice}</span> <RubleIcon />
                </div>
            </div>     
        </div>
    )
}