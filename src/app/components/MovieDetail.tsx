"use client";
import { Play } from "lucide-react";
import { YouTubePlayer } from "./YouTubePlayer";
// import Image from "next/image";
// import YouTubePlayer from "react-player/youtube";

export const MovieDetail = () => (
  <section className="relative w-full lg:px-44 before:bg-colors-primary before:absolute before:top-0 before:right-0 before:h-full before:w-96 before:content-['']">
    <div
      className=" relative flex flex-col"
      // style={{
      //   backgroundImage:
      //     "url('https://res.cloudinary.com/dcfnbbld6/image/upload/v1728243975/movies/files/posters/6702e905a4542169096fc928.jpg')",
      // }}
    >
      <div className="flex flex-col xl:flex-row">
        <div className=" bottom-0 left-0 p-8 text-white xl:w-3/5">
          <div className="mt-5">
            <h1 className="text-6xl font-bold mb-2 text-center">Elden Ring</h1>
          </div>
          <p className="mb-2">1950 • 1 HR 56 MIN</p>
          <div className="flex space-x-2 mb-4">
            <span className="px-2 py-1 bg-colors-primary-light rounded-sm text-xs">
              R
            </span>
            <span className="px-2 py-1 bg-gray-600 rounded-sm text-xs">4K</span>
            <span className="px-2 py-1 bg-gray-600 rounded-sm text-xs">HD</span>
            <span className="px-2 py-1 bg-gray-600 rounded-sm text-xs">16+</span>
          </div>
          <p className="mb-4 ">
            In the Falangist Spain of 1944, the bookish young stepdaughter of a
            sadistic army officer escapes into an eerie but captivating fantasy
            world.
          </p>
          <div className="mb-4">
            <p>
              <strong>Directed By:</strong> Guillermo del Toro
            </p>
            <p>
              <strong>Written By:</strong> Jenna Littlest
            </p>
            <p>
              <strong>Studio:</strong> Universal Pictures
            </p>
            <div className="flex space-x-4">
              <button className=" mt-8 px-6 py-2 bg-colors-primary text-white rounded-full flex items-center">
                <Play className="w-4 h-4 mr-2" /> Reservar
              </button>
            </div>
          </div>
        </div>
        <div className=" justify-center items-center flex w-full h-full m-auto">
          <YouTubePlayer />
        </div>
      </div>
    </div>

    {/* <div className="flex mt-4 space-x-2 relative">
      <Image
        src="https://res.cloudinary.com/dcfnbbld6/image/upload/v1728243975/movies/files/posters/6702e905a4542169096fc928.jpg"
        alt="Movie scene 1"
        className="w-1/3 h-80 object-cover"
        width={600}
        height={300}
      />
      <Image
        src="https://res.cloudinary.com/dcfnbbld6/image/upload/v1728243975/movies/files/posters/6702e905a4542169096fc928.jpg"
        alt="Movie scene 2"
        className="w-1/3 h-80 object-cover"
        width={600}
        height={300}
      />
      <Image
        src="https://res.cloudinary.com/dcfnbbld6/image/upload/v1728243975/movies/files/posters/6702e905a4542169096fc928.jpg"
        alt="Movie scene 3"
        className="w-1/3 h-80 object-cover"
        width={600}
        height={300}
      />
    </div> */}
  </section>
);
