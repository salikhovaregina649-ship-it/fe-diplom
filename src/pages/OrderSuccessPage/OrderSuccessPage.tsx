import "./OrderSuccessPage.css";
import { Link } from "react-router";
import Hero from "../../components/Hero/Hero";
import Title from "../../components/uikit/Title/Title";
import Button from "../../components/uikit/Button/Button";
import monitorTicket from "../../assets/icons/big/monitor-ticket.svg";
import tickets from "../../assets/icons/big/tickets.svg";
import conductor from "../../assets/icons/big/conductor.svg";
import Rating from "../../components/uikit/Rating/Rating";
import RubleIcon from "../../assets/icons/small/RubleIcon";

const orderId = "285AA";
const customerName = "Ирина Эдуардовна";
const orderAmount = "7 760";

export default function OrderSuccess() {
    return (
        <div className="order-success">
            <Hero className="order-success__hero">
                <div className="container">
                    <Title as="h1" className="order-success__title">
                        Благодарим Вас за заказ!
                    </Title>
                </div>
            </Hero>
            <div className="order-success__content container">
                <div className="order-success__content-wrapper">
                    <div className="order-success__header">
                        <p className="order-success__order-number">
                            №Заказа {orderId}
                        </p>
                        <p className="order-success__order-amount">
                            сумма <span>{orderAmount}</span> <RubleIcon />
                        </p>
                    </div>
                    <div className="order-success__steps">
                        <div className="order-success__step">
                            <img
                                className="order-success__icon"
                                src={monitorTicket}
                                alt=""
                            />
                            <p className="order-success__step-text">
                                билеты будут
                                <br /> отправлены
                                <br /> на ваш <span>e-mail</span>
                            </p>
                        </div>
                        <div className="order-success__step">
                            <img
                                className="order-success__icon"
                                src={tickets}
                                alt=""
                            />
                            <p className="order-success__step-text">
                                <span>распечатайте</span>
                                <br /> и сохраняйте билеты
                                <br /> до даты поездки
                            </p>
                        </div>
                        <div className="order-success__step">
                            <img
                                className="order-success__icon"
                                src={conductor}
                                alt=""
                            />
                            <p className="order-success__step-text">
                                <span>предьявите</span>
                                <br /> распечатанные билеты при посадке
                            </p>
                        </div>
                    </div>
                    <div className="order-success__details">
                        <Title as="h2" className="order-success__customer-name">
                            {customerName}!
                        </Title>
                        <p className="order-success__text">
                            Ваш заказ успешно оформлен.
                            <br />В ближайшее время с вами свяжется наш оператор
                            для подтверждения.
                        </p>
                        <p className="order-success__text order-success__text--bold">
                            Благодарим Вас за оказанное доверие и желаем
                            приятного путешествия!
                        </p>
                    </div>
                    <div className="order-success__footer">
                        <div className="order-success__evaluation">
                            <p className="order-success__evaluation-text">Оцените сервис</p>
                            <Rating className="order-success__rating" />
                        </div>
                        <Button
                            className="order-success__btn"
                            type="button"
                            variant="transparent"
                            uppercase={true}
                        >
                            <Link to="/" className="order-success__link">
                                Вернуться на главную
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
