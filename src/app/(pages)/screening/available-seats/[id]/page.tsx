"use client";

import {
  SeatReservation,
  SeatReservationStatusEnum,
} from "@/common/types/api-types";
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
            <div className="w-6 h-6 bg-green-500 border border-green-400 rounded"></div>
            <span>Premium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-600 border border-gray-500 rounded"></div>
            <span>Ocupado</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SeatRowProps {
  row: number;
  seats: SeatReservation[];
  onSeatClick: (seatId: number) => void;
  selectedSeats: number[];
}

function SeatRow({ row, seats, onSeatClick, selectedSeats }: SeatRowProps) {
  const sortedSeats = [...seats].sort((a, b) => a.seat.number - b.seat.number);

  const getSeatLayout = () => {
    const layout = [];

    layout.push(
      <div key="group1" className="flex gap-1">
        {sortedSeats.map((seat) => (
          <SeatButton
            key={seat.id}
            seat={seat}
            onClick={onSeatClick}
            isSelected={selectedSeats.includes(seat.id)}
          />
        ))}
      </div>
    );

    // Espacio para pasillo
    layout.push(<div key="aisle1" className="w-8" />);

    return layout;
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="w-8 text-center font-bold text-lg text-white">{row}</div>
      <div className="flex items-center gap-2">{getSeatLayout()}</div>
      <div className="w-8 text-center font-bold text-lg text-white">{row}</div>
    </div>
  );
}

interface SeatButtonProps {
  seat: SeatReservation;
  onClick: (seatId: number) => void;
  isSelected: boolean;
}

function SeatButton({ seat, onClick, isSelected }: SeatButtonProps) {
  const getSeatColor = (status: SeatReservationStatusEnum) => {
    switch (status) {
      case SeatReservationStatusEnum.Available:
        return "bg-blue-800 hover:bg-blue-700 border-blue-600 cursor-pointer";
      // case "selected":
      //   return "bg-blue-500 border-blue-400 cursor-pointer";
      case SeatReservationStatusEnum.Occupied:
        return "bg-gray-600 border-gray-500 cursor-not-allowed";
      case SeatReservationStatusEnum.TemporarilyReserved:
        return "bg-green-500 hover:bg-green-400 border-green-400 cursor-pointer";
      default:
        return "bg-blue-800 border-blue-600";
    }
  };

  const isClickable = seat.status === "available";

  return (
    <button
      onClick={() => isClickable && onClick(seat.id)}
      disabled={seat.status === "occupied"}
      className={`
        w-10 h-10 rounded border-2 transition-all duration-200 text-xs font-semibold text-white
        ${isSelected ? "bg-blue-500 border-blue-400 cursor-pointer" : getSeatColor(seat.status)}
        ${isClickable ? "transform hover:scale-105" : ""}
        flex items-center justify-center
      `}
    >
      {isSelected ? seat.id : ""}
    </button>
  );
}
