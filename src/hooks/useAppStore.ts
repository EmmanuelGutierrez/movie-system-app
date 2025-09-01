"use client";
import { createAppStore, AppStore } from "@/stores/app-store";
import { useStore } from "./useStore";

export const useAppStore = <T>(
  selector: (store: AppStore) => T
): T | undefined => {
  const result = useStore(createAppStore, selector);
  //   if (result === undefined) {
  //     throw new Error(
  //       "useAppStore returned undefined. Make sure the provider is set up correctly."
  //     );
  //   }
  return result as T;
};
