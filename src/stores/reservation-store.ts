import { Movie, Screening, SeatReservation } from "@/common/types/api-types";
// import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

type statusTimer = "idle" | "running" | "completed" | "expired";

export type ReservationState = {
  reservation: {
    movie?: Movie;
    seatReservation?: SeatReservation[];
    screening?: Screening;
  };
  status: statusTimer;
  expireAt?: number | null;
  expiredModal: boolean;
  purchaseConfirmed: boolean;
};

export type ReservationAction = {
  setReservation: (reservation: {
    movie: Movie;
    seatReservation: SeatReservation[];
    screening: Screening;
  }) => void;
  clearReservation: () => void;
  timeLeftMs: () => number;
  startTimer: (durationMs: number) => void;
  stopTimer: () => void;
  relaseReservation: () => void;
  acknowledgeExpiredModel: () => void;
  resetPurchaseL: () => void;
};

export type ReservationStore = ReservationState & ReservationAction;

export const defaultInitState: ReservationState = {
  reservation: {},
  status: "idle",
  expiredModal: false,
  purchaseConfirmed: false,
};

export const createReservationStore = create<ReservationStore>()(
  persist(
    (set, get) => ({
      ...defaultInitState,
      setReservation: (reservation) =>
        set(() => ({
          reservation,
        })),
      clearReservation: () => set(() => ({ reservation: {} })),
      timeLeftMs() {
        const { expireAt } = get();
        if (!expireAt) return 0;
        const timeLeft = Math.max(0, expireAt - Date.now());
        return timeLeft;
      },
      relaseReservation: () =>
        set(() => ({
          status: "expired",
          expireAt: null,
          expiredModal: true,
          purchaseConfirmed: false,
        })),
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
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
