import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, PaintBrushIcon } from "@heroicons/react/24/solid";
import { DocumentData } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import useTheme from "../../../hooks/useTheme";
import { ThemePreview } from "./ThemePreview";

const BioDesign = (data: { data?: DocumentData }) => {
  const [selectedTheme, setSelectedTheme] = useState("Blue");
  const { themes } = useTheme();
  useEffect(() => {
    const settings = data?.data?.settings;
    setSelectedTheme(settings.theme);
  }, [data]);

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
          <div className="mt-2 grid grid-cols-2 rounded-xl bg-gray-100/[0.65] p-2">
            {themes.map(theme => {
              const isSelected = selectedTheme === theme.name;
              return (
                <ThemePreview
                  key={theme.name}
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
