import Image from "next/image";
import LogoPng from '../../media/logo/logo.png'
import Link from "next/link";

export const Logo=()=>{
    return (
      <Link href={'/main'}>
        <div className="flex justify-center items-center ">
          <Image
            className=" h-15 w-20 "
            src={LogoPng}
            alt="logo"
            height={300}
            width={300}
          />
          <p className="text-3xl font-bold">
            Cinema <span className="text-colors-primary-clear">Star</span>
          </p>
        </div>
      </Link>
    );
}