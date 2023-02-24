import clsx from "clsx";
import React from "react";

interface Props {
  linkStyle: string;
  style: string;
  name: string;
}

export const ThemePreview = ({ style, name, linkStyle }: Props) => {
  return (
    <div
      className={clsx(
        "flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-transparent  px-24 py-8 transition duration-100 hover:border-gray-100/50",
        style
      )}
    >
      <h1 className="text-xl">{name}</h1>
      <div className="mt-4 flex flex-col space-y-2">
        <div
          className={clsx("w-full rounded-xl py-2 px-12 shadow-sm", linkStyle)}
        />
        <div
          className={clsx("w-full rounded-xl py-2 px-12 shadow-sm", linkStyle)}
        />
      </div>
    </div>
  );
};
