export interface TicketsInfo {
    adult: number;
    childWithSeat: number;
    childWithoutSeat: number;
}

export interface seatsFormState {
    currentClass: string | null;
    selectedCoaches: string[];
    tickets: TicketsInfo;
}