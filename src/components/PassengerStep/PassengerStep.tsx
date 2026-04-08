import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Aside from "../Aside/Aside";
import Button from "../uikit/Button/Button";
import Passenger from "../Passenger/Passenger";
import TripDetails from "../TripDetails/TripDetails";
import Title from "../uikit/Title/Title";
import { useGetRoutesQuery } from "../../store/api/api";
import { getRouteParams } from "../../utils/getRouteParams";
import type { RootState } from "../../store/store";
import "./PassengerStep.css";

interface PassengerItem {
   id: string;
}

export default function PassengerStep() {
    const searchState = useSelector((state: RootState) => state.search);
    const routesState = useSelector((state: RootState) => state.routes);
    const seatsState = useSelector((state: RootState) => state.seats);
    const {selectedRouteId} = useSelector((state: RootState) => state.booking);

    const routeParams = useMemo(() => getRouteParams(searchState, routesState), [searchState, routesState]);
    const { data: routesData } = useGetRoutesQuery(routeParams!, {skip: !routeParams});
    const ticketInfo = routesData?.items?.find((item) => item.departure._id === selectedRouteId);

    const initialQuantityTickets = seatsState.departure.totalTickets;
    const [passengers, setPassengers] = useState<PassengerItem[]>(
        Array.from({ length: initialQuantityTickets }, () => ({
            id: uuidv4(),
        }))
    );

    const navigate = useNavigate();
    const handleThen = () => {
        navigate("/booking/payment");
    };

    const removePassenger = (id: string) => {
        setPassengers(prev => prev.filter(p => p.id !== id)); // Чтобы удалить пассажира, нужно убрать место, т.е переходить на прошлую страницу (по макету кнопка выглядит так, будто можно просто убрать и все ок)
    };

    const addPassenger = () => {
        setPassengers(prev => [...prev, { id: uuidv4() }]); // Чтобы добавить пассажира, нужно выбрать место...
    };

    return (
        <div className="passenger-step">
            <div className="container">
                <div className="passenger-step__aside-wrapper">
                    <Aside className="passenger-step__aside">
                        <TripDetails ticketInfo={ticketInfo!} seatsInfo={seatsState} />
                    </Aside>
                </div>
                <div className="passenger-step__main">
                    {passengers.map((passenger, index) => (
                        <Passenger 
                            key={passenger.id} 
                            className="passenger-step__passenger"
                            number={index + 1}
                            onDelete={() => removePassenger(passenger.id)}
                        />
                    ))}

                    <div className="passenger-step__append">
                        <Title as="h3" className="passenger-step__append-title">Добавить пассажира</Title>
                        <Button
                            className="passenger-step__append-btn"
                            type="button"
                            variant="light"
                            onClick={addPassenger}
                        >
                            <span />
                        </Button>
                    </div>
                    
                    <Button
                        className="passenger-step__then-btn"
                        type="button"
                        variant="yellow"
                        onClick={handleThen}
                        uppercase={true}
                    >
                        Далее
                    </Button>
                </div>
            </div>
        </div>
    );
}
