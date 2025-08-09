
import Image from "next/image";
import Instagram from "../../media/social/instagram-svgrepo-com.svg";
import Github from "../../media/social/github-142-svgrepo-com.svg";
import Linkedin from "../../media/social/linkedin-svgrepo-com.svg";
import { Input } from "./Input";
import { Logo } from "./Logo";
import { Button } from "../ui/button";

export const Footer = () => {
  return (
    <footer>
      <div className="w-full max-w-screen h-64 bg-gradient-to-r from-transparent via-colors-secondary to-transparent">
        <div className=" flex flex-col gap-7 lg:flex-row mx-5 items-center justify-center h-full">
          <h2 className="text-xl lg:text-3xl text-center">
            Disfruta de beneficios y mantente al tanto de las novedades!!
          </h2>
          <div className="flex justify-center items-center gap-2 ml-10">
            <Input
              type="text"
              placeholder="Correo electronico"
              classContainer="w-50 lg:w-80"
              color="primary"
            />
            <Button >Enviar</Button>
          </div>
        </div>
      </div>
      <div
        className={` bg-black text-white py-4 px-6 transition-all duration-300 z-1000 `}
        // style={{ zIndex: 1000 }}
      >
        <div className="container mx-auto flex flex-col justify-between items-center md:flex-row">
          <div className="flex justify-center items-center flex-col md:flex-row mb-5 md:mb-0">
            <Logo/>
            <div className="flex items-center md:items-start space-x-4 flex-col ml-6 h-full justify-between">
              <p>© Cinema Star</p>
              <p>Create by Emmanuel Gutierrez</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={"https://www.linkedin.com/in/emmanuel-gutierrez-0629a6224"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex space-x-2 items-center justify-center">
                <Image
                  src={Linkedin}
                  height={200}
                  width={200}
                  alt="LI"
                  className="h-6 w-6"
                />
                <p>Linkedin</p>
              </div>
            </a>
            <a
              href={"https://github.com/EmmanuelGutierrez"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex space-x-2 items-center justify-center ">
                <Image
                  src={Github}
                  height={200}
                  width={200}
                  alt="GH"
                  className="h-6 w-6 bg-white rounded-md"
                />
                <p>Github</p>
              </div>
            </a>
            <a
              href={"https://instagram.com/manugutierritoz"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex space-x-2 items-center justify-center ">
                <Image
                  src={Instagram}
                  height={200}
                  width={200}
                  alt="IG"
                  className="h-6 w-6 "
                />
                <p>Instagram</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
