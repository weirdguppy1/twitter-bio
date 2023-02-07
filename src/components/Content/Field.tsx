import clsx from "clsx";
import React from "react";

const Field = (props: { content: string; title: string; bio?: boolean }) => {
  return (
    <div className="mt-4 flex flex-col space-y-4">
      <div className="w-fit rounded-full bg-black bg-opacity-75 px-4 py-1 transition duration-500 hover:shadow-xl">
        <h1
          className={clsx(
            "text-xl font-bold",
            props.bio &&
              "animate-text bg-gradient-to-r from-purple-500 via-green-500 to-pink-600 bg-clip-text text-transparent"
          )}
        >
          <div className="flex items-center">
            <span>{props.title}</span>
            {/* <InformationCircleIcon id="bio-info-tooltip" className="h-5 w-5 fill-white" />
              <Tooltip anchorId="bio-info-tooltip" content="hello world!" /> */}
          </div>
        </h1>
      </div>
      <p className="text-md" placeholder="Write your bio here with no limit...">
        {props.content}
      </p>
    </div>
  );
};

export default Field;
