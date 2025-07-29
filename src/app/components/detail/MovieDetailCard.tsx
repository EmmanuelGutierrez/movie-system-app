import { Movie } from "@/common/types/api-types";
import Image from "next/image";
import NoImage from "../../media/img/no-picture-available-icon-0.jpg";

export const MovieDetailCard = (data: Movie) => {
  return (
    <section className=" text-white">
      <div className="relative custom-container mt-16 ">
        <h2 className="text-4xl font-semibold mb-5">{data.name}</h2>
        <div className="grid grid-cols-2 gap-3 md:flex-row h-96">
          <div className="flex gap-3 h-full">
            <Image
              src={data.poster?.secure_url ?? NoImage}
              alt={"movie.name"}
              className="w-60 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-300"
              height={800}
              width={1000}
            />
            <div className="px-2 space-y-1 w-full flex flex-col h-96">
              <p>
                Director\es: {data.directors?.map((p) => p.name).join(", ")}
              </p>
              <p>Cast: {data.actors?.map((p) => p.name).join(", ")}</p>
              <p>Genero: {data.genres?.map((p) => p.name).join(", ")}</p>
              <p>Año: {data.release}</p>
              <p>Duracion: {data.duration}</p>
              <div className="bg-black/50 rounded-lg p-2 overflow-auto  scrollbar-modern">
                <p>{data.description}</p>
              </div>
            </div>
          </div>

          <iframe
            width="1120"
            height="630"
            className="max-h-96 max-w-200 w-full rounded-2xl"
            src="https://www.youtube.com/embed/OfpXgjP4AOs?si=QL0KPyD0dwfHGYSV"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};
