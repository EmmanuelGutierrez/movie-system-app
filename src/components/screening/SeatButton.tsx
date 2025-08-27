import {
  SeatReservation,
  SeatReservationIdDto,
  SeatReservationStatusEnum,
} from "@/common/types/api-types";

interface SeatButtonProps {
  seat: SeatReservation;
  onClick: (seat: SeatReservationIdDto) => void;
  isSelected: boolean;
  isReserved: boolean;
}
export function SeatButton({
  seat,
  onClick,
  isSelected,
  isReserved,
}: SeatButtonProps) {
  const getSeatColor = (status: SeatReservationStatusEnum) => {
    switch (status) {
      case SeatReservationStatusEnum.Available:
        return " hover:bg-colors-primary/20 bg-colors-primary border-colors-primary-accent cursor-pointer";
      // case "selected":
      //   return "bg-blue-500 border-blue-400 cursor-pointer";
      case SeatReservationStatusEnum.Occupied:
        return "bg-gray-600 border-gray-500 cursor-not-allowed";
      case SeatReservationStatusEnum.TemporarilyReserved:
        return "bg-colors-success border-colors-success-light cursor-not-allowed";
      default:
        return "bg-colors-primary-clear  border-colors-primary-accent";
    }
  };

  const isClickable = seat.status === "available" && !isReserved;
  // console.log('isReserved',seat.id,isReserved)

  return (
    <button
      onClick={() => isClickable && onClick({ seatReservationId: seat.id })}
      disabled={seat.status === "occupied"}
      className={`
        w-10 h-10 rounded border-2 transition-all duration-200 text-xs font-semibold text-white
        ${isSelected && !isReserved ? "bg-blue-500 border-blue-400 cursor-pointer" : isReserved ? getSeatColor(SeatReservationStatusEnum.TemporarilyReserved) : getSeatColor(seat.status)}
        ${isClickable ? "transform hover:scale-105" : ""}
        flex items-center justify-center
      `}
    >
      {isSelected ? seat.id : ""}
    </button>
  );
}
