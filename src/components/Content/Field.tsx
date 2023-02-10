import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots1 } from "react-icons/rx";
import clsx from "clsx";
import React from "react";

const Field = (props: {
  content: string;
  title: string;
  bio?: boolean;
  id: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition
  };

  return (
    <div
      style={style}
      className={clsx(
        "mt-4 flex w-full flex-col space-y-4 border-2 border-transparent p-4",
        !props.bio && "rounded-xl hover:border-gray-200/25"
      )}
    >
      <div className="flex items-center space-x-1">
        <div ref={setNodeRef} {...attributes} {...listeners}>
          <RxDragHandleDots1
            className={clsx("h-6 w-6 fill-white", props.bio && "hidden")}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex w-fit flex-col rounded-full bg-black bg-opacity-75 px-4 py-1">
            <h1
              className={clsx(
                "text-2xl font-bold",
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
          <p
            className="mx-3 whitespace-pre-line text-lg"
            placeholder="Write your bio here with no limit..."
          >
            {props.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Field;
