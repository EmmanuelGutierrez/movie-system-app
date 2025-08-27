import { SeatReservationStatusEnum } from "../types/api-types";

export interface SeatReservationI {
  id: number;
  status: SeatReservationStatusEnum;
}
