import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Aside from "../Aside/Aside";
import Button from "../uikit/Button/Button";
import Passenger from "../Passenger/Passenger";
import TripDetails from "../TripDetails/TripDetails";
import Title from "../uikit/Title/Title";
import { useGetRoutesQuery } from "../../store/api/api";
import { getRouteParams } from "../../utils/getRouteParams";
import { setPassenger, removePassenger } from "../../store/passengerSlice/passengerSlice";
import type { RootState } from "../../store/store";
import "./PassengerStep.css";

export default function PassengerStep() {
    const dispatch = useDispatch();
    const passengers = useSelector((state: RootState) => state.passenger.passengers);

    const searchState = useSelector((state: RootState) => state.search);
    const routesState = useSelector((state: RootState) => state.routes);
    const seatsState = useSelector((state: RootState) => state.seats);
    const {selectedRouteId} = useSelector((state: RootState) => state.booking);

    const routeParams = useMemo(() => getRouteParams(searchState, routesState), [searchState, routesState]);
    const { data: routesData } = useGetRoutesQuery(routeParams!, {skip: !routeParams});
    const ticketInfo = routesData?.items?.find((item) => item.departure._id === selectedRouteId);

    const initialQuantityTickets = seatsState.departure.totalTickets;
    console.log("initialQuantityTickets", initialQuantityTickets); // удалить потом
    useEffect(() => { // отобразится столько пассажиров, сколько пассажиров выбрано (не кол-во мест, а именно пассажиров)
        if (passengers.length === 0) {
            for (let i = 0; i < initialQuantityTickets; i++) {
                dispatch(setPassenger({ id: uuidv4() }));
            }
        }
    }, [dispatch, initialQuantityTickets]);

    const navigate = useNavigate();
    const handleThen = () => {
        navigate("/booking/payment");
        console.log(passengers); // удалить потом
    };

    const handleRemovePassenger = (id: string) => {
        dispatch(removePassenger(id)); //Вопрос! Чтобы удалить пассажира, нужно убрать место, т.е переходить на прошлую страницу (по макету кнопка выглядит так, будто можно просто убрать и все ок)
    };

    const handleAddPassenger = () => {
        dispatch(setPassenger({id: uuidv4()})); // Чтобы добавить пассажира, нужно выбрать место...
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
                            onDelete={() => passenger.id && handleRemovePassenger(passenger.id)}
                            passengerId={passenger.id}
                        />
                    ))}

                    <div className="passenger-step__append">
                        <Title as="h3" className="passenger-step__append-title">Добавить пассажира</Title>
                        <Button
                            className="passenger-step__append-btn"
                            type="button"
                            variant="light"
                            onClick={handleAddPassenger}
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
