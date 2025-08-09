"use client";

import {
  SeatReservation,
} from "@/common/types/api-types";
import { SeatRow } from "@/components/screening/SeatRow";
import { Button } from "@/components/ui/button";
import { client } from "@/service/client";
import { useEffect, useState } from "react";

export default function CinemaSeatingSystem() {
  const [seats, setSeats] = useState<SeatReservation[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const getSeats = async () => {
    const data = await client.screening.screeningControllerFindOneSeat(3);
    setSeats(data.data);
  };

  useEffect(() => {
    getSeats();
  }, []);

  const handleSeatClick = (seatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Sistema de Reserva de Asientos
        </h1>

        {/* Pantalla */}
        <div className="text-center mb-12">
          <div className="text-white text-2xl font-bold mb-6">SCREEN</div>
          <div className="relative mx-auto w-96 h-8 mb-8">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-600 rounded-t-full transform perspective-1000 rotateX-12 shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-700 rounded-t-full transform translate-y-1 shadow-inner"></div>
          </div>
        </div>

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
          {Array.from(new Set(seats.map((seat) => seat.seat.row)))
            .sort()
            .map((row) => (
              <SeatRow
                selectedSeats={selectedSeats}
                key={row}
                row={row}
                seats={seats.filter((seat) => seat.seat.row === row)}
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
              {selectedSeats.map((id) => (
                <span
                  key={id}
                  className="bg-blue-300 text-blue-900 px-2 py-1 rounded text-sm font-semibold"
                >
                  {id}
                </span>
              ))}
            </div>
            <div className="mt-3 flex justify-center">
              <Button className=" bg-green-600 hover:bg-green-700">
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
