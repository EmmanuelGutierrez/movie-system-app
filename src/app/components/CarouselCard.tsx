import { Movie } from "@/common/types/api-types";
import Image from "next/image";
import NoImage from '../../media/img/no-picture-available-icon-0.jpg'

interface CarouselCardProps {
  movie: Movie;
}

export const CarouselCard = ({ movie }: CarouselCardProps) => {
  // console.log(movie)
  return (
    <div className=" group overflow-hidden h-110 rounded-lg w-full xl:h-120 border border-colors-primary-hard transition-transform duration-300 ">
      <div className="relative h-3/4  overflow-hidden">
        <Image
          src={movie.poster ? movie.poster?.secure_url : NoImage}
          alt={movie.name}
          className="w-auto object-cover h-full rounded group-hover:scale-110 transition-transform duration-300"
          height={800}
          width={1000}
        />
      </div>
      <div className="p-4 max-w-full overflow-hidden">
        <h3 className="mb-3 text-xl font-bold text-white group-hover:text-colors-primary-clear transition-all ease-in delay-75 line-clamp-1">
          {movie.name}
        </h3>
        <p className="mb-3 text-sm font-normal text-white line-clamp-2">
          {movie.description}
        </p>
      </div>
    </div>
  );
};
