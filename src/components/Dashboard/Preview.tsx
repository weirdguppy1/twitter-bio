import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useFirestore, {
  FieldType,
  LinkFieldType,
  LinkType,
  UserDoc
} from "../../hooks/useFirestore";
import Field from "../Creator/Field";
import Social from "../Creator/Social";
import LinkField from "../Creator/Link";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { ImSpinner } from "react-icons/im";

const Preview = ({ data }: { data?: DocumentData }) => {
  const [fields, setFields] = useState<FieldType[]>([]);
  const [links, setLinks] = useState<LinkFieldType[]>([]);
  const { updateFields, updateLinks } = useFirestore();

  const handleFieldsDrag = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setFields((items: any) => {
        const oldIndex = items.findIndex(
          (item: FieldType) => item.id === active.id
        );
        const newIndex = items.findIndex(
          (item: FieldType) => item.id === over.id
        );
        const arr: FieldType[] = arrayMove(items, oldIndex, newIndex);
        updateFields(arr);
        return arr;
      });
    }
  };

  const handleLinksDrag = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLinks((items: any) => {
        const oldIndex = items.findIndex(
          (item: LinkFieldType) => item.id === active.id
        );
        const newIndex = items.findIndex(
          (item: LinkFieldType) => item.id === over.id
        );
        const arr: LinkFieldType[] = arrayMove(items, oldIndex, newIndex);
        updateLinks(arr);
        return arr;
      });
    }
  };

  useEffect(() => {
    if (data?.fields) setFields(data?.fields);
    if (data?.links) setLinks(data?.links);
  }, [data]);

  if (!data) return <ImSpinner className="h-5 w-5 animate-spin fill-white" />;

  return (
    <div className="min-h-md cursor flex w-screen flex-col py-4 !px-2 sm:w-[30rem] sm:px-0 md:w-[40rem] md:rounded-xl md:border-2 md:border-gray-100/25 md:px-6 md:py-8 md:shadow-xl">
      <div className="flex flex-col items-center space-y-2">
        <img src={data.user.photoURL} className="h-10 w-10 rounded-xl" />
        <h1 className="text-4xl font-extrabold">{data.user.displayName}</h1>
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
        <Field bio title="Bio" content={data.bio} id="bio" />
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleFieldsDrag}
        >
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((field: FieldType) => (
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
      <div className="mt-10 flex flex-col space-y-5">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleLinksDrag}
        >
          <SortableContext items={links} strategy={verticalListSortingStrategy}>
            {links.map((link: LinkFieldType) => {
              return (
                <LinkField
                  title={link.title}
                  link={link.link}
                  key={link.id}
                  id={link.id}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Preview;
