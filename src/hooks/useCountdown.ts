import { useEffect, useMemo, useState } from "react";
import { createReservationStore } from "@/stores/reservation-store";
import { TIME_RESERVATION } from "@/common/constants/timeConstants";

export function useCountdown(tickMs=250) {
  const { status, expireAt, timeLeftMs } = createReservationStore(
    (store) => store
  );

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (status !== "running" || !expireAt) {
      return;
    }
    const id = setInterval(() => {
       setNow(Date.now());
    }, tickMs);
    return ()=>clearInterval(id);
  }, [status, expireAt, tickMs]);

  const msLeft = useMemo(() => {
    if (status !== "running" || !expireAt) return 0;
    return Math.max(0, expireAt - now);
  }, [expireAt, status, now]);
  const effectiveMsLeft =
    status === "running" ? Math.min(msLeft, timeLeftMs()) : 0;
  console.log("Efective",effectiveMsLeft)
  const total = TIME_RESERVATION; // 5min
  const seconds = Math.floor((effectiveMsLeft / 1000) % 60);
  const minutes = Math.floor(effectiveMsLeft / 1000/ 60);
  const progress = 1 - effectiveMsLeft / total;
  return { seconds, minutes, progress, msLeft: effectiveMsLeft };
}
