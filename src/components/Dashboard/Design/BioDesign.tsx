import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, PaintBrushIcon } from "@heroicons/react/24/solid";
import { DocumentData } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { ThemePreview } from "./ThemePreview";

const themes = [
  {
    name: "Midnight",
    style: "text-white bg-tblack",
    linkStyle: "bg-gray-800"
  },
  {
    name: "Blue",
    style: "text-white bg-tblue",
    linkStyle: "bg-white"
  },
  {
    name: "Honey",
    style: "text-black bg-yellow-400",
    linkStyle: "bg-gray-100"
  },
  {
    name: "Emerald",
    style: "text-white bg-emerald-500 font-extrabold",
    linkStyle: "border-2 border-gray-100/25"
  },
  {
    name: "Pinkout",
    style:
      "text-white font-extrabold bg-gradient-to-tr from-pink-500 to-purple-500",
    linkStyle: "bg-gray-100/25"
  }
];

const BioDesign = (data: { data?: DocumentData }) => {
  const [selectedTheme, setSelectedTheme] = useState();

  useEffect(() => {
    const settings = data?.data?.settings;
    setSelectedTheme(settings.theme);
  }, []);

  return (
    <div className="py-2 px-8">
      <div className="flex flex-col space-y-4 md:space-y-8">
        <h1 className="inline-flex items-center space-x-2 text-3xl font-extrabold md:text-4xl">
          <span>Design</span>
          <PaintBrushIcon className="h-8 w-8 fill-white" />
        </h1>
        <div className="flex flex-col">
          <h1 className="inline-flex items-center space-x-1 text-xl md:text-2xl">
            <span>Theme</span>
          </h1>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {themes.map(theme => {
              const isSelected = selectedTheme === theme.name;
              return (
                <ThemePreview
                  name={theme.name}
                  style={theme.style}
                  linkStyle={theme.linkStyle}
                  selected={isSelected}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioDesign;
