import { Movie, Screening, SeatReserveDto } from "@/common/types/api-types";
// import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { client } from "@/service/client";
type statusTimer = "idle" | "running" | "completed" | "expired";

export type ReservationState = {
  reservation?: {
    movie: Movie;
    seatReservation: SeatReserveDto;
    screening: Screening;
  };
  status: statusTimer;
  expireAt?: number | null;
  expiredModal: boolean;
  purchaseConfirmed: boolean;
  hasHydrated: boolean;
};

export type ReservationAction = {
  setReservation: (
    reservation:
      | {
          movie: Movie;
          seatReservation: SeatReserveDto;
          screening: Screening;
        }
      | undefined
  ) => void;
  clearReservation: () => void;
  timeLeftMs: () => number;
  startTimer: (durationMs: number) => void;
  stopTimer: () => void;
  relaseReservation: () => void;
  acknowledgeExpiredModel: () => void;
  resetPurchaseL: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export type ReservationStore = ReservationState & ReservationAction;

export const defaultInitState: ReservationState = {
  reservation: undefined,
  status: "idle",
  expiredModal: false,
  purchaseConfirmed: false,
  hasHydrated: false,
};

export const createReservationStore = create<ReservationStore>()(
  persist(
    (set, get) => ({
      ...defaultInitState,
      setHasHydrated: (hasHydrated) => {
        console.log("HYDRES");
        set(() => ({ hasHydrated }));
      },
      setReservation: async (reservation) => {
        if (reservation) {
          await client.screening.screeningControllerTempReserveSeat(
            reservation.seatReservation
          );
        }
        return set(() => {
          return { reservation };
        });
      },
      clearReservation: () => set(() => ({ reservation: undefined })),
      timeLeftMs() {
        const { expireAt } = get();
        if (!expireAt) return 0;
        const timeLeft = Math.max(0, expireAt - Date.now());
        return timeLeft;
      },
      relaseReservation: () => {
        set(() => ({
          status: "expired",
          expireAt: null,
          expiredModal: true,
          purchaseConfirmed: false,
          reservation: undefined,
        }));
      },
      startTimer: (durationMs) =>
        set((state) => {
          if (
            state.status === "running" &&
            state.expireAt &&
            state.expireAt > Date.now()
          ) {
            return {};
          }
          return {
            status: "running",
            expireAt: Date.now() + durationMs,
            expiredModal: false,
            purchaseConfirmed: false,
          };
        }),
      stopTimer() {
        return set(() => {
          return {
            status: "completed",
            expireAt: null,
          };
        });
      },
      acknowledgeExpiredModel() {
        return set(() => {
          return { expiredModal: false };
        });
      },
      resetPurchaseL() {
        return set(() => {
          return {
            purchaseConfirmed: false,
          };
        });
      },
    }),

    {
      name: "reservation-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
