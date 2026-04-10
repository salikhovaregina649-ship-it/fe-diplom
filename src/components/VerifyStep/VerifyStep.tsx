import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Aside from "../Aside/Aside";
import Button from "../uikit/Button/Button";
import TripDetails from "../TripDetails/TripDetails";
import Train from "../Train/Train";
import Title from "../uikit/Title/Title";
import { useGetRoutesQuery } from "../../store/api/api";
import { getRouteParams } from "../../utils/getRouteParams";
import type { RootState } from "../../store/store";
import "./VerifyStep.css";

import PassengerIconBig from "../../assets/icons/small/PassangerIconBig";
import RubleIcon from "../../assets/icons/small/RubleIcon";

export default function VerifyStep() {
    const searchState = useSelector((state: RootState) => state.search);
    const routesState = useSelector((state: RootState) => state.routes);
    const seatsState = useSelector((state: RootState) => state.seats);
    const { selectedRouteId } = useSelector(
        (state: RootState) => state.booking,
    );

    const routeParams = useMemo(() => getRouteParams(searchState, routesState), [searchState, routesState]);
    const { data: routesData } = useGetRoutesQuery(routeParams!, {skip: !routeParams});
    const ticketInfo = routesData?.items?.find((item) => item.departure._id === selectedRouteId);

    const passenferState = useSelector((state: RootState) => state.passenger);
    console.log("Список пассажиров", passenferState);
    const paymentState = useSelector((state: RootState) => state.payment);
    console.log("Данные оплаты", paymentState);

    const navigate = useNavigate();

    const handleThen = () => {
        navigate("/order/success");
    };

    const trainHanle = () => {
        navigate("/booking/trains");
    };

    const passengerHandle = () => {
        navigate("/booking/passengers");
    };

    const paymentMethodHandle = () => {
        navigate("/booking/payment");
    };

    return (
        <div className="verify-step">
            <div className="container">
                <div className="verify-step__aside-wrapper">
                    <Aside className="verify-step__aside">
                        <TripDetails ticketInfo={ticketInfo!} seatsInfo={seatsState} />
                    </Aside>
                </div>
                <div className="verify-step__main">
                    <div className="verify-step__train">
                        <Title className="verify-step__title" as="h3">
                            Поезд
                        </Title>
                        <Train
                            ticketInfo={ticketInfo!}
                            verifyStep={true}
                            verifyStepHandle={trainHanle}
                        />
                    </div>

                    <div className="verify-step__passenger">
                        <Title className="verify-step__title" as="h3">
                            Пассажиры
                        </Title>
                        <div className="verify-step__passenger-box">
                            <div className="verify-step__passenger-content">
                                {passenferState.passengers.map((passenger) => (
                                    <div
                                        key={passenger.id}
                                        className="verify-step__passenger-info"
                                    >
                                        <div className="verify-step__passenger-info-header">
                                            <PassengerIconBig />
                                            <p className="verify-step__passenger-category">
                                                {passenger.is_adult ? "Взрослый" : "Детский"}
                                            </p>
                                        </div>
                                        <div className="verify-step__passenger-info-details">
                                            <p className="verify-step__passenger-full-name">
                                                {passenger.last_name}{" "}
                                                {passenger.first_name}{" "}
                                                {passenger.patronymic}
                                            </p>
                                            <p className="verify-step__passenger-gender">
                                                <span>Пол</span>{" "}
                                                {passenger.gender ? "Мужской" : "Женский"}
                                            </p>
                                            <p className="verify-step__passenger-birth-date">
                                                <span>Дата рождения</span>{" "}
                                                {passenger.birthday}
                                            </p>
                                            <p className="verify-step__passenger-document">
                                                <span>{passenger.document_type ? "Паспорт РФ" : "Свидетельство о рождении"}{" "}</span>
                                                {passenger.document_data}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="verify-step__summ">
                                <p className="verify-step__summ-text">Всего</p>
                                <p className="verify-step__summ-number">
                                    {" "}
                                    {seatsState.departure.price}{" "}
                                    <RubleIcon />
                                </p>
                            </div>
                            <div className="verify-step__grid-wrapper">
                                <Button
                                    className="verify-step__btn"
                                    variant="light"
                                    type="button"
                                    onClick={passengerHandle}
                                >
                                    Изменить
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="verify-step__payment-method">
                        <Title className="verify-step__title" as="h3">
                            Способ оплаты
                        </Title>
                        <div className="verify-step__payment-box">
                            <div className="verify-step__payment-method-content">
                                <p>{paymentState.paymentMethod === "online" ? "Онлайн" : "Наличными"}</p>
                            </div>
                            <div className="verify-step__grid-wrapper">
                                <Button
                                    className="verify-step__btn"
                                    variant="light"
                                    type="button"
                                    onClick={paymentMethodHandle}
                                >
                                    Изменить
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Button
                        className="verify-step__then-btn"
                        type="submit"
                        variant="yellow"
                        onClick={handleThen}
                    >
                        Подтвердить
                    </Button>
                </div>
            </div>
        </div>
    );
}
