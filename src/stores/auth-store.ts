import { User } from "@/common/types/api-types";
// import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { getCookie } from "@/lib/getCookie";

export type AuthState = {
  user: User | undefined;
  loading: boolean;
  hasHydrated: boolean;
};

export type AuthAction = {
  setUser: (user: User | undefined) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  isAuth: () => boolean;
  verifyAuth: () => void;
  setHasHydrated: (hydrated: boolean) => void;
};

export type AuthStore = AuthState & AuthAction;

export const defaultInitState: AuthState = {
  user: undefined,
  hasHydrated: false,
  loading: false,
};

export const createAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...defaultInitState,
      setUser: (user: User | undefined) => set(() => ({ user })),
      setLoading: (loading: boolean) =>
        set(() => ({
          loading,
        })),
      setHasHydrated: (hydrated) => set(() => ({ hasHydrated: hydrated })),
      logout() {
        if (typeof document !== "undefined") {
          document.cookie =
            "auth_token=; expire=Thu, 01 Jan 1970 00:00:00 UTC;";
        }
        return set(() => ({ user: undefined }));
      },
      isAuth() {
        const authToken = getCookie("auth_token");
        return !!authToken && authToken !== "";
      },
      verifyAuth: () => {
        const store = get();
        const isAuth = store.isAuth();
        if (!isAuth) {
          store.logout();
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
