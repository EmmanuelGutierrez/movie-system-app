import { Carousel } from "@/app/components/Carousel";
import { MainContainer } from "@/app/containers/MainContainer";
import { client } from "@/service/client";
import React from "react";

export default async function Page() {
  const { data } = await client.movie.movieList();
  return (
    <section className=" text-white ">
      <MainContainer />
      <div className="custom-container flex flex-col-reverse md:grid md:grid-cols-4">
        <div className="bg-red-400 min-h-5"></div>
        <div className="col-span-3">
          <Carousel title="Pelis" movies={data.data} />
        </div>
      </div>
    </section>
  );
}
