"use client"

import { useReservationStore } from "@/hooks/useReservationStore";
import { useEffect } from "react";

export function ReservationWatcher() {
  const { status, expireAt, relaseReservation } = useReservationStore(
    (state) => state
  );

  useEffect(() => {
    if (status !== "running" || !expireAt) return;

    const check = () => {
      if (Date.now() >= expireAt) relaseReservation();
    };
    check();
    const id = setInterval(() => {
      check();
    }, 1000);
    return () => clearInterval(id);
  }, [status, expireAt, relaseReservation]);

  return null;
}
