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
import { setPassengers, setPassenger, removePassenger, initialInfoState } from "../../store/passengerSlice/passengerSlice";
import type { PassengerInfoState } from "../../store/passengerSlice/types";
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

    // отобразится столько пассажиров, сколько пассажиров выбрано (не кол-во мест, а именно пассажиров)
    useEffect(() => {
        if (initialQuantityTickets === 0) return;
        // Если количество совпадает — ничего делать не нужно
        if (passengers.length === initialQuantityTickets) return;
        // Если пассажиров больше, чем билетов (пользователь убрал билет) -> обрезаем массив
        if (passengers.length > initialQuantityTickets) {
            const trimmedPassengers = passengers.slice(0, initialQuantityTickets);
            dispatch(setPassengers(trimmedPassengers));
        } 
        // Если пассажиров меньше, чем билетов (пользователь добавил билет) -> добавляем недостающих
        else {
            const diff = initialQuantityTickets - passengers.length;
            const newPassengers: PassengerInfoState[] = [];
            
            for (let i = 0; i < diff; i++) {
                newPassengers.push({
                    ...initialInfoState,
                    id: uuidv4(),
                });
            }
            
            // Отправляем полный массив (старые + новые), чтобы сохранить порядок и данные
            dispatch(setPassengers([...passengers, ...newPassengers]));
        }
    }, [dispatch, initialQuantityTickets, passengers]); 

    const navigate = useNavigate();
    const handleThen = () => {
        navigate("/booking/payment");
        console.log(passengers); // удалить потом
    };

    const handleRemovePassenger = (id: string) => {
        if (passengers.length <= initialQuantityTickets) return;
        dispatch(removePassenger(id)); //Вопрос! Чтобы удалить пассажира, нужно убрать место, т.е переходить на прошлую страницу (по макету кнопка выглядит так, будто можно просто убрать и все ок). Логически на этом шаге нельзя менять количество пассажиров..
    };

    const handleAddPassenger = () => {
        if (passengers.length >= initialQuantityTickets) return;
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
