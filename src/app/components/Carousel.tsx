"use client";
import React, { useState, useEffect } from "react";
import { Movie } from "@/common/types/api-types";
import { CarouselCard } from "./CarouselCard";

interface CarouselProps {
  title: string;
  movies: Movie[];
}

export const Carousel: React.FC<CarouselProps> = ({ title, movies }) => {
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
      return (prev + slidesToShow) % movies.length;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      console.log((prev - slidesToShow + movies.length) % movies.length);
      return (prev - slidesToShow + movies.length) % movies.length;
    });
  };

  return (
    <div className="md:my-8 md:mx-2 relative w-full overflow-hidden">
      <h1 className="text-5xl font-bold mb-4 text-white">{title}</h1>
      <div
        className={`flex transition-transform duration-300 ease-in-out `}
        style={style}
      >
        {movies.map((movie, i) => {
          return (
            <div
              key={`${movie._id}-${i}`}
              className={`px-1 ${slidesToShow === 1 ? "w-full" : slidesToShow === 2 ? "w-1/2" : "w-1/3"}`}
            >
              <CarouselCard movie={movie} key={`${movie._id}-${i}`} />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => prevSlide()}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Scroll left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={() => nextSlide()}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Scroll right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};
