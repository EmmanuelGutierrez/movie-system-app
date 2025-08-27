import { persist,  } from "zustand/middleware";
import { create } from "zustand";

export type AppState = {
  showLoginForm: boolean;
};

export type AppAction = {
  toggleShowLoginForm: () => void;
};

export type AppStore = AppState & AppAction;

export const defaultInitState: AppState = {
  showLoginForm: false,
};

export const createAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      toggleShowLoginForm: () =>
        set((state) => ({ showLoginForm: !state.showLoginForm })),
    }),
    { name: "app-storage" }
  )
);
