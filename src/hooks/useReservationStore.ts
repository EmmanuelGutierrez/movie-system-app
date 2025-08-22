import {
  createReservationStore,
  ReservationStore,
} from "@/stores/reservation-store";
import { useStore } from "./useStore";

export const useReservationStore = <T>(
  selector: (store: ReservationStore) => T
): T=> {
  const result = useStore(createReservationStore, selector);
  // if (result === undefined) {
  //   throw new Error(
  //     "useReservationStore returned undefined. Make sure the provider is set up correctly."
  //   );
  // }
  return result as T ;
};
