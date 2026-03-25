import { useNavigate } from "react-router";
import Title from "../uikit/Title/Title";
import Button from "../uikit/Button/Button";
import TicketSeatsBox from "../TicketSeatsBox/TicketSeatsBox";
import "./TicketSeats.css";
// icons
import SedentaryIcon from "../../assets/icons/filter/SedentaryIcon";
import CoupeIcon from "../../assets/icons/filter/CoupeIcon";
import ReservedSeatIcon from "../../assets/icons/filter/ReservedSeatIcon";
import LuxuryIcon from "../../assets/icons/filter/LuxuryIcon";

import routesResponse from "../../mocks/routesResponse.json";
import seatsResponse from "../../mocks/seatsResponse.json";

//Моки
const ticketInfo = routesResponse.items[0];
const seatsInfo = seatsResponse;
const classes = [
    {
        icon: SedentaryIcon,
        id: "classFourth",
        value: "fourth",
        label: "Сидячий",
    },
    {
        icon: ReservedSeatIcon,
        id: "classThird",
        value: "third",
        label: "Плацкарт",
    },
    {
        icon: CoupeIcon,
        id: "classSecond",
        value: "second",
        label: "Купе",
    },
    {
        icon: LuxuryIcon,
        id: "classFirst",
        value: "first",
        label: "Люкс",
    },
];

export default function TicketSeats() {
    const navigate = useNavigate();

    const handleThen = () => {
        navigate("/booking/passengers");
    };

    return (
        <div className="ticket-seats">
            <Title as="h3" className="ticket-seats__title" uppercase={true}>
                Выбор мест
            </Title>

            <TicketSeatsBox
                ticketInfo={ticketInfo}
                seatsInfo={seatsInfo}
                classes={classes}
            />
            {ticketInfo.arrival && (
                <TicketSeatsBox
                    ticketInfo={ticketInfo}
                    seatsInfo={seatsInfo}
                    classes={classes}
                    arrival={true}
                />
            )}

            <Button
                className="ticket-seats__then-btn"
                type="button"
                variant="yellow"
                onClick={handleThen}
                uppercase={true}
            >
                Далее
            </Button>
        </div>
    );
}
