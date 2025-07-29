import { Movie } from "@/common/types/api-types";
import { PersonList } from "./PersonList";
import ImageCarousel from "./ImageCarousel";

export const DetailList = ({ movie }: { movie: Movie }) => {
  return (
    <>
      <div className="">
        <div className="border-t-1 border-b-1 border-colors-primary-light my-8 py-4 relative before:absolute before:-top-0.5 before:left-0 before:w-50 before:h-1 before:bg-colors-primary-clear after:absolute after:-bottom-0.5 after:left-0 after:w-50 after:h-1 after:bg-colors-primary-clear">
          <h3 className="text-4xl font-bold ml-4">Sinopsis</h3>
        </div>
        <p>{movie.description}</p>
      </div>
      <div className="">
        <div className="border-t-1 border-b-1 border-colors-primary-light my-8 py-4 relative before:absolute before:-top-0.5 before:left-0 before:w-50 before:h-1 before:bg-colors-primary-clear after:absolute after:-bottom-0.5 after:left-0 after:w-50 after:h-1 after:bg-colors-primary-clear">
          <h3 className="text-4xl font-bold ml-4">Trailer</h3>
        </div>
        <iframe
          width="1120"
          height="630"
          className="max-h-96 max-w-200 w-full rounded-2xl self-center"
          src={`https://www.youtube.com/embed/${movie.trailer_youtube_id}?si=iLCKfX9CArXFSaPP`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="">
        <div className="border-t-1 border-b-1 border-colors-primary-light my-8 py-4 relative before:absolute before:-top-0.5 before:left-0 before:w-50 before:h-1 before:bg-colors-primary-clear after:absolute after:-bottom-0.5 after:left-0 after:w-50 after:h-1 after:bg-colors-primary-clear">
          <h3 className="text-4xl font-bold ml-4">Cast</h3>
        </div>
        {movie.directors ? (
          <PersonList title="Directores" data={movie.directors} />
        ) : (
          <></>
        )}
        {movie.actors ? <PersonList title="Cast" data={movie.actors} /> : <></>}
      </div>
      {movie.photos && movie.photos.length ? (
        <div className="">
          <div className="border-t-1 border-b-1 border-colors-primary-light my-8 py-4 relative before:absolute before:-top-0.5 before:left-0 before:w-50 before:h-1 before:bg-colors-primary-clear after:absolute after:-bottom-0.5 after:left-0 after:w-50 after:h-1 after:bg-colors-primary-clear">
            <h3 className="text-4xl font-bold ml-4">Fotos</h3>
          </div>

          <ImageCarousel images={movie.photos} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
