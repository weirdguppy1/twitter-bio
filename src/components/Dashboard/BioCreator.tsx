import { Tab } from "@headlessui/react";
import {
  GlobeAltIcon,
  InformationCircleIcon,
  PlusIcon
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";
import ContentCreator from "./ContentCreator";

const BioCreator = () => {
  const [bioContent, setBioContent] = useState<string>("");

  return (
    <div className="flex w-full max-w-md flex-col items-center px-2 py-8 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              clsx(
                "w-full rounded-lg px-8 py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Content
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                "w-full rounded-lg px-8 py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Design
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ContentCreator />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default BioCreator;
