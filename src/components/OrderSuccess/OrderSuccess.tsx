import "./OrderSuccess.css";
import { Link } from "react-router";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Title from "../uikit/Title/Title";
import Button from "../uikit/Button/Button";

interface OrderSuccess {
    orderId: string;
    orderAmount: number;
    customerName: string;
}

export default function OrderSuccess({
    orderId,
    orderAmount,
    customerName,
}: OrderSuccess) {
    return (
        <div className="order-success">
            <Hero className="order-success__hero">
                <div className="container">
                    <Title as="h1" className="order-success__title">
                        Благодарим Вас за заказ!
                    </Title>
                </div>
            </Hero>
            <div className="order-success__content">
                <div className="container">
                    <div className="order-success__header">
                        <Title as="h2" className="order-success__order-number">
                            №Заказа {orderId}
                        </Title>
                        <p className="order-success__order-amount">
                            сумма <span>{orderAmount}</span>
                        </p>
                    </div>
                    <div className="order-success__steps">
                        <div className="order-success__step">
                            {/**Иконка с монитором*/}
                            <p className="order-success__step-text">
                                билеты будут отправлены на ваш{" "}
                                <span>e-mail</span>
                            </p>
                        </div>
                        <div className="order-success__step">
                            {/**Иконка с билетами*/}
                            <p className="order-success__step-text">
                                <span>распечатайте</span> и сохраняйте билеты до
                                даты поездки
                            </p>
                        </div>
                        <div className="order-success__step">
                            {/**Иконка с человеком*/}
                            <p className="order-success__step-text">
                                <span>предьявите</span> распечатанные билеты при
                                посадке
                            </p>
                        </div>
                    </div>
                    <div className="order-success__details">
                        <Title as="h2" className="order-success__customer-name">
                            {customerName}
                        </Title>
                        <p className="order-success__text">
                            Ваш заказ успешно оформлен.
                            <br />В ближайшее время с вами свяжется наш оператор
                            для подтверждения.
                        </p>
                        <p className="order-success__text">
                            Благодарим Вас за оказанное доверие и желаем
                            приятного путешествия!
                        </p>
                    </div>
                    <div className="order-success__footer">
                        <div className="order-success__evaluation">
                            <p>Оцените сервис</p>
                            {/*тут вставить компонент Rating для оценки сервиса, он в виде звезд*/}
                        </div>
                        <Button
                            className="order-success__btn"
                            variant="yellow"
                            uppercase={true}
                        >
                            <Link to="/" className="order-success__link">
                                Вернуться на главную
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
