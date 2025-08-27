"use client";
import Image from "next/image";
import CinemaBg from "../../media/img/cinema-bg.jpg";
import { Badge } from "../ui/badge";
import { getFullDay, getHour } from "@/lib/dateFormat";
import { useRouter } from "next/navigation";
import { useCountdown } from "@/hooks/useCountdown";
import { Movie, Screening, SeatReserveDto } from "@/common/types/api-types";
const pad = (n: number) => n.toString().padStart(2, "0");
export const HeaderCheckout = ({reservation}: {
  reservation: {
    movie: Movie;
    seatReservation: SeatReserveDto;
    screening: Screening;
  };
}) => {
  const { minutes, seconds } = useCountdown(250);
  const router = useRouter();
  if (!reservation) {
    router.push("main");
  }
  return (
    <section className={``}>
      <Image
        src={CinemaBg}
        alt="cinema"
        className="object-cover opacity-20 h-80 "
      />
      {reservation && (
        <div className=" w-full h-28 bg-colors-primary-hard border-t border-b border-colors-primary-light flex flex-col justify-center items-center md:grid md:grid-cols-6 ">
          <div className="flex items-center gap-2 md:col-span-2 md:col-start-3 mx-auto">
            <p className="font-light text-xl">
              {getFullDay(new Date(reservation.screening.startTime * 1000))}
            </p>
            <Badge className="text-xl bg-gradient-to-r from-colors-primary-light to colors-primary border-0 px-4 py-2">
              {getHour(new Date(reservation.screening.startTime * 1000))}
            </Badge>
          </div>
          <div className="md:col-span-1 md:col-start-6 mx-auto flex flex-col items-center">
            <p>Quedan</p>
            <p>{`${pad(minutes)}:${pad(seconds)}`}</p>
          </div>
        </div>
      )}
    </section>
  );
};
