import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import CustomSelect from "../uikit/CustomSelect/CustomSelect";
import Button from "../uikit/Button/Button";
import Checkbox from "../uikit/Checkbox/Checkbox";
import Radio from "../uikit/Radio/Radio";
import CustomDatepicker from "../uikit/CustomDatepicker/CustomDatepicker";
import { usePassengerValidation } from "../../utils/usePassengerValidation";
import { updatePassenger, clearPassenger } from "../../store/passengerSlice/passengerSlice";
import type { RootState } from "../../store/store";
import "./FormPassenger.css";
import ValidIcon from "../../assets/icons/small/ValidIcon";
import ErrorIcon from "../../assets/icons/small/ErrorIcon";

interface FormPassengerProps {
    passengerId: string;
}

const optionsTicketType = [
    { value: "adult", label: "Взрослый" },
    { value: "childlike", label: "Детский" },
];

const DocumentType = [
    { value: "паспорт", label: "Паспорт РФ" },
    { value: "свидетельство о рождении", label: "Свидетельство о рождении" },
];

export default function FormPassenger({ passengerId }: FormPassengerProps) {
    const [isMobility, setIsMobility] = useState(false); //Вопрос! такого значения для order нету, хотя в макете есть

    const [passportSeries, setPassportSeries] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [birthNumber, setBirthNumber] = useState("");

    const [isValid, setIsValid] = useState<boolean | null>(null);

    const dispatch = useDispatch();

    const passenger = useSelector((state: RootState) => 
        state.passenger.passengers.find(p => p.id === passengerId)
    );
    // Если пассажир не найден
    if (!passenger) return null;
    console.log("render FormPassenger", passenger);
    const {errors, handleBlur, validateAll } = usePassengerValidation(passenger);

    useEffect(() => {
        if (isValid !== null) {
            const hasErrors = Object.values(errors).some(Boolean);
            const currentValid = !hasErrors;
            setIsValid(currentValid);

            dispatch(
                updatePassenger({
                    id: passengerId,
                    data: { is_valid: currentValid },
                })
            );
        }
    }, [isValid, errors, dispatch, passengerId]);

    useEffect(() => {
        // Сбрасываем данные пассажира к начальным при монтировании формы
        dispatch(clearPassenger(passengerId));
    }, [dispatch, passengerId]);

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
                    onChange={(val) => {
                        const isAdult = val === "adult";
                        dispatch(
                            updatePassenger({
                                // для взрослого нужно вводит паспорт, а для детского - свидетельство о рождении
                                id: passengerId,
                                data: {
                                    is_adult: isAdult,
                                    document_type: isAdult
                                        ? "паспорт"
                                        : "свидетельство о рождении",
                                    document_data: "",
                                    is_valid: false,
                                },
                            }),
                        );
                        setPassportSeries("");
                        setPassportNumber("");
                        setBirthNumber("");
                        setIsValid(null);
                    }}
                />
                <div className="form-passenger__personal-data">
                    <label className="form-passenger__label">
                        <p className="form-passenger__title">Фамилия</p>
                        <input
                            className={clsx(
                                "form-passenger__input",
                                errors.first_name &&
                                    "form-passenger__input--error",
                            )}
                            type="text"
                            name="first_name"
                            value={passenger.first_name}
                            onChange={(e) =>
                                dispatch(
                                    updatePassenger({
                                        id: passengerId,
                                        data: { first_name: e.target.value },
                                    }),
                                )
                            }
                            onBlur={(e) => handleBlur("first_name", e.target.value)}
                            required
                        />
                    </label>
                    <label className="form-passenger__label">
                        <p className="form-passenger__title">Имя</p>
                        <input
                            className={clsx(
                                "form-passenger__input",
                                errors.last_name &&
                                    "form-passenger__input--error",
                            )}
                            type="text"
                            name="last_name"
                            value={passenger.last_name}
                            onChange={(e) =>
                                dispatch(
                                    updatePassenger({
                                        id: passengerId,
                                        data: { last_name: e.target.value },
                                    }),
                                )
                            }
                            onBlur={(e) => handleBlur("last_name", e.target.value)}
                            required
                        />
                    </label>
                    <label className="form-passenger__label">
                        <p className="form-passenger__title">Отчество</p>
                        <input
                            className={clsx(
                                "form-passenger__input",
                                errors.patronymic &&
                                    "form-passenger__input--error",
                            )}
                            type="text"
                            name="patronymic"
                            value={passenger.patronymic}
                            onChange={(e) =>
                                dispatch(
                                    updatePassenger({
                                        id: passengerId,
                                        data: { patronymic: e.target.value },
                                    }),
                                )
                            }
                            onBlur={(e) => handleBlur("patronymic", e.target.value)}
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
                                onChange={() =>
                                    dispatch(
                                        updatePassenger({
                                            id: passengerId,
                                            data: {gender: true},
                                        }),
                                    )
                                }
                                label="М"
                            />
                            <Radio
                                className="form-passenger__gender"
                                name={`gender-${passengerId}`}
                                id={`female-${passengerId}`}
                                value="female"
                                checked={passenger.gender === false}
                                onChange={() =>
                                    dispatch(
                                        updatePassenger({
                                            id: passengerId,
                                            data: {gender: false},
                                        }),
                                    )
                                }
                                label="Ж"
                            />
                        </div>
                    </div>
                    <div className="form-passenger__date-box">
                        <p className="form-passenger__title">Дата рождения</p>
                        <CustomDatepicker
                            className={
                                errors.birthday &&
                                "form-passenger__input--error"
                            }
                            value={
                                passenger.birthday
                                    ? new Date(passenger.birthday)
                                    : null
                            }
                            onChange={(date) => {
                                const isoString = date ? date.toISOString() : "";
                                dispatch(
                                    updatePassenger({
                                        id: passengerId,
                                        data: {
                                            birthday: isoString,
                                        },
                                    }),
                                )
                                handleBlur("birthday", isoString);

                            }}
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
                    <p className="form-passenger__title">Тип документа</p>
                    <CustomSelect
                        className={clsx(
                            "form-passenger__select",
                            "form-passenger__select--document-type",
                            passenger.document_type === "паспорт" && "size",
                        )}
                        name="document-type"
                        options={DocumentType}
                        value={passenger.document_type}
                        onChange={(val) => {
                            const isPassport = val === "паспорт";
                            dispatch(
                                updatePassenger({
                                    id: passengerId,
                                    data: {
                                        document_type: isPassport
                                            ? "паспорт"
                                            : "свидетельство о рождении",
                                        is_adult: isPassport,
                                        document_data: "",
                                        is_valid: false,
                                    },
                                }),
                            );
                            setPassportSeries("");
                            setPassportNumber("");
                            setBirthNumber("");
                            setIsValid(null);
                        }}
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
                                className={clsx(
                                    "form-passenger__input",
                                    errors.document &&
                                        "form-passenger__input--error",
                                )}
                                type="text"
                                name="passport-series"
                                value={passportSeries}
                                onChange={(e) => {
                                    const series = e.target.value.replace(/\D/g,"",);
                                    setPassportSeries(series);
                                    dispatch(
                                        updatePassenger({
                                            id: passengerId,
                                            data: {
                                                document_data:
                                                    `${series} ${passportNumber}`.trim(),
                                            },
                                        }),
                                    );
                                }}
                                onBlur={() =>
                                    handleBlur(
                                        "document",
                                        `${passportSeries} ${passportNumber}`.trim()
                                    )
                                }
                                required
                            />
                        </label>
                        <label className="form-passenger__label">
                            <p className="form-passenger__title">Номер</p>
                            <input
                                className={clsx(
                                    "form-passenger__input",
                                    errors.document &&
                                        "form-passenger__input--error",
                                )}
                                type="text"
                                name="passport-number"
                                value={passportNumber}
                                onChange={(e) => {
                                    const number = e.target.value.replace(/\D/g,"");
                                    setPassportNumber(number);
                                    dispatch(
                                        updatePassenger({
                                            id: passengerId,
                                            data: {
                                                document_data:
                                                    `${passportSeries} ${number}`.trim(),
                                            },
                                        }),
                                    );
                                }}
                                onBlur={() =>
                                    handleBlur(
                                        "document",
                                        `${passportSeries} ${passportNumber}`.trim()
                                    )
                                }
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
                                className={clsx(
                                    "form-passenger__input",
                                    errors.document &&
                                        "form-passenger__input--error",
                                )}
                                type="text"
                                name="birth-certificate-number"
                                placeholder="12 символов"
                                value={birthNumber}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setBirthNumber(value);
                                    dispatch(
                                        updatePassenger({
                                            id: passengerId,
                                            data: {document_data: value},
                                        }),
                                    );
                                }}
                                onBlur={() =>
                                    handleBlur(
                                        "document",
                                        birthNumber.trim()
                                    )
                                }
                                required
                            />
                        </label>
                    </div>
                )}
            </div>
            <div className="form-passenger__btn-box">
                <Button
                    className="form-passenger__btn"
                    type="button"
                    variant="transparent"
                    onClick={() => {
                        const valid = validateAll();
                        setIsValid(valid);
                        dispatch(updatePassenger({id: passengerId, data: {is_valid: valid}}));
                    }}
                >
                    Следующий пассажир
                </Button>
                {isValid !== null && (
                    <div className="form-passenger__message">
                        {isValid ? (
                            <div className="form-passenger__message-box">
                                <ValidIcon />
                                <p className="form-passenger__valid">Готово</p>
                            </div>
                        ) : passenger.document_type === "паспорт" ? (
                            <div className="form-passenger__message-box">
                                <ErrorIcon />
                                <p className="form-passenger__passport-error-message">
                                    Паспортные данные указаны некорректно.
                                    <br />
                                    Пример: 1004 100006.
                                </p>
                            </div>
                        ) : (
                            <div className="form-passenger__message-box">
                                <ErrorIcon />
                                <p className="form-passenger__birth-certificate-error-message">
                                    Номер свидетельства о рождении указан
                                    некорректно.
                                    <br />
                                    Пример: VIII-ЫП-123456.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </form>
    );
}
