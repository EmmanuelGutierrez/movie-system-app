"use client";

import { createAuthStore } from "@/stores/auth-store";
import { createReservationStore } from "@/stores/reservation-store";
import { FC, ReactNode } from "react";

export const HydrationLoader: FC<{ children: ReactNode }> = ({ children }) => {
  const isHydratedAuth = createAuthStore((state) => state.hasHydrated);
  const isHydratedRes = createReservationStore((state) => state.hasHydrated);
  if (!isHydratedAuth||!isHydratedRes) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="pb-3 w-30 h-30 border-4 border-gray-600 border-t-white rounded-full animate-spin flex justify-center items-center text-center">
            <div className="text-6xl text-center text-amber-600">🎬</div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
