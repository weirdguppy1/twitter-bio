import {
  GlobeAltIcon,
  InformationCircleIcon,
  PlusIcon
} from "@heroicons/react/24/solid";
import { useState } from "react";
import AddField from "./AddField";
import AddLink from "./AddLink";
import AddSocial from "./AddSocial";

const ContentCreator = () => {
  const [bioContent, setBioContent] = useState<string>("");

  return (
    <div className="flex flex-col items-start rounded-xl p-12  shadow-sm">
      {/* <h1 className="text-2xl">
        <span className="animate-text bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-xl font-extrabold text-transparent">
          Bio
        </span>{" "}
        creator.
      </h1> */}
      <div className="flex flex-col">
        <div className="flex flex-col space-y-2">
          <div className="flex w-full items-center space-x-2">
            <AddField />
            <AddLink />
          </div>
          <AddSocial />
        </div>
        <div className="mt-4 flex flex-col space-y-4">
          <h1 className="text-2xl font-bold underline decoration-blue-300 decoration-wavy">
            <div className="flex items-center space-x-1.5">
              <span>Your Bio</span>
              {/* <InformationCircleIcon id="bio-info-tooltip" className="h-5 w-5 fill-white" />
              <Tooltip anchorId="bio-info-tooltip" content="hello world!" /> */}
            </div>
          </h1>
          <textarea
            onChange={e => setBioContent(e.target.value)}
            value={bioContent}
            className="input h-48 w-96 resize-none border-none bg-inherit bg-[#109cf1] text-white placeholder-gray-100"
            placeholder="Write your bio here with no limit..."
          />
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;
