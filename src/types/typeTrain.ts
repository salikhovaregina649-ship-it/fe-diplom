export default interface Train {
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

interface Departure {
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
    from: StationInfo;
    to: StationInfo;
    price_info: PriceInfo;
}

interface StationInfo {
    railway_station_name: string;
    city: {
        _id: string;
        name: string;
    };
    datetime: number;
}

interface PriceInfo {
    first?: {
        price?: number;
        top_price?: number;
        bottom_price?: number;
    };
    second?: {
        price?: number;
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