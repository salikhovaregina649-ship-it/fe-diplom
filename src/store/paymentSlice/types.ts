export interface PaymentState {
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string;
    email: string;
    paymentMethod: "online" | "cash";
}

export interface PaymentErrors {
    first_name: boolean;
    last_name: boolean;
    patronymic: boolean;
    phone: boolean;
    email: boolean;
}

export type FieldKey =
    | "first_name"
    | "last_name"
    | "patronymic"
    | "phone"
    | "email";
