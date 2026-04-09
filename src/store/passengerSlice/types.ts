export interface PassengerInfoState {
    id: string;
    is_adult: boolean; // true - взрослый, false - днтский
    first_name: string;
    last_name: string;
    patronymic: string;
    gender: boolean; // true - мужской, false - женский
    birthday: string;
    document_type: "паспорт" | "свидетельство о рождении";
    document_data: string;
}

export interface PassengerState {
    passengers: PassengerInfoState[];
}
