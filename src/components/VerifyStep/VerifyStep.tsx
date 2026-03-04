import { useNavigate } from "react-router";
import Aside from "../Aside/Aside";
import Button from "../uikit/Button/Button";
import TripDetails from "../TripDetails/TripDetails";
import Train from "../Train/Train";
import Title from "../uikit/Title/Title";
import "./VerifyStep.css";

import routesResponse from "../../mocks/routesResponse.json";
import { ticketsState } from "../../mocks/moks";
import PassengerIconBig from "../../assets/icons/small/PassangerIconBig";
import RubleIcon from "../../assets/icons/small/RubleIcon";

//Моки
const trainInfo = routesResponse;

export default function VerifyStep() {
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
                        <TripDetails />
                    </Aside>
                </div>
                <div className="verify-step__main">
                    <div className="verify-step__train">
                        <Title className="verify-step__title" as="h3">
                            Поезд
                        </Title>
                        <Train
                            trainInfo={trainInfo.items[0]}
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
                                {ticketsState.map((ticket) => (
                                    <div
                                        key={ticket.ticket_id}
                                        className="verify-step__passenger-info"
                                    >
                                        <div className="verify-step__passenger-info-header">
                                            <PassengerIconBig />
                                            <p className="verify-step__passenger-category">
                                                {ticket.category}
                                            </p>
                                        </div>
                                        <div className="verify-step__passenger-info-details">
                                            <p className="verify-step__passenger-full-name">
                                                {ticket.passenger.last_name}{" "}
                                                {ticket.passenger.first_name}{" "}
                                                {ticket.passenger.patronymic}
                                            </p>
                                            <p className="verify-step__passenger-gender">
                                                Пол {ticket.passenger.gender}
                                            </p>
                                            <p className="verify-step__passenger-birth-date">
                                                Дата рождения
                                                {ticket.passenger.birth_date}
                                            </p>
                                            <p className="verify-step__passenger-document">
                                                {ticket.document.type}{" "}
                                                {ticket.document.number}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="verify-step__summ">
                                <p className="verify-step__summ-text">Всего</p>
                                <p className="verify-step__summ-number">
                                    {" "}
                                    {/** Должно подтягиваться */}
                                    7 760
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
                                <p>Наличными</p> {/** Должно подтягиваться */}
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
