import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FieldType,
  LinkFieldType,
  LinkType,
  UserDoc
} from "../../hooks/useFirestore";
import Field from "../Content/Field";
import Social from "../Content/Social";
import LinkField from "../Content/Link";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { ImSpinner } from "react-icons/im";

const Preview = ({ data }: { data?: DocumentData }) => {
  if (!data) return <ImSpinner className="h-5 w-5 animate-spin fill-white" />;

  const [fields, setFields] = useState(data?.fields);

  const handleFieldsDrag = (event: any) => {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setFields((items: any) => {
        const oldIndex = items.findIndex(
          (item: FieldType) => item.id === active.id
        );
        const newIndex = items.findIndex(
          (item: FieldType) => item.id === over.id
        );
        console.log(arrayMove(items, oldIndex, newIndex));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-md cursor flex w-[40rem] flex-col rounded-xl border-2 border-gray-100/25 px-6 py-8 shadow-xl">
      <div className="flex flex-col items-center space-y-2">
        <img src={data?.user?.photoURL} className="h-10 w-10 rounded-xl" />
        <h1 className="text-4xl font-extrabold">{data?.user?.displayName}</h1>
        <div className="rounded-full bg-white py-[1px] px-8" />
        <div className="flex max-w-lg space-x-1">
          {data?.socials?.map((field: LinkType) => {
            const domain = new URL(field.link).hostname
              .replace("www.", "")
              .split(".")[0];
            return (
              <Social
                key={field.id}
                id={field.id}
                link={field.link}
                domain={domain}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <Field bio title="Bio" content={data?.bio} id="bio" />
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleFieldsDrag}
        >
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            {fields?.map((field: FieldType) => (
              <Field
                id={field.id}
                key={field.id}
                title={field.title}
                content={field.content}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div className="mt-10 flex flex-col space-y-2">
        {data?.links?.map((field: LinkFieldType) => {
          return (
            <LinkField
              title={field.title}
              link={field.link}
              key={field.id}
              id={field.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Preview;
