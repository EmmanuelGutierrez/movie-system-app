'use client'
import Image from "next/image";
import cinemaImg from "../../media/img/cinema.jpg";
import { TypeAnimation } from "react-type-animation";

export const MainBanner = () => {
  return (
    <section className="relative ">
      <Image
        src={cinemaImg}
        alt="cinema"
        className="object-cover opacity-20 h-120"
      />
      <div
        className={`bg-cover absolute inset-0 `}
        //   style={{ backgroundImage: `url("${cinemaImg}")` }}
      >
        <div className="flex flex-col items-center center h-full justify-center text-center ">
          <h1 className="font-bold text-7xl">
            CONSIGUE UNA ENTRADA
            <br />
            PARA{" "}
            <span className="text-colors-primary-hard">
              <TypeAnimation
                sequence={[
                  "UNA PELICULA",
                  1500,
                  "UNA EXPERIENCIA",
                  1500,
                  "UN RECUERDO",
                  1500,
                ]}
                speed={60}
                repeat={Infinity}
              />
            </span>
          </h1>
          <h3 className="font-light text-xl mt-2">
            Seguro y confiable. Reserva una entrada!
          </h3>
        </div>
      </div>
    </section>
  );
};
