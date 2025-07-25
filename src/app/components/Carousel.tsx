"use client";
import React, { useState, useEffect } from "react";
import { Movie } from "@/common/types/api-types";
import { CarouselCard } from "./CarouselCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  title: string;
  movies: Movie[];
}

export const Carousel: React.FC<CarouselProps> = ({ title, ...data }) => {
  const movies = [...data.movies, ...data.movies, ...data.movies];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [style, setStyle] = useState({
    transform: `translateX(-${(currentIndex / movies.length) * 100}%)`,
    width: `${(movies.length / slidesToShow) * 100}%`,
  });

  useEffect(() => {
    const handleResize = () => {
      setCurrentIndex(0);
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", () => {
      handleResize();
    });
    return window.removeEventListener("resize", () => {
      handleResize();
    });
  }, []);

  useEffect(() => {
    setStyle({
      transform: `translateX(-${(currentIndex / movies.length) * 100}%)`,
      width: `${(movies.length / slidesToShow) * 100}%`,
    });
  }, [currentIndex, movies.length, slidesToShow]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const newCurrentIndex = (prev + slidesToShow) % movies.length;
      return newCurrentIndex > movies.length - slidesToShow
        ? movies.length - slidesToShow
        : newCurrentIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newCurrentIndex =
        (prev - slidesToShow + movies.length) % movies.length;
        console.log("newCurrentIndex",
          prev,
          slidesToShow,
          movies.length,
          movies.length,
          newCurrentIndex
        );
        return newCurrentIndex > movies.length - slidesToShow
          ? 0
          : newCurrentIndex;
    });
  };

  return (
    <div className="md:mb-8 md:mx-2 relative w-full overflow-hidden">
      <h1 className="text-5xl font-bold mb-4 text-white">{title}</h1>
      <div className="w-full mb-5 flex">
        <div className="w-28 h-[6px] bg-colors-primary-light"></div>
        <div className="w-full h-[1px] my-auto bg-white/20"></div>
      </div>
      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute h-full w-16 left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r rounded-lg from-black/50 to-transparent hover:from-black/70 hover:via-black/50  text-white p-2 rounded-r-lg transition-all duration-300 ease-in-out disabled:opacity-30"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute h-full  w-16 right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l rounded-lg from-black/50 to-transparent hover:from-black/70 hover:via-black/50  text-white p-2 rounded-l-lg transition-all duration-300 ease-in-out disabled:opacity-30"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div
          className={`flex transition-transform duration-300 ease-in-out `}
          style={style}
        >
          {movies.map((movie, i) => {
            return (
              <div
                key={`${movie.id}-${i}`}
                className={`px-2 ${slidesToShow === 1 ? "w-full" : slidesToShow === 2 ? "w-1/2" : "w-1/3"} `}
              >
                <CarouselCard movie={movie} key={`${movie.id}-${i}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
