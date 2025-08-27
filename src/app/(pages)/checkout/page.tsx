"use client";
import { HeaderCheckout } from "@/components/checkout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFullDay, getHour } from "@/lib/dateFormat";
import { createReservationStore } from "@/stores/reservation-store";
import { AlertTriangle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { reservation } = createReservationStore((state) => state);
  const [time, setTime] = useState(5);
  const router = useRouter();
  useEffect(() => {
    if (time === 0) {
      router.push("/main");
    }
    if (!reservation) {
      const id = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [reservation, router, time]);
  const totalPrice = reservation
    ? reservation.seatReservation.seatReserve.length *
      reservation.screening.price
    : 0;
  return (
    <main>
      {reservation ? (
        <>
          <HeaderCheckout reservation={reservation} />
          <section
            className=" custom-container my-32 relative flex flex-col bg-colors-primary-dark w-100 mx-auto border border-colors-primary-clear/60
                         [&_h6]:text-2xl"
          >
            <div
              className=" px-10 py-7
        before:rounded-full before:absolute before:w-14 before:h-14 before:bg-colors-primary-hard before:top-64 before:-left-6
        after:rounded-full after:absolute after:w-14 after:h-14 after:bg-colors-primary-hard after:top-64 after:-right-6
        [&_h6]:justify-between [&_h6]:flex [&_h6]:w-full
        [&_div]:justify-between [&_div]:flex [&_div]:w-full [&_div]:font-light [&_div]:text-lg 
        [&_li]:flex [&_li]:flex-col [&_li]:justify-between [&_li]:items-end [&_li]:mb-5"
            >
              <h2 className="text-center text-3xl font-light border-b border-dashed border-colors-primary-clear/60 pb-7 mb-5">
                Funcion
              </h2>
              <ul className="gap-3">
                <li>
                  <h6>{reservation.movie.name}</h6>
                  <div>
                    <span>{reservation.movie.language}</span>
                  </div>
                </li>
                <li className="border-b border-dashed border-colors-primary-clear/60 pb-8">
                  <h6>
                    <span>{reservation.screening.theater.cinema.name}</span>
                    <span>
                      {reservation.seatReservation.seatReserve.length}
                    </span>
                  </h6>
                  <div>
                    <span>
                      {getFullDay(
                        new Date(reservation.screening.startTime * 1000)
                      )}
                      ,
                      {getHour(
                        new Date(reservation.screening.startTime * 1000)
                      )}
                    </span>
                    <span>Tickets</span>
                  </div>
                </li>
                <li>
                  <h6>
                    <span>Precio total de tickets</span>
                    <span>{totalPrice}</span>
                  </h6>
                </li>
                <li>
                  <div>
                    <span>Impuestos</span>
                    <span>21</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="border-t border-dashed border-t-colors-primary-light px-10 py-7 flex justify-between ">
              <h6>Total:</h6>
              <h6>{totalPrice * 1.21}</h6>
            </div>
            <Button className="mx-auto mb-7">Comprar</Button>
          </section>
        </>
      ) : (
        <Card className="w-full max-w-md mx-auto text-white">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-colors-danger-light/30 border-colors-danger border rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-colors-danger" />
            </div>
            <CardTitle className="text-xl font-semibold ">
              Reservación Expirada
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 text-center">
            <div className="space-y-2">
              <p className="">
                Tu reservación de asientos ha expirado debido a inactividad.
              </p>
              <p className="text-sm font-light">
                Los asientos seleccionados han sido liberados para otros
                usuarios.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm ">
              <Clock className="w-4 h-4" />
              <span>
                Redirigiendo en {time} segundo{time !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-3">
              <Button onClick={() => router.push("/main")} className="w-full bg-colors-primary-hard hover:bg-colors-primary-hard/60">
                Volver al Inicio
              </Button>

            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
