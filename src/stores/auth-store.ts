import { User } from "@/common/types/api-types";
// import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { getCookie } from "@/lib/getCookie";
// import { events } from "@/common/constants/events";
import { CHECK_INTERVAL, INACTIVITY_TIMEOUT } from "@/common/constants/timeConstants";


export type AuthState = {
  user: User | undefined;
  loading: boolean;
  hasHydrated: boolean;
  lastActivity: number;
  autoLogoutTimer: NodeJS.Timeout | null;
};

export type AuthAction = {
  setUser: (user: User | undefined) => void;
  login: (user: User) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  isAuth: () => boolean;
  verifyAuth: () => void;
  setHasHydrated: (hydrated: boolean) => void;
  updateActivity: () => void;
  startAutoLogout: () => void;
  stopAutoLogout: () => void;
  checkInactivity: () => void;
};

export type AuthStore = AuthState & AuthAction;

export const defaultInitState: AuthState = {
  user: undefined,
  hasHydrated: false,
  loading: false,
  lastActivity: Date.now(),
  autoLogoutTimer: null,
};

export const createAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...defaultInitState,
      setUser: (user: User | undefined) => set(() => ({ user })),
      login: (user) => {
        set({ user });
        get().startAutoLogout();
      },
      setLoading: (loading: boolean) =>
        set(() => ({
          loading,
        })),
      setHasHydrated: (hydrated) => {
        console.log("HYDAUTH");
        set(() => ({ hasHydrated: hydrated }));
        if (hydrated && get().user) {
          get().startAutoLogout();
        }
      },
      logout() {
        // if (typeof document !== "undefined") {
        //   document.cookie =
        //     "auth_token=; expire=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // }
        // const hanldeActivity = () => {
        //   get().updateActivity();
        // };
        // events.forEach((e) => {
        //   removeEventListener(e, hanldeActivity);
        // });
        get().stopAutoLogout();
        set(() => ({ user: undefined }));
        window.location.href='/main'
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
      updateActivity() {
        console.log("UPDATE ACT");
        const now = Date.now();
        set({ lastActivity: now });
        if (typeof window !== undefined) {
          localStorage.setItem("auth-last-activity", now.toString());
        }
      },
      startAutoLogout() {
        console.log("START AUTO");
        if (typeof window === "undefined") return;
        get().stopAutoLogout();
        get().updateActivity();

        // const hanldeActivity = () => {
        //   get().updateActivity();
        // };
        // //!!Quitarlos al logout
        // events.forEach((e) => {
        //   document.addEventListener(e, hanldeActivity, true);
        // });
        const timer = setInterval(() => {
          get().checkInactivity();
        }, CHECK_INTERVAL);
        set({ autoLogoutTimer: timer });
      },
      stopAutoLogout() {
        const { autoLogoutTimer } = get();
        if (autoLogoutTimer) {
          clearInterval(autoLogoutTimer);
          set({ autoLogoutTimer: null });
        }
      },
      checkInactivity() {
        if (!get().user) return;
        const now = Date.now();
        let lastActivity = get().lastActivity;
        if (typeof window !== "undefined") {
          const storeActivity = localStorage.getItem("auth-last-activity");
          if (storeActivity) {
            const storedTime = parseInt(storeActivity);
            if (storedTime > lastActivity) {
              lastActivity = storedTime;
              set({ lastActivity });
            }
          }
        }
        const timeSinceLastActivity = now - lastActivity;
        console.log(
          "timeSinceLastActivity >= INACTIVITY_TIMEOUT", now , lastActivity,
          timeSinceLastActivity,
          INACTIVITY_TIMEOUT
        );
        if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
          console.log("auto logout");
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
      if (state) {
        state.hasHydrated = true;
      }
      },
    }
  )
);
