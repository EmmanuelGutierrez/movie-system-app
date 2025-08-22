import { SeatReservation, SeatReservationIdDto } from "@/common/types/api-types";
import { SeatButton } from "../../components/screening/SeatButton";

interface SeatRowProps {
  row: number;
  seats: SeatReservation[];
  onSeatClick: (seat: SeatReservationIdDto) => void;
  selectedSeats: SeatReservationIdDto[];
}

export function SeatRow({ row, seats, onSeatClick, selectedSeats }: SeatRowProps) {
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
            isSelected={selectedSeats.some(s=>s.seatReservationId===seat.id)}
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