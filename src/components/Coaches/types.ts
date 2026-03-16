import type React from "react";
import type { CoachWithSeats, Seat } from "../../types/typeSeat";

export interface CoachProps {
    children: React.ReactNode;
    className?: string;
    coach: CoachWithSeats;
}

export interface CoachClassProps {
    coach: CoachWithSeats;
    onSeatSelect?: (seatIndex: number) => void;
    selectedSeats?: number[];
}

export interface PairSeatCellProps {
    topSeat: Seat | null;
    bottomSeat: Seat | null;
    selectedSeats?: number[];
    onSeatClick: (index: number, available: boolean) => void;
    className?: string;
}

export interface SingleSeatCellProps {
    seat: Seat;
    selectedSeats?: number[];
    onSeatClick: (index: number, available: boolean) => void;
    className?: string;
}