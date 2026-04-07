export interface TicketsInfo {
    adult: number;
    childWithSeat: number;
    childWithoutSeat: number;
}

export interface SeatInfo {
    currentClass: string | null;
    selectedCoaches: string[];
    tickets: TicketsInfo;
    price: number;
    selectedSeatsCount: number;
}

export interface seatsState {
    departure: SeatInfo;
    arrival: SeatInfo | null;
}