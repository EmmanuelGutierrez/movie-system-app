import { client } from "@/service/client";
import Image from "next/image";
// import { useParams } from "next/navigation";
import NoImage from "../../../../media/img/no-picture-available-icon-0.jpg";
import { timestampToDate } from "@/common/utils/timestampToDate";
import { Calendar, Clock } from "lucide-react";
import ImageCarousel from "@/app/components/ImageCarousel";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const { id } = useParams();
  const { id } = await params;
  const { data } = await client.movie.movieControllerFindOne(Number(id));
  if (!data) {
    return <>Not found</>;
  }
  return (
    <section className=" text-white font-medium">
      {/* <Image
        src={data.poster?.secure_url ?? NoImage}
        alt={"movie.name"}
        className="w-full object-cover mask-contain "
        height={2000}
        width={2000}
      /> */}
      <div className="-mb-40 -z-100 w-full h-90 bg-cover relative before:absolute  before:w-full before:h-full before:bg-linear-to-t before:from-colors-primary-dark before:via-colors-primary-dark/60 before:to-colors-primary-dark mask-b-from-85%   ">
        <Image
          src={data.poster?.secure_url ?? NoImage}
          alt={"movie.name"}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-300"
          height={800}
          width={1000}
        />
      </div>
      <div className="">
        <div className=" custom-container  h-48 flex">
          <Image
            src={data.poster?.secure_url ?? NoImage}
            alt={"movie.name"}
            className="hidden lg:block w-72 h-100 -mt-2 object-cover rounded-md group-hover:scale-110 transition-transform duration-300"
            height={800}
            width={1000}
          />
          <div className="lg:ml-8 space-y-4 text-colors-primary-clear px-4">
            <h3 className="text-4xl font-bold text-white">{data.name}</h3>
            {/* <p>{data.genres.map((g) => g.name).join(", ")}</p> */}
            <div className="flex">
              {data.genres.map((g) => (
                <div
                  className="border border-solid border-colors-primary-hard rounded-xl py-2 px-4 mr-4 "
                  key={g.id}
                >
                  <p className="text-center">{g.name}</p>
                </div>
              ))}
            </div>
            <div className="flex">
              <div className="flex ">
                <Calendar />
                <p className="mx-1">{timestampToDate(data.release)}</p>
              </div>
              <div className="flex ml-2">
                <Clock />
                <p className="mx-1">{data.duration}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-colors-primary-hard w-full min-h-55 ">
          <div className="custom-container-md py-5 px-7">
            <h3 className="text-2xl mb-2">Sinopsis</h3>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
      <div className="custom-container flex flex-col">
        <div className="border-t-1 border-b-1 border-colors-primary-light md:ml-28 my-8 py-4 relative before:absolute before:-top-0.5 before:left-0 before:w-50 before:h-1 before:bg-colors-primary-clear after:absolute after:-bottom-0.5 after:left-0 after:w-50 after:h-1 after:bg-colors-primary-clear">
          <h3 className="text-4xl font-bold ml-4">Trailer</h3>
        </div>
        <iframe
          width="1120"
          height="630"
          className="max-h-96 max-w-200 w-full rounded-2xl self-center"
          src={`https://www.youtube.com/embed/${data.trailer_youtube_id}?si=iLCKfX9CArXFSaPP`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="custom-container mt-20 py-10">
        <div className="border-t-1 border-b-1 border-colors-primary-light md:ml-28 my-8 py-4 relative before:absolute before:-top-0.5 before:left-0 before:w-50 before:h-1 before:bg-colors-primary-clear after:absolute after:-bottom-0.5 after:left-0 after:w-50 after:h-1 after:bg-colors-primary-clear">
          <h3 className="text-4xl font-bold ml-4">Fotos</h3>
        </div>
        <ImageCarousel
          images={data.photos?.map((p) => p.secure_url) ?? []}
          autoPlay={true}
        />
      </div>
    </section>
  );
}
