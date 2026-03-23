import type { CityInfo } from "./typeTicket";

export interface LastTicket {
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    is_express: boolean;
    min_price: number;
    departure: LastDeparture;
    arrival?: LastDeparture;
    total_avaliable_seats: number;
}

export interface LastDeparture {
    _id: string;
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    train: {
        _id: string;
        name: string;
    };
    from: CityInfo;
    to: CityInfo;
    min_price: number;
    duration: number; // в секундах
    price_info: LastPriceInfo;
    seats_info: {
        first?: number;
        second?: number;
        third?: number;
        fourth?: number
    }
}

export interface LastPriceInfo {
    first?: LastPriceDetails;
    second?: LastPriceDetails;
    third?: LastPriceDetails;
    fourth?: LastPriceDetails;
}

export interface LastPriceDetails {
    price: number;
    top_price: number;
    bottom_price: number;
    side_price: number;
    linens_price: number;
    wifi_price: number;
}