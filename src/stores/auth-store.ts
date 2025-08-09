import { User } from "@/common/types/api-types";
// import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export type AuthState = {
  user: User | undefined;
  loading: boolean;
};

export type AuthAction = {
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
};

export type AuthStore = AuthState & AuthAction;

export const defaultInitState: AuthState = {
  user: undefined,
  loading: false,
};

export const createAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setUser: (user: User) => set(() => ({ user })),
      setLoading: (loading: boolean) =>
        set(() => ({
          loading,
        })),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => sessionStorage) }
  )
);
