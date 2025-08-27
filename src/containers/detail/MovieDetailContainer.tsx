import { Calendar, Clock } from "lucide-react";
import { DetailList } from "../../components/detail/DetailList";
import { timestampToDate } from "@/common/utils/timestampToDate";
import Image from "next/image";
import { Movie, Screening } from "@/common/types/api-types";

import NoImage from "../../media/img/no-picture-available-icon-0.jpg";

export const MovieDetailContainer = ({
  movie,screenings
}: {
  movie: Movie;
  screenings: Screening[];
}) => {
  return (
    <section className=" text-white font-medium mb-10">
      <div className="-mb-40 -z-100 w-full h-90 bg-cover relative before:absolute  before:w-full before:h-full before:bg-linear-to-t before:from-colors-primary-hard before:via-colors-primary-hard/60 before:to-colors-primary-hard mask-b-from-85%   ">
        <Image
          src={movie.poster?.secure_url ?? NoImage}
          alt={"movie.name"}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-300"
          height={800}
          width={1000}
        />
      </div>
      <div className="">
        <div className=" custom-container  h-48 flex">
          <div className="lg:ml-8 space-y-4 text-colors-primary-clear px-4">
            <h3 className="text-4xl font-bold text-white">{movie.name}</h3>
            {/* <p>{movie.genres.map((g) => g.name).join(", ")}</p> */}
            <div className="flex">
              {movie.genres.map((g) => (
                <div
                  className="border border-solid border-colors-primary-hard rounded-xl py-2 px-4 mr-4 "
                  key={g.id}
                >
                  <p className="text-center">{g.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:grid md:grid-cols-4 custom-container ">
          <div className=" flex flex-col gap-y-10">
            <Image
              src={movie.poster?.secure_url ?? NoImage}
              alt={"movie.name"}
              className="hidden shadow-2xl/30 lg:block w-full h-120 -mt-2 object-cover rounded-md group-hover:scale-110 transition-transform duration-300"
              height={800}
              width={1000}
            />
            <div className="border-colors-primary-clear border-2 rounded-xl py-4 px-2 ">
              <div className="px-2 space-y-5 w-full flex flex-col ">
                <div className="space-y-2">
                  <p className="font-light">Genero:</p>
                  <div className="flex">
                    {movie.genres.map((g) => (
                      <div
                        className="border border-solid border-colors-primary-hard rounded-xl py-2 px-4 mr-4 "
                        key={g.id}
                      >
                        <p className="text-center font-bold">{g.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar />
                  <div className="ml-2 text-center">
                    <p className="font-light">Lanzamiento:</p>
                    <p className="font-bold">
                      {timestampToDate(movie.release)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock />
                  <div className="ml-2 text-center">
                    <p className="font-light">Duracion:</p>
                    <p className="font-bold">{movie.duration} min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-55 col-span-3 px-10 flex flex-col gap-y-10 ">
            <DetailList movie={movie} screenings={screenings} />
          </div>
        </div>
      </div>
    </section>
  );
};
