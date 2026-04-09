export interface City {
    _id: string;
    name: string;
}

export interface SearchState {
    from: {
        value: string;
        selectedCity: City | null;
    };
    to: {
        value: string;
        selectedCity: City | null;
    };
    dateForth: string | null;
    dateBack: string | null;
}