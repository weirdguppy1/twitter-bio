import React from "react";

const Field = (props: { content: string; title: string }) => {
  return (
    <div className="mt-4 flex flex-col space-y-4">
      <h1 className="text-3xl font-bold">
        <div className="flex items-center">
          <span>{props.title}</span>
          {/* <InformationCircleIcon id="bio-info-tooltip" className="h-5 w-5 fill-white" />
              <Tooltip anchorId="bio-info-tooltip" content="hello world!" /> */}
        </div>
      </h1>
      <p className="text-md" placeholder="Write your bio here with no limit...">
        {props.content}
      </p>
    </div>
  );
};

export default Field;
