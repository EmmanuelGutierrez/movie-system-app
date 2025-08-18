import { createAuthStore, AuthStore } from "@/stores/auth-store";
import { useStore } from "./useStore";

export const useAuthStore = <T>(selector: (store: AuthStore) => T): T => {
  const result = useStore(createAuthStore, selector);
  //   if (result === undefined) {
  //     throw new Error(
  //       "useAppStore returned undefined. Make sure the provider is set up correctly."
  //     );
  //   }
  return result as T;
};
