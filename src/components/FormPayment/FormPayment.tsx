import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Checkbox from "../uikit/Checkbox/Checkbox";
import Title from "../uikit/Title/Title";
import { setField, setPaymentMethod, selectPayment, selectPaymentErrors, clearPayment } from "../../store/paymentSlice/paymentSlice";
import type { FieldKey } from "../../store/paymentSlice/types";
import "./FormPayment.css";

export default function FormPayment() {
    const dispatch = useDispatch();
    const paymentData = useSelector(selectPayment);
    const errors = useSelector(selectPaymentErrors);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        dispatch(setField({field: name as FieldKey, value}));
    };

    const handleMethodChange = (method: "online" | "cash") => {
        dispatch(setPaymentMethod(method));
    };

    useEffect(() => {
        dispatch(clearPayment());
    }, [dispatch]);

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
                            className={clsx(
                                "form-payment__input",
                                errors.first_name && "form-payment__input--error"
                            )}
                            type="text"
                            name="first_name"
                            value={paymentData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label className="form-payment__label">
                        <span>Имя</span>
                        <input
                            className={clsx(
                                "form-payment__input",
                                errors.last_name && "form-payment__input--error"
                            )}
                            type="text"
                            name="last_name"
                            value={paymentData.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label className="form-payment__label">
                        <span>Отчество</span>
                        <input
                            className={clsx(
                                "form-payment__input",
                                errors.patronymic && "form-payment__input--error"
                            )}
                            type="text"
                            name="patronymic"
                            value={paymentData.patronymic}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div className={clsx("form-payment__row", "form-payment__row--tel")}>
                    <label className="form-payment__label">
                        <span>Контактный телефон</span>
                        <input
                            className={clsx(
                                "form-payment__input", 
                                "form-payment__input--tel",
                                errors.phone && "form-payment__input--error"
                            )}
                            type="tel"
                            name="phone"
                            placeholder="+7 ___ ___ __ __"
                            value={paymentData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div className={clsx("form-payment__row", "form-payment__row--email")}>
                    <label className="form-payment__label">
                        <span>E-mail</span>
                        <input
                            className={clsx(
                                "form-payment__input", 
                                "form-payment__input--email",
                                errors.email && "form-payment__input--error"
                            )}
                            type="email"
                            name="email"
                            placeholder="inbox@gmail.ru"
                            value={paymentData.email}
                            onChange={handleInputChange}
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
                        checked={paymentData.paymentMethod === "online"}
                        onChange={() => handleMethodChange("online")}
                        checkMark={true}
                    />
                    <ul className="form-payment__payment-list">
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
                        checked={paymentData.paymentMethod === "cash"}
                        onChange={() => handleMethodChange("cash")}
                        checkMark={true}
                    />
                </div>
            </div>
        </form>
    )
}