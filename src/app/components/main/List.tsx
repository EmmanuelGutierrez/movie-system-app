import React from "react";

interface ListI {
  elements: React.ReactElement[];
}

export const List = ({ elements }: ListI) => {
  return (
    <div className="p-5 sm:p-0 lg:p-5 border-solid border border-colors-primary-hard  mb-auto">
      <dl className="max-w-md p-2 text-white  divide-y [&>div]:transition-all [&>div]:ease-in [&>div]:delay-100 cursor-default divide-colors-primary-light ">
        {elements.map((e, i) => {
          return (
            <div
              key={i}
              className="flex flex-col hover:text-colors-primary-light py-3"
            >
              {e}
            </div>
          );
        })}
      </dl>
    </div>
  );
};

/* 
<div className="flex flex-col hover:text-colors-primary-light pb-3 ">
          <p className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
            Email address
          </p>
          <dd className="text-lg font-semibold">yourname@flowbite.com</dd>
        </div>
*/
