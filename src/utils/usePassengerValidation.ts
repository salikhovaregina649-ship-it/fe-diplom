import { useState } from "react";

type Errors = Record<string, string>;

export function usePassengerValidation(passenger: any) {
    const [errors, setErrors] = useState<Errors>({});

    const validateField = (name: string, value: string) => {
        switch (name) {
            case "first_name":
                return value.trim() ? "" : "Введите фамилию";

            case "last_name":
                return value.trim() ? "" : "Введите имя";

            case "patronymic":
                return value.trim() ? "" : "Введите отчество";

            case "birthday":
                return value ? "" : "Введите дату рождения";

            case "document": {
                if (passenger.document_type === "паспорт") {
                    return /^\d{4}\s\d{6}$/.test(value)
                        ? ""
                        : "Паспортные данные указаны некорректно. Пример: 1004 100006.";
                }

                const birthCertRegex = /^[IVXLCDM]+-[А-ЯЁа-яё]{2}-\d{6}$/i;
                return birthCertRegex.test(value)
                    ? ""
                    : "Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456.";
            }

            default:
                return "";
        }
    };

    const handleBlur = (field: string, value: string) => {
    const error = validateField(field, value);

    setErrors((prev) => {
        // если ошибки нет — удаляем ключ
        if (!error) {
            const { [field]: removed, ...rest } = prev;
            return rest;
        }
        // если ошибка есть — сохраняем
        return {
            ...prev,
            [field]: error,
        };
    });
};

    const validateAll = () => {
        const newErrors: Errors = {
            first_name: validateField("first_name", passenger.first_name),
            last_name: validateField("last_name", passenger.last_name),
            patronymic: validateField("patronymic", passenger.patronymic),
            birthday: validateField("birthday", passenger.birthday),
            document: validateField(
                "document",
                passenger.document_data || ""
            ),
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(Boolean);
    };

    return {
        errors,
        setErrors,
        handleBlur,
        validateAll,
    };
}