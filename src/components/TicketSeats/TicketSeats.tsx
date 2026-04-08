import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Title from "../uikit/Title/Title";
import Button from "../uikit/Button/Button";
import FormTicketSeats from "../FormTicketSeats/FormTicketSeats";
import { useGetRoutesQuery } from "../../store/api/api";
import { useGetSeatsQuery } from "../../store/api/api";
import { getRouteParams } from "../../utils/getRouteParams";
import { getFiltersParams } from "../../utils/getFiltersParams";
import { setSelectedRouteId } from "../../store/bookingSlice/bookingSlice";
import type { RootState } from "../../store/store";
import "./TicketSeats.css";
// icons
import SedentaryIcon from "../../assets/icons/filter/SedentaryIcon";
import CoupeIcon from "../../assets/icons/filter/CoupeIcon";
import ReservedSeatIcon from "../../assets/icons/filter/ReservedSeatIcon";
import LuxuryIcon from "../../assets/icons/filter/LuxuryIcon";

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
    const dispatch = useDispatch();
    const {id} = useParams<{id: string}>();

    const searchState = useSelector((state: RootState) => state.search);
    const routesState = useSelector((state: RootState) => state.routes);
    const seatsState = useSelector((state: RootState) => state.seats);

    const routeParams = useMemo(() => getRouteParams(searchState, routesState), [searchState, routesState]);
    const filtersParams = useMemo(() => getFiltersParams(routesState), [routesState]);

    const { data: routesData, isLoading: routesLoading } = useGetRoutesQuery(routeParams!, {skip: !routeParams});
    const ticketInfo = routesData?.items?.find((item) => item.departure._id === id);

    const { data: seatsInfo, isLoading: seatsLoading } = useGetSeatsQuery(
        {id: id!, filters: filtersParams!},
        {skip: !id}
    );

    const isValid = useMemo(() => {
        const dep = seatsState.departure;
        const arr = seatsState.arrival;
        const depRequired = dep.tickets.adult + dep.tickets.childWithSeat;
        const arrRequired = arr ? arr.tickets.adult + arr.tickets.childWithSeat : 0;
        const departureValid = dep.selectedSeatsCount === depRequired && depRequired > 0;
        const arrivalValid = !arr || arr.selectedSeatsCount === arrRequired;
        return departureValid && arrivalValid;
    }, [seatsState]);

    const navigate = useNavigate();
    const handleThen = () => {
        dispatch(setSelectedRouteId(id!));
        navigate("/booking/passengers");
    };

    if (routesLoading || seatsLoading || !ticketInfo || !seatsInfo) {
        return <div>Загрузка...</div>;
    }

    const filteredClasses = classes.filter((cls) => {
        if (cls.value === "first") return ticketInfo.departure.have_first_class;
        if (cls.value === "second") return ticketInfo.departure.have_second_class;
        if (cls.value === "third") return ticketInfo.departure.have_third_class;
        if (cls.value === "fourth") return ticketInfo.departure.have_fourth_class;
        return true;
    });

    return (
        <div className="ticket-seats">
            <Title as="h3" className="ticket-seats__title" uppercase={true}>
                Выбор мест
            </Title>

            <FormTicketSeats
                ticketInfo={ticketInfo}
                seatsInfo={seatsInfo}
                classes={filteredClasses}
            />
            {ticketInfo.arrival && (
                <FormTicketSeats
                    ticketInfo={ticketInfo}
                    seatsInfo={seatsInfo}
                    classes={filteredClasses}
                    arrival={true}
                />
            )}

            <Button
                className="ticket-seats__then-btn"
                type="button"
                variant="yellow"
                onClick={handleThen}
                uppercase={true}
                disabled={!isValid}
            >
                Далее
            </Button>
        </div>
    );
}
