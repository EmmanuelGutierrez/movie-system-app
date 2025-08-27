'use client'
import { createReservationStore } from "@/stores/reservation-store";
import { BellRing } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function RservationWatcher() {
  const { status, expireAt, relaseReservation } = createReservationStore(
    (state) => state
  );
  useEffect(() => {
    if (status !== "running" || !expireAt) return;
    const chek = () => {
      const time = (expireAt - Date.now()) / 1000;
      console.log("Timer check", time/60 ,time%60);
       console.log("PRE RELASE ",Date.now() , expireAt,Date.now() >= expireAt);
      if (Date.now() >= expireAt) {
         toast("Tiempo excedido", {
           description: "Se le redireccionara a la vista principal",
           duration: 8000,
           position: "bottom-center",
           action: { label: "Cerrar", onClick: () => console.log("cerrar") },
           icon:<BellRing/>
         });
        relaseReservation();
      }
    };
    chek();
    const id = setInterval(() => {
      chek();
    }, 1000);
    return () => clearInterval(id);
  }, [status, expireAt, relaseReservation]);
  return null
}
