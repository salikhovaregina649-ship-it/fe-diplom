import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PaymentState, PaymentErrors } from "./types";
import type { RootState } from "../store";

const initialState: PaymentState = {
    first_name: "",
    last_name: "",
    patronymic: "",
    phone: "",
    email: "",
    paymentMethod: "online",
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{field: keyof Omit<PaymentState, "paymentMethod">; value: string}>) => {
            state[action.payload.field] = action.payload.value;
        },
        setPaymentMethod: (state, action: PayloadAction<"online" | "cash">) => {
            state.paymentMethod = action.payload;
        },
        clearPayment: () => initialState,
    },
});

export const {setField, setPaymentMethod, clearPayment} = paymentSlice.actions;

export const selectPayment = (state: RootState) => state.payment;
export const selectPaymentErrors = createSelector([selectPayment],(payment): PaymentErrors => {
    const {first_name, last_name, patronymic, phone, email} = payment;

    const phoneDigits = phone.replace(/\D/g, "");

    return {
        // Ошибка, если пусто
        first_name: first_name.trim() === "",
        last_name: last_name.trim() === "",
        patronymic: patronymic.trim() === "",
        
        phone: phone.trim() === "" || phoneDigits.length < 10,
        
        email: email.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    };
});

export const selectIsPaymentValid = createSelector([selectPaymentErrors], (errors) => {
    // Если хотя бы в одном поле true (ошибка), то форма невалидна
    return !Object.values(errors).includes(true);
});

export default paymentSlice.reducer;