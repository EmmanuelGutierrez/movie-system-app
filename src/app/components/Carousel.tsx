'use client'
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "@/common/types/api-types";
import { CarouselCard } from "./CarouselCard";

interface CarouselProps {
  title: string;
  movies: Movie[];
}

export const Carousel: React.FC<CarouselProps> = ({ title, movies }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = carousel.offsetWidth - 100; // Adjust for peeking
    const maxScroll = carousel.scrollWidth - carousel.offsetWidth;

    let newScrollPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    // Handle infinite scroll
    if (newScrollPosition < 0) {
      newScrollPosition = maxScroll;
    } else if (newScrollPosition > maxScroll) {
      newScrollPosition = 0;
    }

    carousel.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });

    setScrollPosition(newScrollPosition);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScrollEnd = () => {
      setScrollPosition(carousel.scrollLeft);
    };

    carousel.addEventListener("scrollend", handleScrollEnd);

    return () => {
      carousel.removeEventListener("scrollend", handleScrollEnd);
    };
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="relative group">
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden scroll-smooth scr"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <CarouselCard movie={movie} key={`${movie._id}`} />
          ))}
        </div>
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
