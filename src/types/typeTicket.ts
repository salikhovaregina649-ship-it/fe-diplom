export interface Ticket {
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    is_express: boolean;
    min_price: number;
    available_seats: number;
    available_seats_info: {
        first?: number;
        second?: number;
        third?: number;
        fourth?: number;
    };
    departure: Departure;
    arrival?: Departure;
}

export interface Departure {
    _id: string;
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    is_express: boolean;
    min_price: number;
    duration: number; // в секундах
    available_seats: number;
    available_seats_info: {
        first?: number;
        second?: number;
        third?: number;
        fourth?: number;
    };
    train: {
        _id: string;
        name: string;
    };
    from: CityInfo;
    to: CityInfo;
    price_info: PriceInfo;
}

export interface CityInfo {
    railway_station_name: string;
    city: {
        _id: string;
        name: string;
    };
    datetime: number;
}

export interface PriceInfo {
    first?: {
        price?: number;
        top_price?: number;
        bottom_price?: number;
    };
    second?: {
        top_price?: number;
        bottom_price?: number;
    };
    third?: {
        top_price?: number;
        bottom_price?: number;
        side_price?: number;
    };
    fourth?: {
        top_price?: number;
        bottom_price?: number;
    };
}