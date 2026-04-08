export interface TicketsInfo {
    adult: number;
    childWithSeat: number;
    childWithoutSeat: number;
}

export interface SeatInfo {
    currentClass: string | null;
    selectedCoaches: string[];
    tickets: TicketsInfo;
    totalTickets: number;
    price: number;
    selectedSeatsCount: number;
    selectedSeats: Record<string, number[]>;
}

export interface SeatsState {
    departure: SeatInfo;
    arrival: SeatInfo | null;
    totalPrice: number;
}