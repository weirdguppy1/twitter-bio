import { Tab } from "@headlessui/react";
import { ImSpinner } from "react-icons/im";
import clsx from "clsx";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import ContentCreator from "./Creator/ContentCreator";
import Preview from "./Preview";
import BioDesign from "./Design/BioDesign";

const BioCreator = () => {
  const [data, setData] = useState<DocumentData>();
  const [value, loading] = useUser();

  useEffect(() => {
    setData(value?.data());
  }, [value]);

  if (loading) return <ImSpinner className="h-5 w-5 animate-spin fill-white" />;

  return (
    <div className="flex w-full max-w-md flex-col items-center">
      <Tab.Group>
        <Tab.List className="flex w-screen space-x-2 bg-blue-900/20 p-1 sm:w-full sm:rounded-xl">
          <Tab
            className={({ selected }) =>
              clsx(
                "w-full rounded-lg px-8 py-2.5 text-sm font-medium leading-5 ",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white/25 shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Content
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                "w-full rounded-lg px-8 py-2.5 text-sm font-medium leading-5 ",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white/25 shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Design
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="mt-2 flex flex-col items-center sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 xl:flex-row xl:items-start xl:space-x-12">
            <div className="px-1 sm:px-0">
              <Preview data={data} />
            </div>
            <ContentCreator data={data} />
          </Tab.Panel>
          <Tab.Panel className="mt-2 flex flex-col items-center sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 xl:flex-row xl:items-start xl:space-x-12">
            {/* <div className="px-1 sm:px-0">
              <Preview data={data} />
            </div> */}
            <BioDesign data={data} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default BioCreator;
