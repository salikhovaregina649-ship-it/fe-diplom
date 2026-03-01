import { useState } from "react";
import CustomSelect from "../uikit/CustomSelect/CustomSelect";
import Button from "../uikit/Button/Button";
import "./FormPassenger.css";
import Checkbox from "../uikit/Checkbox/Checkbox";
import Radio from "../uikit/Radio/Radio";
import InputDate from "../uikit/InputDate/InputDate";
import clsx from "clsx";

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
    const [selectedGender, setSelectedGender] = useState("");
    const [isMobility, setIsMobility] = useState(false);

    return (
        <form className="form-passenger">
            <CustomSelect
                className="form-passenger__select"
                name="ticket-type"
                options={optionsTicketType}
                value={selectedTicketTypeValue}
                onChange={(val) => setSelectedTicketTypeValue(val)}
            />
            <div className="form-passenger__personal-data-wrapper">
                <label className="form-passenger__label">
                    Фамилия
                    <input
                        className="form-passenger__personal-data-input"
                        type="text"
                        name="surname"
                        required
                    />
                </label>
                <label className="form-passenger__label">
                    Имя
                    <input
                        className="form-passenger__personal-data-input"
                        type="text"
                        name="name"
                        required
                    />
                </label>
                <label className="form-passenger__label">
                    Отчество
                    <input
                        className="form-passenger__personal-data-input"
                        type="text"
                        name="patronymic"
                        required
                    />
                </label>
            </div>
            <div className="form-passenger__personal-data">
                <Radio
                    className="form-passenger__gender"
                    name="gender"
                    id="male"
                    value="male"
                    checked={selectedGender === "male"}
                    onChange={setSelectedGender}
                    label="М"
                />
                <Radio
                    className="form-passenger__gender"
                    name="gender"
                    id="female"
                    value="female"
                    checked={selectedGender === "female"}
                    onChange={setSelectedGender}
                    label="Ж"
                />
                <InputDate
                    className="form-passenger__birth"
                    name="birth-date"
                />
            </div>
            <div className="form-passenger__personal-data">
                <Checkbox
                    className="form-passenger__mobility"
                    name="mobility"
                    value="mobility"
                    label="ограниченная подвижность"
                    checked={isMobility}
                    onChange={(e) => setIsMobility(e.target.checked)}
                />
            </div>
            <div className="form-passenger__personal-document">
                <span className="form-passenger__personal-document-label">
                    Тип документа
                </span>
                <CustomSelect
                    className="form-passenger__personal-document-select"
                    name="document-type"
                    options={DocumentType}
                    value={selectedDocumentTypeValue}
                    onChange={(val) => setSelectedDocumentTypeValue(val)}
                />
                {selectedDocumentTypeValue === "passport" && (
                    <div
                        className={clsx(
                            "form-passenger__personal-data",
                            "form-passenger__personal-data--passport",
                        )}
                    >
                        <label className="form-passenger__label">
                            Серия
                            <input
                                className="form-passenger__personal-data-input"
                                type="text"
                                name="passport-series"
                                required
                            />
                        </label>
                        <label className="form-passenger__label">
                            Номер
                            <input
                                className="form-passenger__personal-data-input"
                                type="text"
                                name="passport-number"
                                required
                            />
                        </label>
                        <div id="birthCertError" className="error-message">
                            Паспортные данные указаны некорректно. Пример: VIII-ЫП-123456.
                        </div>
                    </div>
                )}

                {selectedDocumentTypeValue === "birthCertificate" && (
                    <div
                        className={clsx(
                            "form-passenger__personal-data",
                            "form-passenger__personal-data--birth-certificate",
                        )}
                    >
                        <label className="form-passenger__label">
                            Номер
                            <input
                                className="form-passenger__personal-data-input"
                                type="text"
                                name="birth-certificate-number"
                                placeholder="12 символов"
                                required
                            />
                        </label>
                        <div id="birthCertError" className="error-message">
                            Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456.
                        </div>
                    </div>
                )}
            </div>
            {/**Вопрос!! Что делает данная кнопка? Валидацию?*/}
            <Button
                className="form-passenger__btn"
                type="button"
                variant="light"
            >
                Следующий пассажир
            </Button>
        </form>
    );
}
