import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import CustomSelect from "../uikit/CustomSelect/CustomSelect";
import Button from "../uikit/Button/Button";
import Checkbox from "../uikit/Checkbox/Checkbox";
import Radio from "../uikit/Radio/Radio";
import CustomDatepicker from "../uikit/CustomDatepicker/CustomDatepicker";
import { updatePassenger } from "../../store/passengerSlice/passengerSlice";
import type { RootState } from "../../store/store";
import "./FormPassenger.css";
// import ValidIcon from "../../assets/icons/small/ValidIcon";
// import ErrorIcon from "../../assets/icons/small/ErrorIcon";

interface FormPassengerProps {
    passengerId: string;
}

const optionsTicketType = [
    { value: "adult", label: "Взрослый" },
    { value: "childlike", label: "Детский" },
];

const DocumentType = [
    { value: "passport", label: "Паспорт РФ" },
    { value: "birthCertificate", label: "Свидетельство о рождении" },
];

export default function FormPassenger({ passengerId }: FormPassengerProps) {
    const [isMobility, setIsMobility] = useState(false); //Вопрос! такого значения для order нету, хотя в макете есть

    const dispatch = useDispatch();

    const passenger = useSelector((state: RootState) => 
        state.passenger.passengers.find(p => p.id === passengerId)
    );
    // Если пассажир не найден
    if (!passenger) return null;

    return (
        <form className="form-passenger">
            <div className="form-passenger__personal-box">
                <CustomSelect
                    className={clsx(
                        "form-passenger__select",
                        "form-passenger__select--category",
                    )}
                    name="category"
                    options={optionsTicketType}
                    value={passenger.is_adult ? "adult" : "childlike"}
                    onChange={(val) => dispatch(updatePassenger({id: passengerId, data: {is_adult: val === "adult"}}))}
                />
                <div className="form-passenger__personal-data">
                    <label className="form-passenger__label">
                        <p className="form-passenger__title">Фамилия</p>
                        <input
                            className="form-passenger__input"
                            type="text"
                            name="first_name"
                            value={passenger.first_name}
                            onChange={(e) => dispatch(updatePassenger({id: passengerId, data: {first_name: e.target.value}}))}
                            required
                        />
                    </label>
                    <label className="form-passenger__label">
                        <p className="form-passenger__title">Имя</p>
                        <input
                            className="form-passenger__input"
                            type="text"
                            name="last_name"
                            value={passenger.last_name}
                            onChange={(e) => dispatch(updatePassenger({id: passengerId, data: {last_name: e.target.value}}))}
                            required
                        />
                    </label>
                    <label className="form-passenger__label">
                        <p className="form-passenger__title">Отчество</p>
                        <input
                            className="form-passenger__input"
                            type="text"
                            name="patronymic"
                            value={passenger.patronymic}
                            onChange={(e) => dispatch(updatePassenger({id: passengerId, data: {patronymic: e.target.value}}))}
                            required
                        />
                    </label>
                </div>
                <div className="form-passenger__personal-data">
                    <div className="form-passenger__radio-box">
                        <p className="form-passenger__title">Пол</p>
                        <div className="form-passenger__radio">
                            <Radio
                                className="form-passenger__gender"
                                name={`gender-${passengerId}`}
                                id={`male-${passengerId}`}
                                value="male"
                                checked={passenger.gender === true}
                                onChange={() => dispatch(updatePassenger({id: passengerId, data: {gender: true}}))}
                                label="М"
                            />
                            <Radio
                                className="form-passenger__gender"
                                name={`gender-${passengerId}`}
                                id={`female-${passengerId}`}
                                value="female"
                                checked={passenger.gender === false}
                                onChange={() => dispatch(updatePassenger({id: passengerId, data: {gender: false}}))}
                                label="Ж"
                            />
                        </div>
                    </div>
                    <div className="form-passenger__date-box">
                        <p className="form-passenger__title">Дата рождения</p>
                        <CustomDatepicker
                            value={passenger.birthday ? new Date(passenger.birthday) : null}
                            onChange={(date) => dispatch(updatePassenger({id: passengerId, data: {birthday: date ? date.toISOString() : ""}}))}
                            placeholder="ДД/ММ/ГГ"
                            name="birth-date"
                            icon={false}
                            modifier="form"
                        />
                    </div>
                </div>
                <div className="form-passenger__personal-data">
                    <Checkbox
                        className="form-passenger__mobility"
                        name="mobility"
                        value="mobility"
                        label="ограниченная подвижность"
                        checked={isMobility}
                        onChange={(e) => setIsMobility(e.target.checked)}
                        checkMark={true}
                    />
                </div>
            </div>
            <div
                className={clsx(
                    "form-passenger__personal-box",
                    "form-passenger__personal-box--document",
                )}
            >
                <div className="form-passenger__personal-select-box">
                    <p className="form-passenger__title">
                        Тип документа
                    </p>
                    <CustomSelect
                        className={clsx(
                            "form-passenger__select",
                            "form-passenger__select--document-type",
                            passenger.document_type === "паспорт" && "size",
                        )}
                        name="document-type"
                        options={DocumentType}
                        value={passenger.document_type}
                        onChange={(val) => dispatch(updatePassenger({id: passengerId, data: {document_type: val === "passport" ? "паспорт" : "свидетельство о рождении"}}))}
                    />
                </div>
                {passenger.document_type === "паспорт" && (
                    <div
                        className={clsx(
                            "form-passenger__personal-document",
                            "form-passenger__personal-document--passport",
                        )}
                    >
                        <label className="form-passenger__label">
                            <p className="form-passenger__title">Серия</p>
                            <input
                                className="form-passenger__input"
                                type="text"
                                name="passport-series"
                                required
                            />
                        </label>
                        <label className="form-passenger__label">
                            <p className="form-passenger__title">Номер</p>
                            <input
                                className="form-passenger__input"
                                type="text"
                                name="passport-number"
                                required
                            />
                        </label>
                    </div>
                )}

                {passenger.document_type === "свидетельство о рождении" && (
                    <div
                        className={clsx(
                            "form-passenger__personal-document",
                            "form-passenger__personal-document--birth-certificate",
                        )}
                    >
                        <label className="form-passenger__label">
                            <p className="form-passenger__title">Номер</p>
                            <input
                                className="form-passenger__input"
                                type="text"
                                name="birth-certificate-number"
                                placeholder="12 символов"
                                required
                            />
                        </label>
                    </div>
                )}
            </div>
            <div className="form-passenger__btn-box">
                {/* <div className="form-passenger__message">
                    <div className="form-passenger__message-box">
                        <ErrorIcon />
                        <p className="form-passenger__passport-error-message">
                            Паспортные данные указаны некорректно.<br />
                            Пример: 1004 100006.
                        </p>
                    </div>
                    <div className="form-passenger__message-box">
                        <ErrorIcon />
                        <p className="form-passenger__birth-certificate-error-message">
                            Номер свидетельства о рождении указан некорректно.
                            <br />
                            Пример: VIII-ЫП-123456.
                        </p>
                    </div>
                    <div className="form-passenger__message-box">
                        <ValidIcon />
                        <p className="form-passenger__valid">Готово</p>
                    </div>
                </div> */}
                {/**Делает фокус на следующей форме*/}
                <Button
                    className="form-passenger__btn"
                    type="button"
                    variant="transparent"
                >
                    Следующий пассажир
                </Button>
            </div>
        </form>
    );
}
