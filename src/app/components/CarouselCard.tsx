import { Movie } from "@/common/types/api-types";
import Image from "next/image";

interface CarouselCardProps {
  movie: Movie
}

export const CarouselCard = ({ movie }: CarouselCardProps) => {
  return (
    <div className="flex-none w-1/4 md:w-1/5 lg:w-1/6 px-1">
      {movie.poster && (
        <Image
          src={movie.poster?.secure_url}
          alt={movie.name}
          className="w-full h-auto rounded transition-transform duration-300 hover:scale-110"
          height={800}
          width={800}
        />
      )}
    </div>
  );
};
