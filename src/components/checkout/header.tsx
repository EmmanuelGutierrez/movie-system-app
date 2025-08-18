import Image from "next/image";
import CinemaBg from "../../media/img/cinema-bg.jpg";
import { Badge } from "../ui/badge";
export const HeaderCheckout = () => {
  return (
    <section className={``}>
      <Image
        src={CinemaBg}
        alt="cinema"
        className="object-cover opacity-20 h-80 "
      />
      <div className=" w-full h-28 bg-colors-primary-hard border-t border-b border-colors-primary-light flex flex-col justify-center items-center md:grid md:grid-cols-6 ">
        <div className="flex items-center gap-2 md:col-span-2 md:col-start-3 mx-auto">
          <p className="font-light text-xl">Lunes 9 de Septiembre</p>
          <Badge className="text-xl bg-gradient-to-r from-colors-primary-light to colors-primary border-0 px-4 py-2">
            9:00
          </Badge>
        </div>
        <div className="md:col-span-1 md:col-start-6 mx-auto flex flex-col items-center">
          <p>Quedan</p>
          <p>05:00</p>
        </div>
      </div>
    </section>
  );
};
