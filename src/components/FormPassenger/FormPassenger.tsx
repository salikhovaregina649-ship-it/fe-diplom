import { useState, useId } from "react";
import CustomSelect from "../uikit/CustomSelect/CustomSelect";
import Button from "../uikit/Button/Button";
import "./FormPassenger.css";
import Checkbox from "../uikit/Checkbox/Checkbox";
import Radio from "../uikit/Radio/Radio";
import CustomDatepicker from "../uikit/CustomDatepicker/CustomDatepicker";
import clsx from "clsx";
// import ValidIcon from "../../assets/icons/small/ValidIcon";
// import ErrorIcon from "../../assets/icons/small/ErrorIcon";

//Моки
const optionsTicketType = [
    { value: "adult", label: "Взрослый" },
    { value: "childlike", label: "Детский" },
];

const DocumentType = [
    { value: "passport", label: "Паспорт РФ" },
    { value: "birthCertificate", label: "Свидетельство о рождении" },
];

export default function FormPassenger() {
    const [selectedTicketTypeValue, setSelectedTicketTypeValue] = useState<string>(optionsTicketType[0].value);
    const [selectedDocumentTypeValue, setSelectedDocumentTypeValue] = useState<string>(DocumentType[0].value);
    const [selectedGender, setSelectedGender] = useState("male");
    const [isMobility, setIsMobility] = useState(false);
    const [dateBirth, setDateBirth] = useState<Date | null>(null);

    const formId = useId();

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
                    value={selectedTicketTypeValue}
                    onChange={(val) => setSelectedTicketTypeValue(val)}
                />
                <div className="form-passenger__personal-data">
                    <label className="form-passenger__label">
                        <p className="form-passenger__title">Фамилия</p>
                        <input
                            className="form-passenger__input"
                            type="text"
                            name="surname"
                            required
                        />
                    </label>
                    <label className="form-passenger__label">
                        <p className="form-passenger__title">Имя</p>
                        <input
                            className="form-passenger__input"
                            type="text"
                            name="name"
                            required
                        />
                    </label>
                    <label className="form-passenger__label">
                        <p className="form-passenger__title">Отчество</p>
                        <input
                            className="form-passenger__input"
                            type="text"
                            name="patronymic"
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
                                name={`gender-${formId}`}
                                id={`male-${formId}`}
                                value="male"
                                checked={selectedGender === "male"}
                                onChange={setSelectedGender}
                                label="М"
                            />
                            <Radio
                                className="form-passenger__gender"
                                name={`gender-${formId}`}
                                id={`female-${formId}`}
                                value="female"
                                checked={selectedGender === "female"}
                                onChange={setSelectedGender}
                                label="Ж"
                            />
                        </div>
                    </div>
                    <div className="form-passenger__date-box">
                        <p className="form-passenger__title">Дата рождения</p>
                        <CustomDatepicker
                            value={dateBirth}
                            onChange={setDateBirth}
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
                            selectedDocumentTypeValue === "passport" && "size",
                        )}
                        name="document-type"
                        options={DocumentType}
                        value={selectedDocumentTypeValue}
                        onChange={(val) => setSelectedDocumentTypeValue(val)}
                    />
                </div>
                {selectedDocumentTypeValue === "passport" && (
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

                {selectedDocumentTypeValue === "birthCertificate" && (
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
