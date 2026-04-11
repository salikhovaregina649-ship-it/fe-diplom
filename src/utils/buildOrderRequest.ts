import type { RootState } from "../store/store";
import type { SeatsOrderRequest, DirectionOrderRequest, OrderRequest } from "../store/api/types"; 
import { formatDateOrder } from "../utils/formatTime";

export const buildOrderRequest = (state: RootState): OrderRequest => {
    const { seats, passenger, payment, booking } = state;
    // Превращаем объект { coachId: [1, 2], coachId: [3, 4] } в  [{coachId: 1}, {coachId: 2} ...]
    const flattenSelectedSeats = (selectedSeats: Record<string, number[]>) => {
        const result: { coach_id: string; seat_number: number }[] = [];
        Object.entries(selectedSeats).forEach(([coachId, seatNumbers]) => {
            seatNumbers.forEach((seatNumber) => {
                result.push({ coach_id: coachId, seat_number: seatNumber });
            });
        });
        return result;
    };

    const buildDirection = (
        seatInfo: typeof seats.departure, 
        routeId: string | null | undefined
    ): DirectionOrderRequest | undefined => {
        if (!seatInfo || !routeId) return undefined;

        const availableSeats = flattenSelectedSeats(seatInfo.selectedSeats);
        
        // 1. Делим ТОЛЬКО тех пассажиров, что есть в стейте
        const adults = passenger.passengers.filter(p => p.is_adult);
        const childrenWithSeat = passenger.passengers.filter(p => !p.is_adult); // Это дети С местом

        // 2. Просто берем количество детей без места как число-флаг
        let infantsLeftToAssign = seatInfo.tickets.childWithoutSeat || 0;

        const seatsForRequest: SeatsOrderRequest[] = [];
        let seatIndex = 0;

        // 3. Раздаем места взрослым
        adults.forEach((adult) => {
            if (seatIndex >= availableSeats.length) return;
            const currentSeat = availableSeats[seatIndex];

            // Если есть еще нераздачные "дети без места" — привязываем к этому взрослому
            const hasInfant = infantsLeftToAssign > 0;
            if (hasInfant) infantsLeftToAssign--;

            seatsForRequest.push({
                coach_id: currentSeat.coach_id,
                seat_number: currentSeat.seat_number,
                is_child: hasInfant,
                include_children_seat: hasInfant,
                person_info: {
                    is_adult: true,
                    first_name: adult.first_name,
                    last_name: adult.last_name,
                    patronymic: adult.patronymic,
                    gender: adult.gender,
                    birthday: formatDateOrder(adult.birthday),
                    document_type: adult.document_type,
                    document_data: adult.document_data,
                }
            });
            seatIndex++;
        });

        // 4. Раздаем места детям С МЕСТОМ
        childrenWithSeat.forEach((child) => {
            if (seatIndex >= availableSeats.length) return;
            const currentSeat = availableSeats[seatIndex];

            seatsForRequest.push({
                coach_id: currentSeat.coach_id,
                seat_number: currentSeat.seat_number,
                // ВНИМАНИЕ: в вашем старом коде тут было false. 
                // Если бэкенд ждет, что у ребенка с местом is_child: true, поменяйте на true!
                is_child: false, 
                include_children_seat: false,
                person_info: {
                    is_adult: false,
                    first_name: child.first_name,
                    last_name: child.last_name,
                    patronymic: child.patronymic,
                    gender: child.gender,
                    birthday: formatDateOrder(child.birthday),
                    document_type: child.document_type,
                    document_data: child.document_data,
                }
            });
            seatIndex++;
        });

        return {
            route_direction_id: routeId,
            seats: seatsForRequest,
        };
    };

    return {
        user: {
            first_name: payment.first_name,
            last_name: payment.last_name,
            patronymic: payment.patronymic,
            phone: payment.phone,
            email: payment.email,
            paymentMethod: payment.paymentMethod,
        },
        departure: buildDirection(seats.departure, booking.selectedRouteId ?? undefined)!,
        arrival: seats.arrival 
            ? buildDirection(seats.arrival, booking.selectedRouteId ?? undefined) 
            : undefined,
    };
};
