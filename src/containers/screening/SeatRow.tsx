import { SeatReservation, SeatReservationIdDto } from "@/common/types/api-types";
import { SeatButton } from "../../components/screening/SeatButton";
import { SeatReservationI } from "@/common/interface/SeatReservationI";

interface SeatRowProps {
  row: number;
  seats: SeatReservation[];
  onSeatClick: (seat: SeatReservationIdDto) => void;
  selectedSeats: SeatReservationIdDto[];
  reservedSeats: SeatReservationI[];
}

export function SeatRow({ row, seats, onSeatClick, selectedSeats,reservedSeats }: SeatRowProps) {
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
            isReserved={reservedSeats.some(rs=>rs.id===seat.id)}
            isSelected={selectedSeats.some(
              (s) => s.seatReservationId === seat.id
            )}
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