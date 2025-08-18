"use client";
import { useAuthStore } from "@/hooks/useAuthStore";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
} from "react";

interface HydrationContextType {
  isHydrated: boolean;
}

const HydrationContext = createContext<HydrationContextType>({
  isHydrated: false,
});

export const HydrationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const isHydrated = useAuthStore((state) => state.hasHydrated);
  if (!isHydrated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <HydrationContext.Provider value={{ isHydrated }}>
      {children}
    </HydrationContext.Provider>
  );
};
export const useHydration = () => useContext(HydrationContext);
