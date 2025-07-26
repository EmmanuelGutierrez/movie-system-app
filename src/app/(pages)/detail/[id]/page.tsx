import { client } from "@/service/client";
import Image from "next/image";
// import { useParams } from "next/navigation";
import NoImage from "../../../../media/img/no-picture-available-icon-0.jpg";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const { id } = useParams();
  const { id } = await params;
  const { data } = await client.movie.movieControllerFindOne(Number(id));
  console.log(data);
  if (!data) {
    return <>Not found</>;
  }
  return (
    <section className=" text-white">
      {/* <Image
        src={data.poster?.secure_url ?? NoImage}
        alt={"movie.name"}
        className="w-full object-cover mask-contain "
        height={2000}
        width={2000}
      /> */}
      <div
        className="w-full h-120 bg-cover relative before:absolute  before:w-full before:h-full before:bg-gradient-to-r before:from-colors-primary-dark before:via-transparent before:to-colors-primary-dark"
        style={{ backgroundImage: `url(${data.poster?.secure_url})` }}
      ></div>
      {/* <div className="relative custom-container mt-16 ">
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
      </div> */}
    </section>
  );
}
