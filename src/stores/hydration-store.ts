import { persist } from "zustand/middleware";
import { create } from "zustand";
import { PERSISTED_STORES } from "@/common/constants/persisted-stores";

export type HydrationState = {
  hasHydrated: boolean;
  hydratedStore: PERSISTED_STORES[];
};

export type HydrationAction = {
//   setHasHydrated: (state: boolean) => void;
  markStoreHydrated: (name: PERSISTED_STORES) => void;
  checkAllStoreHydrated: () => void;
};

export type HydrationStore = HydrationState & HydrationAction;

export const defaultInitState: HydrationState = {
  hasHydrated: false,
  hydratedStore: [],
};



export const createHydrationStore = create<HydrationStore>()(
  persist(
    (set, get) => ({
      ...defaultInitState,
    //   setHasHydrated: (hydrated) => {
    //     set(() => ({ hasHydrated: hydrated }));
    //   },
      markStoreHydrated(name) {
        console.log("NAME",name)
        const { hydratedStore } = get();
        if(hydratedStore.includes(name)){
            console.log("Ya existe este store")
            return
        }
       else {
        const {hydratedStore}=get()
         const newHydratedStore = [...hydratedStore,name]
         set({ hydratedStore: newHydratedStore });
         get().checkAllStoreHydrated();
       }
      },
      checkAllStoreHydrated() {
        const { hydratedStore } = get();
        // console.log("hydrrr",
        //   hydratedStore.size ,Object.values(PERSISTED_STORES).length
        // );
        if (hydratedStore.length === Object.values(PERSISTED_STORES).length) {
          return set({ hasHydrated: true });
        }
      },
    }),
    { name: "hydration-storage" }
  )
);
