import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots1 } from "react-icons/rx";
import clsx from "clsx";
import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { AiFillSave } from "react-icons/ai";

type FormData = {
  content: string;
  title: string;
};

function autoSize(e: any) {
  e.target.style.height = "inherit";
  e.target.style.height = `${e.target.scrollHeight}px`;
}
const OldField = (props: {
  content: string;
  title: string;
  bio?: boolean;
  id: string;
}) => {
  const [editable, setEditable] = useState(false);

  const { handleSubmit, register, setValue } = useForm<FormData>({
    defaultValues: { title: props.title, content: props.content }
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition
  };

  const onSubmit = () => handleSubmit(data => {});

  const handleEditClick = () => {
    setEditable(!editable);
    setValue("content", props.content);
    setValue("title", props.title);
  };

  const handleSave = () => {};

  return (
    <div
      style={style}
      className={clsx(
        "mt-4 flex w-full flex-col space-y-4 border-2 border-transparent p-4",
        !props.bio && ""
      )}
    >
      <div className="flex items-start space-x-1">
        <div className="mt-2 flex flex-col items-center space-y-2">
          <div ref={setNodeRef} {...attributes} {...listeners}>
            <RxDragHandleDots1
              className={clsx("h-6 w-6 fill-white", props.bio && "hidden")}
            />
          </div>
          <button onClick={handleEditClick}>
            <PencilSquareIcon
              className={clsx("h-4 w-4 fill-white", props.bio && "hidden")}
            />
          </button>
          {editable && (
            <button onClick={handleEditClick}>
              <AiFillSave
                className={clsx("h-4 w-4 fill-white", props.bio && "hidden")}
              />
            </button>
          )}
          <TrashIcon
            className={clsx("h-4 w-4 fill-white", props.bio && "hidden")}
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
                {editable ? (
                  <input
                    {...register("title")}
                    className="input m-1 !border-gray-500/25 bg-inherit !px-4 focus:outline-none"
                  />
                ) : (
                  <span>{props.title}</span>
                )}
              </div>
            </h1>
          </div>
          {editable ? (
            <form onSubmit={onSubmit} className="">
              <textarea
                {...register("content", { required: true })}
                onInput={autoSize}
                autoFocus
                className="mx-3 mt-2 w-full resize-none overflow-hidden whitespace-pre-line bg-inherit text-lg focus:outline-none"
              />
            </form>
          ) : (
            <p
              className="mx-3 mt-2 whitespace-pre-line text-lg"
              placeholder="Write your bio here with no limit..."
            >
              {props.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OldField;
