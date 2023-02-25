import { CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";

interface Props {
  linkStyle: string;
  style: string;
  name: string;
  selected?: boolean;
}

export const ThemePreview = ({ style, name, linkStyle, selected }: Props) => {
  return (
    <button>
      <div
        className={clsx(
          "flex  cursor-pointer flex-col items-center  rounded-lg border-2 px-24 pb-16 pt-6 transition duration-100 hover:border-gray-100/50",
          selected ? "border-green-500" : "border-gray-900/25",
          style
        )}
      >
        {selected && <CheckCircleIcon className="h-6 w-6 fill-green-300" />}
        <h1 className="text-xl">{name}</h1>
        <div className="mt-4 flex flex-col space-y-2">
          <div
            className={clsx(
              "w-full rounded-xl py-2 px-12 shadow-sm",
              linkStyle
            )}
          />
          <div
            className={clsx(
              "w-full rounded-xl py-2 px-12 shadow-sm",
              linkStyle
            )}
          />
        </div>
      </div>
    </button>
  );
};
