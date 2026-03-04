import { useState } from "react";
import Checkbox from "../uikit/Checkbox/Checkbox";
import Title from "../uikit/Title/Title";
import "./FormPayment.css";
import clsx from "clsx";

export default function FormPayment() {
    const [online, setOnline] = useState(false);
    const [inCash, setOInCash] = useState(false);

    return (
        <form className="form-payment">
            <Title className="form-payment__title" as="h3">
                Персональные данные
            </Title>
            <div className="form-payment__box">
                <div className="form-payment__row">
                    <label className="form-payment__label">
                        <span>Фамилия</span>
                        <input
                            className="form-payment__input"
                            type="text"
                            name="surname"
                            required
                        />
                    </label>
                    <label className="form-payment__label">
                        <span>Имя</span>
                        <input
                            className="form-payment__input"
                            type="text"
                            name="name"
                            required
                        />
                    </label>
                    <label className="form-payment__label">
                        <span>Отчество</span>
                        <input
                            className="form-payment__input"
                            type="text"
                            name="patronymic"
                            required
                        />
                    </label>
                </div>
                <div className={clsx("form-payment__row", "form-payment__row--tel")}>
                    <label className="form-payment__label">
                        <span>Контактный телефон</span>
                        <input
                            className={clsx("form-payment__input", "form-payment__input--tel")}
                            type="tel"
                            name="tel"
                            placeholder="+7 ___ ___ __ __"
                            required
                        />
                    </label>
                </div>
                <div className={clsx("form-payment__row", "form-payment__row--email")}>
                    <label className="form-payment__label">
                        <span>E-mail</span>
                        <input
                            className={clsx("form-payment__input", "form-payment__input--email")}
                            type="email"
                            name="email"
                            placeholder="inbox@gmail.ru"
                            required
                        />
                    </label>
                </div>
            </div>

            <Title className="form-payment__title" as="h3">
                Способ оплаты
            </Title>
            <div className="form-payment__box">
                <div className={clsx("form-payment__row", "form-payment__row--online")}>
                    <Checkbox 
                        className="form-payment__payment-method"
                        name="online"
                        value="online"
                        label="Онлайн"
                        checked={online}
                        onChange={(e) => setOnline(e.target.checked)}
                        checkMark={true}
                    />
                    <ul className="form-payment__payment-list">
                        {/*Вопрос!! Это чекбоксы? */}
                        <li>Банковской<br /> картой</li>
                        <li>PayPal</li>
                        <li>Visa QIWI Wallet</li>
                    </ul>
                </div>
                <div className={clsx("form-payment__row", "form-payment__row--in-cash")}>
                    <Checkbox 
                        className="form-payment__payment-method"
                        name="in-cash"
                        value="in-cash"
                        label="Наличными"
                        checked={inCash}
                        onChange={(e) => setOInCash(e.target.checked)}
                        checkMark={true}
                    />
                </div>
            </div>
        </form>
    )
}