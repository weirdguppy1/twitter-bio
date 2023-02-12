import { Tab } from "@headlessui/react";
import { ImSpinner } from "react-icons/im";
import clsx from "clsx";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import ContentCreator from "./ContentCreator";
import Preview from "./Preview";

const BioCreator = () => {
  const [data, setData] = useState<DocumentData>();
  const [value, loading] = useUser();

  useEffect(() => {
    setData(value?.data());
  }, [value]);

  if (loading) return <ImSpinner className="h-5 w-5 animate-spin fill-white" />;

  return (
    <div className="flex w-full max-w-md flex-col items-center px-2 py-8 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              clsx(
                "w-full rounded-lg px-8 py-2.5 text-sm font-medium leading-5 text-tblue",
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
                "w-full rounded-lg px-8 py-2.5 text-sm font-medium leading-5 text-tblue",
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
          <Tab.Panel className="mt-20 flex items-start space-x-12">
            <>
              <Preview data={data} />
              <ContentCreator data={data} />
            </>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default BioCreator;
