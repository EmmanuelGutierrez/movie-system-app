
import { bgColors } from "@/common/constants/backgroundColors";
import { HTMLInputTypeAttribute } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface InputI {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  color?: keyof typeof bgColors;
  classInput?: ClassNameValue;
  classContainer?: ClassNameValue;
  classBottomBar?: ClassNameValue;
}

// function join(...args:any) {
//   return args.filter(Boolean).join(" ");
// }

export const Input = ({
  type,
  placeholder,
  color='primary-hard',
  classInput,
  classBottomBar,
  classContainer,
}: InputI) => {
  return (
    <div className={twMerge(`relative`, classContainer)}>
      <input
        type={type}
        className={twMerge(
          "peer py-3 pe-0 ps-8 block w-full bg-gray-100/10 border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent transition duration-150 focus:border-b-transparent focus:outline-none focus:ring-0 disabled:opacity-50 disabled:pointer-events-none",
          classInput
        )}
        placeholder={placeholder}
      />
      <div
        className={twMerge(
          classBottomBar,
          ` absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all duration-300 peer-focus:w-full`,
          bgColors[color]
        )}
      />
    </div>
  );
};
