"use client";
import { createHydrationStore, HydrationStore } from "@/stores/hydration-store";
import { useStore } from "./useStore";

export const useHydrationStore = <T>(
  selector: (store: HydrationStore) => T
): T | undefined => {
  const result = useStore(createHydrationStore, selector);
  //   if (result === undefined) {
  //     throw new Error(
  //       "useHydrationStore returned undefined. Make sure the provider is set up correctly."
  //     );
  //   }
  return result as T;
};
