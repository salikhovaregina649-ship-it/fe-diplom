// Тип для одного места в вагоне
export interface Seat {
  index: number;
  available: boolean;
}

// Тип для информации о вагоне
export interface Coach {
  _id: string;
  name: string;
  class_type: string;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
  is_linens_included: boolean;
  available_seats: number;
  train: string; // id поезда
}

// Тип для объекта в массиве
export interface CoachWithSeats {
  coach: Coach;
  seats: Seat[];
}

// Тип для всего массива
export type CoachesData = CoachWithSeats[];