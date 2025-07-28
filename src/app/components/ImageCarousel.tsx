"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  maxVisible?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ImageCarousel({
  images,
  maxVisible = 3,
  autoPlay = false,
  autoPlayInterval = 10000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calcular el máximo índice posible
  // const images = [...imagess, ...imagess, ...imagess];
  const maxIndex = Math.max(0, images.length - maxVisible);

  const nextSlide = useCallback(() => {
    // setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const newIndex = prev >= maxIndex ? 0 : prev + 1;
      console.log("curent index", newIndex, maxIndex);
      return newIndex;
    });
    // setTimeout(() => setIsTransitioning(false), 500);
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide]);

  // Calcular el desplazamiento
  const translateX = -(currentIndex / images.length) * 100;
  console.log("translateX", translateX);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Contenedor principal del carousel */}
      <div className="relative overflow-hidden rounded-lg shadow-lg max-h-120">
        {/* Botón anterior */}
        <button
          onClick={prevSlide}
          disabled={images.length <= maxVisible}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Botón siguiente */}
        <button
          onClick={nextSlide}
          disabled={images.length <= maxVisible}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Contenedor de imágenes */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${translateX}%)`,
              width: `${(images.length / maxVisible) * 100}%`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / images.length}%` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    height={500}
                    width={500}
                    src={image || "/placeholder.svg"}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicadores de puntos */}
      {images.length > maxVisible && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-colors-primary-clear scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              } `}
            />
          ))}
        </div>
      )}

      {/* Información del carousel */}
      {/* <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          Mostrando {Math.min(maxVisible, images.length)} de {images.length}{" "}
          imágenes
        </span>
        <span>
          Página {currentIndex + 1} de {maxIndex + 1}
        </span>
      </div> */}
    </div>
  );
}
