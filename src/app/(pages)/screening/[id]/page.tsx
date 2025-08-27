"use client";

import {
  Screening,
  SeatReservationIdDto,
  SeatReservationStatusEnum,
} from "@/common/types/api-types";
import { SeatRow } from "@/containers/screening/SeatRow";
import { Button } from "@/components/ui/button";
import { client } from "@/service/client";
import { useEffect, useState } from "react";
import { HeaderScreening } from "@/components/screening/HeaderScreening";
// import { withHydration } from "@/hoc/hydration-boundary";
import { createAuthStore } from "@/stores/auth-store";
import { createReservationStore } from "@/stores/reservation-store";
import { useParams, useRouter } from "next/navigation";
import { TIME_RESERVATION } from "@/common/constants/timeConstants";
import { useSocket } from "@/hooks/useSocket";
import { SeatReservationI } from "@/common/interface/SeatReservationI";
import { IoSeatReservationResI } from "@/common/interface/IoSeatReservationResI";
// import { toast } from "sonner";
// import { redirect } from "next/navigation";

export default function CinemaSeatingSystem() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [screening, setScreening] = useState<Screening | undefined>();
  const [reservedSeats, setReservedSeats] = useState<SeatReservationI[]>([]);
  const { user } = createAuthStore((state) => state);
  const { setReservation, reservation, startTimer } = createReservationStore(
    (state) => state
  );
  const [selectedSeats, setSelectedSeats] = useState<SeatReservationIdDto[]>(
    reservation ? reservation.seatReservation.seatReserve : []
  );
  const protocol = window.location.protocol === "https" ? "wss" : "ws";
  // const backUrl =
  //   process.env["BACKEND_URL"] ?? process.env["NEXT_PUBLIC_BACKEND_URL"];
  const { connected, socket } = useSocket(
    `${protocol}://localhost:81/screening`
  );
  useEffect(() => {
    if (!socket || !connected) return;
    socket.emit("joinScreening", [`${id}`]);
    socket.on("joinScreening", (msgs: IoSeatReservationResI[]) => {
      setSelectedSeats((prev) => {
        const newState = prev.filter((p) =>
          !msgs.some((msg) => msg.seatReservationId === p.seatReservationId)
        );
        return newState;
      });
      setReservedSeats((prev) => {
        let newState = [...prev];
        msgs.forEach((m) => {
          if (m.status === SeatReservationStatusEnum.TemporarilyReserved) {
            newState = [
              ...newState,
              { id: m.seatReservationId, status: m.status },
            ];
          } else {
            newState = newState.filter((p) => p.id !== m.seatReservationId);
          }
        });
        return newState;
      });
      setScreening((prev) => {
        if (!prev) return prev;
        const updatedSeats = prev.seatReservations.map((sr) => {
          const match = msgs.find(
            (msg) =>
              msg.seatReservationId === sr.id &&
              msg.status === SeatReservationStatusEnum.Occupied
          );
          console.log("match", match);
          return match
            ? { ...sr, status: SeatReservationStatusEnum.Occupied }
            : sr;
        });
        console.log("NUEVO", { ...prev, seatReservations: updatedSeats });
        return { ...prev, seatReservations: updatedSeats };
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, id, socket]);
  // console.log("SCREENING",screening)
  const getSeats = async (id: number) => {
    const data = await client.screening.screeningControllerFindOne(id);
    const reservedSeatsData =
      await client.screening.screeningControllerGetTemporarilyReserveSeat(id);
    // console.log("DATA", data);
    setScreening(data.data);
    setReservedSeats(reservedSeatsData.data);
  };

  useEffect(() => {
    getSeats(parseInt(id));
  }, [id]);

  // useEffect(() => {
  //   console.log(reservation);
  // }, [reservation]);

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
      startTimer(TIME_RESERVATION); //5 minutos
      // redirect("/checkout")
      // toast("TEST",{description:"DESC"})
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
                  return seat.seat.row;
                })
              )
            )
              .sort()
              .map((row) => (
                <SeatRow
                  selectedSeats={selectedSeats}
                  reservedSeats={reservedSeats}
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
            <div className="w-6 h-6 bg-colors-primary border border-colors-primary-accent rounded"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-colors-primary-clear border border-colors-primary-accent rounded"></div>
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-600 border border-gray-500 rounded"></div>
            <span>Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-colors-success border border-colors-success-light rounded"></div>
            <span>Temp. Reservado</span>
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
