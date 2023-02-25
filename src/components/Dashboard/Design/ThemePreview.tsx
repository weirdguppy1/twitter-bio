import { CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";
import useFirestore from "../../../hooks/useFirestore";

interface Props {
  linkStyle: string;
  style: string;
  name: string;
  selected: boolean;
}

export const ThemePreview = ({ style, name, linkStyle, selected }: Props) => {
  const { updateTheme } = useFirestore();

  return (
    <div
      onClick={() => {
        if (!selected) updateTheme(name);
      }}
      className={clsx(
        "rounded-lg border-2 p-1.5",
        selected ? "border-blue-500" : "border-transparent"
      )}
    >
      <div
        className={clsx(
          "flex h-40 cursor-pointer flex-col items-center rounded-lg border-2 border-gray-900/25 px-6 pt-4 transition duration-100",
          !selected && "hover:scale-[1.03]",
          style
        )}
      >
        {/* <div className="flex items-center">
        {selected && <CheckCircleIcon className="h-6 w-6 fill-green-300" />}
      </div> */}
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
    </div>
  );
};
