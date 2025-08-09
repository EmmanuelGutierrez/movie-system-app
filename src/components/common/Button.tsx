import { bgColors } from "@/common/constants/backgroundColors";
import { fontWeightEnum } from "@/common/constants/fontWeight";
import { twMerge } from "tailwind-merge";

interface ButtonPropsI {
  rounded?: boolean;
  outline?: boolean;
  color?: keyof typeof bgColors;
  textColor?: "text-white" | "text-black";
  Icon?: JSX.Element;
  iconPosition?: "start" | "end" | "startend";
  text?: string;
  fontWeight?: keyof typeof fontWeightEnum;
  classNameButton?: string;
}
export const Button = ({
  rounded,
  color,
  outline,
  textColor = "text-white",
  iconPosition = "end",
  Icon,
  text,
  fontWeight = "medium",
  classNameButton,
}: ButtonPropsI) => {
  return (
    <button
      type="button"
      className={twMerge(
        !outline
          ? textColor
          : textColor !== "text-white"
            ? "text-white  hover:text-colors-black"
            : "text-black hover:text-colors-white",
        "font-medium transition-all ease-in duration-75 relative inline-flex items-center justify-center focus:ring-1  overflow-hidden focus:ring-blue-300 text-lg  focus:outline-hidden cursor-pointer",
        rounded ? "rounded-full" : "rounded-lg",
        outline ? "group px-1 py-1" : "px-5 py-2 hover:bg-opacity-80 ",
        color ? `${bgColors[color]}  ` : "hover:bg-colors-primary/80 ",
        fontWeightEnum[fontWeight],
        classNameButton
      )}
    >
      {outline && ( 
        <span
          className={twMerge(
            rounded ? "rounded-full" : "rounded-md",
            " relative flex-wrap flex flex-row h-full justify-center content-center px-4 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0"
          )}
        >
          {(iconPosition === "start" || iconPosition === "startend") && Icon}
          {text}
          {(iconPosition === "end" || iconPosition === "startend") && Icon}
        </span>
      )}
      {!outline && (
        <>
          {(iconPosition === "start" || iconPosition === "startend") && Icon}
          {text}
          {(iconPosition === "end" || iconPosition === "startend") && Icon}
        </>
      )}
    </button>
  );
};

{
  /* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
</svg>
 */
}
