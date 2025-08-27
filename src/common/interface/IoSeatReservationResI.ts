import { SeatReservationStatusEnum } from "../types/api-types";

export interface IoSeatReservationResI {
        status: SeatReservationStatusEnum;
        seatReservationId: number;
        screeningId: number;
      }