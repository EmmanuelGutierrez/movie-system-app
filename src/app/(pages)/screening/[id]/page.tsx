"use client";

import { Screening, SeatReservationIdDto } from "@/common/types/api-types";
import { SeatRow } from "@/containers/screening/SeatRow";
import { Button } from "@/components/ui/button";
import { client } from "@/service/client";
import { useEffect, useState } from "react";
import { HeaderScreening } from "@/components/screening/HeaderScreening";
// import { withHydration } from "@/hoc/hydration-boundary";
import { createAuthStore } from "@/stores/auth-store";
import { createReservationStore } from "@/stores/reservation-store";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";

export default function CinemaSeatingSystem() {
  const router = useRouter();
  const [screening, setScreening] = useState<Screening | undefined>();
  const { user } = createAuthStore((state) => state);
  const { setReservation, reservation, startTimer } = createReservationStore(
    (state) => state
  );
  const [selectedSeats, setSelectedSeats] = useState<SeatReservationIdDto[]>(
    reservation ? reservation.seatReservation.seatReserve : []
  );
  useEffect(() => {}, []);
  const getSeats = async () => {
    const data = await client.screening.screeningControllerFindOne(3);
    setScreening(data.data);
  };

  useEffect(() => {
    getSeats();
  }, []);

  useEffect(() => {
    console.log(reservation);
  }, [reservation]);

  // if (!reservationStore || !authStore || !authStore.user) {
  //   return (
  //     <>
  //       <div className="min-h-screen">
  //         <div className="max-w-6xl mx-auto">
  //           {/* Título */}
  //           <HeaderScreening />
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
  const handleSeatClick = (seatReservation: SeatReservationIdDto) => {
    setSelectedSeats((prev) =>
      prev.some(
        (s) => s.seatReservationId === seatReservation.seatReservationId
      )
        ? prev.filter(
            (ps) => ps.seatReservationId !== seatReservation.seatReservationId
          )
        : [...prev, seatReservation]
    );
  };

  // const { setReservation, reservation } = reservationStore;

  const handleReservation = () => {
    if (screening && user) {
      setReservation({
        movie: screening.movie,
        screening: screening,
        seatReservation: {
          screeningId: screening.id,
          seatReserve: selectedSeats,
          temporalTransactionId: `${user.id}-${screening.id}-${Date.now()}`,
        },
      });
      startTimer(5 * 60 * 1000);//5 minutos
      // redirect("/checkout")
      router.push("/checkout");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <HeaderScreening />

        {/* Resto de asientos */}
        <div className="space-y-4 mb-12">
          {/* {["E", "D", "C", "B", "A"].map((row) => (
            <SeatRow
              key={row}
              row={row}
              seats={seats.filter((seat) => seat.row === row)}
              onSeatClick={handleSeatClick}
            />
          ))} */}
          {screening &&
            Array.from(
              new Set(
                screening?.seatReservations.map((seat) => {
                  console.log(seat);
                  return seat.seat.row;
                })
              )
            )
              .sort()
              .map((row) => (
                <SeatRow
                  selectedSeats={selectedSeats}
                  key={row}
                  row={row}
                  seats={screening.seatReservations.filter(
                    (seat) => seat.seat.row === row
                  )}
                  onSeatClick={handleSeatClick}
                />
              ))}
        </div>

        {/* Leyenda */}
        <div className="flex justify-center gap-8 text-white text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-800 border border-blue-600 rounded"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 border border-blue-400 rounded"></div>
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-600 border border-gray-500 rounded"></div>
            <span>Ocupado</span>
          </div>
        </div>
        {selectedSeats.length > 0 && (
          <div className="bg-blue-800 rounded-lg p-4 mb-6 custom-container-md mt-10">
            <h3 className="font-semibold mb-2">Asientos seleccionados:</h3>
            <div className="flex gap-2 flex-wrap">
              {selectedSeats.map((s) => (
                <span
                  key={s.seatReservationId}
                  className="bg-blue-300 text-blue-900 px-2 py-1 rounded text-sm font-semibold"
                >
                  {s.seatReservationId}
                </span>
              ))}
            </div>
            <div className="mt-3 flex justify-center">
              <Button
                onClick={handleReservation}
                className=" bg-green-600 hover:bg-green-700"
              >
                Confirmar selección ({selectedSeats.length} asiento
                {selectedSeats.length !== 1 ? "s" : ""})
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// export default withHydration(CinemaSeatingSystem);
