import {
  SeatReservation,
  SeatReservationIdDto,
  SeatReservationStatusEnum,
} from "@/common/types/api-types";

interface SeatButtonProps {
  seat: SeatReservation;
  onClick: (seat: SeatReservationIdDto) => void;
  isSelected: boolean;
}
export function SeatButton({ seat, onClick, isSelected }: SeatButtonProps) {
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
      onClick={() => isClickable && onClick({ seatReservationId: seat.id })}
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
